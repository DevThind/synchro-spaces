import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page index and responsive shell work", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Intelligence you can feel. Not see.");
  const pageIndex = page.getByRole("navigation", { name: "Site pages" });
  await expect(pageIndex).toBeVisible();
  await expect(pageIndex.getByRole("link")).toHaveCount(9);
  await pageIndex.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1, name: /Look closer/ })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Site pages" })).toHaveCount(0);
  await expect.poll(() => page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  )).toBe(false);
});

test("residential solutions use six image-led service cards", async ({ page }) => {
  await page.goto("/residential", { waitUntil: "domcontentloaded" });

  const cards = page.locator(".residential-service-grid > .service-card--image");
  await expect(cards).toHaveCount(6);
  await expect(cards.locator("img")).toHaveCount(6);
  await expect(cards.locator("h3")).toHaveText([
    "Whole-home automation",
    "Lighting & curtain control",
    "Audio, video & entertainment",
    "Networking & infrastructure",
    "Integrated security",
    "Comfort & daily routines"
  ]);
  await expect(page.getByRole("heading", { name: "Smart access readiness" })).toHaveCount(0);
});

test("development consultation flow confirms server success", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.locator("form.lead-form")).toHaveAttribute("data-hydrated", "true");
  await page.getByLabel("Name").fill("Jordan Lee");
  await page.getByLabel("Email").fill("jordan@example.ca");
  await page.getByLabel("Phone").fill("+1 416 555 0142");
  await page.getByLabel("Project context").selectOption("residential");
  await page.getByLabel("Project type").selectOption("renovation");
  await page.getByLabel("Project location").fill("Toronto, Ontario");
  await page.getByLabel("Whole-home / space automation").check();
  await page.getByLabel("Build condition").selectOption("renovation");
  await page.getByLabel("Approximate stage").selectOption("design");
  await page.getByLabel("Preferred contact method").selectOption("email");
  await page.getByLabel("Preferred consultation timing").selectOption("afternoon");
  await page.getByLabel("Project overview").fill("We are coordinating a full renovation and want infrastructure resolved before electrical rough-in.");
  await page.getByLabel(/I have read the privacy notice/).check();
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
