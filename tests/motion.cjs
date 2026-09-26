const { chromium } = require("./browser.cjs");
const assert = require("node:assert/strict");
const path = require("node:path");
const base = "http://127.0.0.1:4173/";
const out = (name) => path.join(__dirname, "../screenshots", name);
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [name, count] of [
    ["acoustics", 12],
    ["energy", 11],
  ]) {
    await page.goto(base + name + ".html");
    await page.evaluate(() => document.fonts.ready);
    const stage = page.locator("[data-inspect-material]"),
      toggle = page.locator("[data-inspect]");
    await toggle.click();
    await page.waitForTimeout(100);
    assert.equal(await toggle.getAttribute("aria-pressed"), "true");
    const hash = () =>
      page.locator(".texture-lens canvas").evaluate((c) => c.toDataURL());
    const initial = await hash();
    const b = await stage.boundingBox();
    await page.mouse.move(b.x + b.width * 0.38, b.y + b.height * 0.38);
    await page.waitForTimeout(80);
    assert.notEqual(await hash(), initial);
    await toggle.focus();
    const before = await hash();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(80);
    assert.notEqual(await hash(), before);
    await stage.screenshot({ path: out(name + "-magnifier.png") });
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-pressed"), "false");
    console.log(
      "PASS " +
        name +
        ": magnifier, pointer tracking, keyboard movement and Escape",
    );
    await page
      .locator("[data-process]")
      .evaluate((e) =>
        e.scrollIntoView({ block: "center", behavior: "instant" }),
      );
    await page.waitForTimeout(120);
    for (let i = 0; i < count; i++) {
      await page.locator(`[data-step="${i}"]`).click();
      await page.waitForTimeout(35);
      const active = await page
        .locator(".process-illustration")
        .evaluate((e) => e.getAnimations({ subtree: true }).length);
      assert(active > 0, `${name} stage ${i} has no physical animation`);
    }
    await page
      .locator(name === "acoustics" ? '[data-step="8"]' : '[data-step="5"]')
      .click();
    await page.waitForTimeout(160);
    await page.locator("[data-replay-process]").click();
    assert(
      await page
        .locator(".process-illustration")
        .evaluate((e) => e.getAnimations({ subtree: true }).length > 0),
    );
    await page.waitForTimeout(300);
    await page
      .locator("[data-process]")
      .screenshot({ path: out(name + "-process-motion.png") });
    await page.waitForTimeout(1800);
    assert.equal(
      await page
        .locator(".process-illustration")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    );
    console.log(
      "PASS " + name + ": all stages animate, replay works and motion settles",
    );
  }
  await page.goto(base + "acoustics.html#lab");
  await page.locator("[data-simulation]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await page.locator("[data-send-pulse]").click();
  assert.equal(
    await page.locator("[data-simulation]").getAttribute("data-pulse-state"),
    "sending",
  );
  await page.waitForTimeout(1150);
  await page
    .locator("[data-simulation]")
    .screenshot({ path: out("sound-pulse.png") });
  await page.waitForTimeout(1400);
  assert.equal(
    await page.locator("[data-simulation]").getAttribute("data-pulse-state"),
    "complete",
  );
  await page.locator("[data-send-pulse]").click();
  await page.waitForTimeout(100);
  await page.locator("[data-send-pulse]").click();
  assert.equal(
    await page.locator("[data-simulation]").getAttribute("data-pulse-state"),
    "sending",
  );
  console.log("PASS sound pulse: travel, completion and immediate restart");
  await page.goto(base + "vision.html");
  await page.locator('[data-cycle="2"]').click();
  assert(
    await page
      .locator("#cycle-mask-path")
      .evaluate((e) => e.getAnimations().length > 0),
  );
  await page.locator('[data-cycle="3"]').click();
  assert.equal(
    await page.locator("#cycle-active-path").getAttribute("stroke-dasharray"),
    "4 7",
  );
  await page.waitForTimeout(850);
  assert.equal(
    await page
      .locator("#cycle-mask-path")
      .evaluate((e) => e.getAnimations().length),
    0,
  );
  await page
    .locator(".cycle-layout")
    .screenshot({ path: out("lifecycle-trace.png") });
  console.log("PASS lifecycle: selected path traces and recovery stays dotted");
  for (const name of ["acoustics", "energy"]) {
    await page.goto(base + "index.html");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page
      .locator(`.pathway[href="${name}.html"]`)
      .scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      window.__transfers = [];
      const start = document.startViewTransition.bind(document);
      document.startViewTransition = (update) => {
        window.__transfers.push({
          old: document.querySelectorAll('[style*="travelling-specimen"]')
            .length,
        });
        return start(async () => {
          await update();
          window.__transfers.at(-1).new = document.querySelectorAll(
            '[style*="travelling-specimen"]',
          ).length;
        });
      };
    });
    await page.locator(`.pathway[href="${name}.html"]`).click();
    await page.waitForURL("**/" + name + ".html");
    await page.waitForTimeout(100);
    const transfers = await page.evaluate(() => window.__transfers);
    assert.equal(transfers[0].old, 1);
    assert.equal(transfers[0].new, 1);
    await page.screenshot({ path: out(name + "-transfer.png") });
    await page.waitForTimeout(850);
    assert.equal(
      await page.locator('[style*="travelling-specimen"]').count(),
      0,
    );
  }
  console.log(
    "PASS page transitions: matched source/destination for both specimens, names cleaned up",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "acoustics.html");
  await page.locator('[data-step="8"]').click();
  assert.equal(
    await page
      .locator(".process-illustration")
      .evaluate((e) => e.getAnimations({ subtree: true }).length),
    0,
  );
  assert(await page.locator("[data-replay-process]").isDisabled());
  await page.locator("[data-send-pulse]").click();
  assert.equal(
    await page.locator("[data-simulation]").getAttribute("data-pulse-state"),
    "still",
  );
  const still = await page
    .locator("[data-simulation] canvas")
    .evaluate((c) => c.toDataURL());
  await page.waitForTimeout(150);
  assert.equal(
    await page
      .locator("[data-simulation] canvas")
      .evaluate((c) => c.toDataURL()),
    still,
  );
  await page.goto(base + "vision.html");
  await page.locator('[data-cycle="1"]').click();
  assert.equal(
    await page
      .locator("#cycle-mask-path")
      .evaluate((e) => e.getAnimations().length),
    0,
  );
  console.log(
    "PASS reduced motion: static process, pulse snapshot and no lifecycle sweep",
  );
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  mobile.on("pageerror", (e) => errors.push(e.message));
  for (const name of ["acoustics", "energy"]) {
    await mobile.goto(base + name + ".html");
    await mobile.evaluate(() => document.fonts.ready);
    await mobile.locator("[data-inspect]").tap();
    assert(await mobile.locator(".texture-lens").isVisible());
    await mobile
      .locator("[data-inspect-material]")
      .tap({ position: { x: 100, y: 120 } });
    await mobile
      .locator("[data-inspect-material]")
      .screenshot({ path: out(name + "-magnifier-mobile.png") });
    assert.equal(
      await mobile.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await mobile.locator("[data-inspect]").tap();
    assert(!(await mobile.locator(".texture-lens").isVisible()));
  }
  console.log("PASS mobile: tap inspection and no horizontal overflow");
  assert.deepEqual(errors, []);
  await browser.close();
  console.log("All five motion additions verified.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
