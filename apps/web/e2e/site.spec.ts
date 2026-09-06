import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("principal navigation and responsive shell work", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Technology that belongs");
  await page.getByRole("link", { name: "Projects", exact: true }).first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1, name: /Look closer/ })).toBeVisible();
  await expect.poll(() => page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  )).toBe(false);
});

test("mobile menu is keyboard operable", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? Number.POSITIVE_INFINITY) > 1200, "Compact navigation test");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await expect(trigger).toHaveAttribute("data-hydrated", "true");
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
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

for (const path of ["/", "/residential", "/commercial", "/projects", "/contact"]) {
  test(`axe smoke: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.setItem("site-consent-v1", JSON.stringify({ necessary: true, analytics: false })));
    await page.reload({ waitUntil: "domcontentloaded" });
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflows).toBe(false);
    const results = await new AxeBuilder({ page }).exclude("[data-turnstile]").analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
  });
}
