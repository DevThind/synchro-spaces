import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/residential",
  "/residential/whole-home-automation",
  "/residential/architectural-lighting",
  "/residential/audio-video",
  "/residential/residential-networking",
  "/residential/integrated-security",
  "/residential/comfort-energy",
  "/commercial",
  "/projects",
  "/projects/residence-after-dark",
  "/projects/scenes-at-a-touch",
  "/projects/hidden-backbone",
  "/control4",
  "/technology-partners",
  "/process",
  "/services",
  "/about",
  "/resources",
  "/resources/when-to-involve-an-automation-integrator",
  "/resources/network-in-the-design-conversation",
  "/resources/designing-controls-for-guests",
  "/service-areas",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility"
] as const;

const viewports = [
  { width: 320, height: 700 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1200, height: 800 },
  { width: 1201, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 }
] as const;

test("every public route fits phone, tablet, and desktop viewports", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the route matrix once");
  test.setTimeout(180_000);

  await page.addInitScript(() => {
    window.localStorage.setItem(
      "site-consent-v1",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const path of publicRoutes) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth
      }));

      expect.soft(
        dimensions.content,
        `${path} overflows horizontally at ${viewport.width}px`
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});

test("desktop sections share one alignment rail", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the desktop alignment check once");

  await page.addInitScript(() => {
    window.localStorage.setItem(
      "site-consent-v1",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });

  for (const width of [1200, 1201, 1280, 1281, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#intro-heading")).toBeVisible();
    await expect(page.locator(".footer-main")).toBeVisible();

    const metrics = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
      const contentLefts = [
        rect(".hero-copy").left,
        rect(".intro-grid__heading").left,
        rect(".section--paper .section-heading-copy").left,
        rect(".section--dark .section-heading-copy").left,
        rect(".cta-inner > .stack").left,
        rect(".footer-main > :first-child").left
      ];

      return {
        contentLefts,
        introEyebrow: rect(".intro-grid .eyebrow").left,
        introHeading: rect("#intro-heading").left,
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        headerWidth: rect(".header-inner").width,
        desktopNavigation: getComputedStyle(document.querySelector(".desktop-nav")!).display,
        compactNavigation: getComputedStyle(document.querySelector(".menu-button")!).display
      };
    });

    expect(metrics.content, `Homepage overflows at ${width}px`).toBeLessThanOrEqual(metrics.viewport + 1);
    expect(metrics.headerWidth).toBeCloseTo(Math.min(width, 1280), 0);
    expect(
      Math.max(...metrics.contentLefts) - Math.min(...metrics.contentLefts),
      `Content rails at ${width}px: ${metrics.contentLefts.join(", ")}`
    ).toBeLessThanOrEqual(1);
    expect(Math.abs(metrics.introEyebrow - metrics.introHeading)).toBeLessThanOrEqual(1);

    if (width <= 1280) {
      expect(metrics.desktopNavigation).toBe("none");
      expect(metrics.compactNavigation).not.toBe("none");
    } else {
      expect(metrics.desktopNavigation).toBe("flex");
      expect(metrics.compactNavigation).toBe("none");
    }
  }
});

test("planning questions stack cleanly at intermediate widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the FAQ breakpoint check once");

  await page.addInitScript(() => {
    window.localStorage.setItem(
      "site-consent-v1",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });

  for (const width of [781, 800, 820, 850, 900]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/residential", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".faq-layout")).toBeVisible();

    const metrics = await page.evaluate(() => {
      const layout = document.querySelector<HTMLElement>(".faq-layout")!;
      const intro = document.querySelector<HTMLElement>(".faq-layout__intro")!.getBoundingClientRect();
      const questions = document.querySelector<HTMLElement>(".faq-list")!.getBoundingClientRect();
      return {
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        columns: getComputedStyle(layout).gridTemplateColumns,
        introLeft: intro.left,
        questionsLeft: questions.left,
        introBottom: intro.bottom,
        questionsTop: questions.top
      };
    });

    expect(metrics.content, `FAQ overflows at ${width}px`).toBeLessThanOrEqual(metrics.viewport + 1);
    expect(metrics.columns.trim().split(/\s+/)).toHaveLength(1);
    expect(Math.abs(metrics.introLeft - metrics.questionsLeft)).toBeLessThanOrEqual(1);
    expect(metrics.questionsTop).toBeGreaterThan(metrics.introBottom);
  }
});

test("small-phone navigation remains usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the small-phone check once");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const trigger = page.locator(".menu-button");
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAccessibleName("Open navigation");
  await expect(page.locator(".site-header")).toHaveCSS("position", "sticky");
  const box = await trigger.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);

  await trigger.click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  const firstLink = navigation.getByRole("link", { name: "Control4", exact: true });
  const lastLink = navigation.getByRole("link", { name: "Plan a consultation" });
  await expect(firstLink).toBeVisible();
  await expect(firstLink).toBeFocused();
  await expect(lastLink).toBeVisible();
  await expect(page.locator(".site-header .brand")).toHaveAttribute("inert", "");
  const cookieBanner = page.locator(".cookie-banner");
  await expect(cookieBanner).toHaveAttribute("inert", "");
  const layerOrder = await page.evaluate(() => ({
    header: Number.parseInt(getComputedStyle(document.querySelector(".site-header")!).zIndex, 10),
    cookie: Number.parseInt(getComputedStyle(document.querySelector(".cookie-banner")!).zIndex, 10)
  }));
  expect(layerOrder.header).toBeGreaterThan(layerOrder.cookie);

  await page.keyboard.press("Shift+Tab");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(lastLink).toBeFocused();

  await page.setViewportSize({ width: 1281, height: 700 });
  await expect(navigation).toBeHidden();
  await expect(page.locator("body")).not.toHaveClass(/menu-open/);
  await expect(page.locator(".site-header .brand")).not.toHaveAttribute("inert", "");
  await expect(page.locator(".site-header .brand")).toBeFocused();
});

test("sticky header does not cover service jump targets", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the phone anchor check once");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "site-consent-v1",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });
  await page.goto("/services", { waitUntil: "domcontentloaded" });
  await page.locator(".services-index").getByRole("link", { name: /Integrated security/ }).click();
  await expect(page).toHaveURL(/#integrated-security$/);

  const positions = await page.evaluate(() => ({
    headerBottom: document.querySelector<HTMLElement>(".site-header")!.getBoundingClientRect().bottom,
    targetTop: document.querySelector<HTMLElement>("#integrated-security")!.getBoundingClientRect().top
  }));
  expect(positions.targetTop).toBeGreaterThan(positions.headerBottom);
});

test("phone form controls remain comfortable to tap", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the phone form check once");
  await page.setViewportSize({ width: 320, height: 700 });
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "site-consent-v1",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });
  await page.goto("/contact", { waitUntil: "domcontentloaded" });

  const form = page.locator(".lead-form");
  const submit = form.getByRole("button", { name: "Send consultation request" });
  await expect(form).toBeVisible();
  await expect(submit).toBeVisible();

  const metrics = await page.evaluate(() => {
    const form = document.querySelector<HTMLElement>(".lead-form")!.getBoundingClientRect();
    const submit = document.querySelector<HTMLButtonElement>('.lead-form button[type="submit"]')!.getBoundingClientRect();
    const controls = [...document.querySelectorAll<HTMLElement>('.lead-form input:not([type="checkbox"]):not([tabindex="-1"]), .lead-form select, .lead-form textarea')];
    return {
      formWidth: form.width,
      submitWidth: submit.width,
      shortestControl: Math.min(...controls.map((control) => control.getBoundingClientRect().height))
    };
  });

  expect(metrics.submitWidth).toBeCloseTo(metrics.formWidth, 0);
  expect(metrics.shortestControl).toBeGreaterThanOrEqual(44);
});

test("privacy controls remain reachable on a short phone", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Run the short-phone check once");
  await page.setViewportSize({ width: 320, height: 400 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const banner = page.locator(".cookie-banner");
  await expect(banner).toBeVisible();
  await expect(banner).toHaveCSS("position", "static");
  const choose = banner.getByRole("button", { name: "Choose" });
  const chooseBox = await choose.boundingBox();
  expect(chooseBox?.height).toBeGreaterThanOrEqual(44);
  await expect(choose).toHaveAttribute("aria-controls", "cookie-settings");
  await expect(banner.getByRole("button", { name: "Allow analytics" })).toBeVisible();
  await choose.click();

  await expect(banner.getByRole("button", { name: "Necessary only" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(banner.getByRole("checkbox", { name: /Optional analytics/ })).toBeFocused();
  const actionLefts = await banner.locator(".cookie-actions > *").evaluateAll((actions) =>
    actions.map((action) => action.getBoundingClientRect().left)
  );
  expect(Math.max(...actionLefts) - Math.min(...actionLefts)).toBeLessThanOrEqual(1);
  await banner.getByRole("button", { name: "Necessary only" }).click();

  const manage = page.getByRole("button", { name: "Privacy choices" });
  await expect(manage).toHaveCSS("position", "static");
  const manageBox = await manage.boundingBox();
  expect(manageBox?.height).toBeGreaterThanOrEqual(44);
  await manage.click();
  await expect(banner).toBeFocused();
  await banner.getByRole("button", { name: "Necessary only" }).click();
  await expect(manage).toBeFocused();
});
