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
  await expect(page.getByRole("heading", { level: 1, name: /Look closer/ })).toBeVisible();
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

test("services 04 through 06 repeat the first three chapter layouts", async ({ page }) => {
  await page.goto("/services", { waitUntil: "domcontentloaded" });

  await expect(page.locator(".services-chapter")).toHaveCount(6);
  await expect(page.locator("#whole-home-control .services-gallery")).toBeVisible();
  await expect(page.locator("#lighting-and-shading")).toHaveClass(/services-chapter--dark/);
  await expect(page.locator("#lighting-and-shading .services-gallery")).toBeVisible();
  await expect(page.locator("#networks-and-infrastructure .services-remote-media")).toBeVisible();
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
