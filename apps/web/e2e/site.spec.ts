import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page index and responsive shell work", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Smart living, beautifully resolved.");
  const menuToggle = page.locator(".site-menu-toggle");
  if (await menuToggle.isVisible()) await menuToggle.click();
  const pageIndex = page.getByRole("navigation", { name: "Site pages" });
  await expect(pageIndex).toBeVisible();
  await expect(page.locator(".site-brand")).toBeVisible();
  await expect(pageIndex.getByRole("link")).toHaveCount(4);
  await pageIndex.locator("summary").click();
  await expect(pageIndex.getByRole("link")).toHaveCount(7);
  await expect(pageIndex.getByRole("link", { name: "Residential" })).toBeVisible();
  await expect(pageIndex.getByRole("link", { name: "Commercial" })).toBeVisible();
  await pageIndex.getByRole("link", { name: "All projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1, name: /Real homes/ })).toBeVisible();
  if (await menuToggle.isVisible()) await menuToggle.click();
  await expect(page.getByRole("navigation", { name: "Site pages" })).toBeVisible();
  await page.locator(".site-brand").click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  )).toBe(false);
});

test("residential journal uses only the supplied project gallery", async ({ page }) => {
  await page.goto("/residential", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Residential projects.");
  const gallery = page.locator(".portfolio-gallery");
  await expect(gallery.locator("figure")).toHaveCount(2);
  await expect(gallery.locator("img")).toHaveCount(2);
  await expect(page.locator("[data-project]")).toHaveCount(2);
  await expect(page.locator("[data-project='02'] img")).toHaveCount(9);
  await expect(page.locator(".residential-service-grid")).toHaveCount(0);
});

test("key pages load their images and keep content available with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "site-consent-v1",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });

  for (const path of ["/", "/residential", "/services"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const images = page.locator("main img");
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
    await images.evaluateAll((elements) => elements.forEach((element) => {
      (element as HTMLImageElement).loading = "eager";
    }));
    await expect.poll(
      () => images.evaluateAll((elements) => elements.filter((element) => (element as HTMLImageElement).naturalWidth === 0).map((element) => (element as HTMLImageElement).currentSrc || (element as HTMLImageElement).src)),
      { message: `${path} has images that did not load`, timeout: 15_000 }
    ).toEqual([]);
  }
});

test("services 04 through 06 repeat the first three chapter layouts", async ({ page }) => {
  await page.goto("/services", { waitUntil: "domcontentloaded" });

  await expect(page.locator(".services-chapter")).toHaveCount(6);
  await expect(page.locator("#whole-home-control .services-gallery")).toBeVisible();
  await expect(page.locator("#lighting-and-shading")).toHaveClass(/services-chapter--dark/);
  await expect(page.locator("#lighting-and-shading .services-gallery")).toBeVisible();
  await expect(page.locator("#networks-and-infrastructure .services-remote-media")).toBeVisible();
});

test("interactive process supports direct and sequential stage navigation", async ({ page }) => {
  await page.goto("/process", { waitUntil: "domcontentloaded" });

  const heroBackground = page.locator(".page-hero__media img");
  await expect(heroBackground).toBeVisible();
  await expect(heroBackground).toHaveAttribute("alt", "");
  await expect.poll(() => heroBackground.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  const designStage = page.getByRole("button", { name: /Design/ });
  await designStage.click();
  await expect(designStage).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#process-stage-detail").getByRole("heading", { name: "Design" })).toBeVisible();
  const floorPlan = page.getByRole("img", { name: "Detailed ground-floor plan for a three-bedroom residence" });
  await expect(floorPlan).toBeVisible();
  await expect.poll(() => floorPlan.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  const installStage = page.getByRole("button", { name: /Install & test/ });
  await expect(installStage).toHaveAttribute("aria-pressed", "false");
  await installStage.click();
  await expect(installStage).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#process-stage-detail").getByRole("heading", { name: "Install & test" })).toBeVisible();
  const touchscreen = page.getByRole("img", { name: "Person using a wall-mounted home-control touchscreen" });
  await expect(touchscreen).toBeVisible();
  await expect.poll(() => touchscreen.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Previous" }).click();
  await expect(page.locator("#process-stage-detail").getByRole("heading", { name: "Coordinate" })).toBeVisible();
  const coordinationImage = page.getByRole("img", {
    name: "Design and construction team coordinating around plans and material samples"
  });
  await expect(coordinationImage).toBeVisible();
  await expect.poll(() => coordinationImage.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  const shortestStageControl = await page.locator(".process-journey__index button").evaluateAll((buttons) =>
    Math.min(...buttons.map((button) => button.getBoundingClientRect().height))
  );
  expect(shortestStageControl).toBeGreaterThanOrEqual(44);
});

test("development consultation flow confirms server success", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.locator("form.lead-form")).toHaveAttribute("data-hydrated", "true");
  await page.getByLabel("Name").fill("Jordan Lee");
  await page.getByLabel("Preferred contact method").selectOption("email");
  await page.getByLabel("Email address").fill("jordan@example.ca");
  await page.getByLabel("Project location").fill("Toronto, Ontario");
  await page.getByLabel("Short project description").fill("We are coordinating a full renovation and want infrastructure resolved before electrical rough-in.");
  await page.getByRole("button", { name: "Send consultation request" }).click();
  await expect(page.getByRole("status")).toContainText("Request received");
});

test("consent defaults to necessary-only behaviour", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Your privacy choices" })).toBeVisible();
  await page.getByRole("button", { name: "Necessary only" }).click();
  const consent = await page.evaluate(() => JSON.parse(localStorage.getItem("site-consent-v1") ?? "{}"));
  expect(consent.analytics).toBe(false);
  expect(consent.necessary).toBe(true);
});

for (const path of ["/", "/control4", "/residential", "/commercial", "/projects", "/services", "/contact"]) {
  test(`axe smoke: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.setItem("site-consent-v1", JSON.stringify({ necessary: true, analytics: false })));
    await page.reload({ waitUntil: "domcontentloaded" });
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflows).toBe(false);
    const results = await new AxeBuilder({ page })
      .exclude("[data-turnstile]")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
