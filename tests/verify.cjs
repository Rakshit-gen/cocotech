const { chromium } = require("./browser.cjs");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = "http://127.0.0.1:4173/";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [],
    failed = [],
    checks = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) failed.push(r.url());
  });
  const check = (name) => {
    checks.push(name);
    console.log("PASS " + name);
  };
  for (const name of ["index", "acoustics", "energy", "vision"]) {
    for (const width of [360, 390, 768, 820, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + name + ".html");
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(90);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        h1: document.querySelectorAll("h1").length,
        main: document.querySelectorAll("main").length,
        text: document.body.innerText,
        fonts:
          document.fonts.check("14px Manrope") &&
          document.fonts.check("10px Plex"),
      }));
      assert.equal(layout.scroll, layout.width, `${name} overflow at ${width}`);
      assert.equal(layout.h1, 1);
      assert.equal(layout.main, 1);
      assert(layout.fonts);
      assert(!/[—–]|Lorem ipsum|AI.generated/i.test(layout.text));
    }
    check(name + ": six responsive widths, fonts, landmarks and copy");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const [name, total, metrics] of [
    ["acoustics", 12, 6],
    ["energy", 11, 7],
  ]) {
    await page.goto(base + name + ".html");
    await page.evaluate(() => document.fonts.ready);
    const stages = page.locator("[data-step]");
    assert.equal(await stages.count(), total);
    const pictures = new Set();
    for (let i = 0; i < total; i++) {
      await stages.nth(i).click();
      assert.equal(await stages.nth(i).getAttribute("aria-selected"), "true");
      assert.equal(
        await page.locator("#step-count").textContent(),
        `${String(i + 1).padStart(2, "0")} / ${total}`,
      );
      assert((await page.locator(".process-text p").textContent()).length > 50);
      pictures.add(await page.locator(".process-illustration").innerHTML());
    }
    assert.equal(pictures.size, total);
    assert(await page.locator("[data-next]").isDisabled());
    await page.locator("[data-prev]").click();
    assert.equal(
      await stages.nth(total - 2).getAttribute("aria-selected"),
      "true",
    );
    await stages.first().click();
    assert(await page.locator("[data-prev]").isDisabled());
    await stages.first().focus();
    await page.keyboard.press("End");
    assert.equal(await stages.last().getAttribute("aria-selected"), "true");
    await page.keyboard.press("Home");
    assert.equal(await stages.first().getAttribute("aria-selected"), "true");
    check(
      name +
        ": every process stage, distinct diagram, arrow buttons and keyboard controls",
    );
    const metricTabs = page.locator("[data-metric]"),
      descriptions = new Set();
    assert.equal(await metricTabs.count(), metrics);
    for (let i = 0; i < metrics; i++) {
      await metricTabs.nth(i).click();
      assert.equal(
        await metricTabs.nth(i).getAttribute("aria-selected"),
        "true",
      );
      descriptions.add(
        await page.locator(".metric-description p").textContent(),
      );
    }
    assert.equal(descriptions.size, metrics);
    assert.equal(await page.locator("#reference").count(), 0);
    assert.equal(await page.locator(".chart-track").count(), 0);
    assert(await page.locator(".measurement-status").isVisible());
    check(
      name +
        ": evaluation tabs and clear measurement status without empty controls",
    );
    const lab = page.locator("[data-simulation]");
    await lab.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const pause = page.locator("[data-motion]");
    if ((await pause.getAttribute("aria-pressed")) === "false")
      await pause.click();
    const hash = () =>
      page.locator("[data-simulation] canvas").evaluate((c) => c.toDataURL());
    const before = await hash();
    await page.locator("#structure").fill("95");
    await page.locator("#excitation").fill("95");
    assert.notEqual(await hash(), before);
    assert.equal(await page.locator("#excitation-value").textContent(), "HIGH");
    const still = await hash();
    await page.waitForTimeout(180);
    assert.equal(await hash(), still);
    await pause.click();
    await page.waitForTimeout(220);
    assert.notEqual(await hash(), still);
    check(
      name +
        ": sliders change rendered model, pause freezes it, play resumes it",
    );
    const timing = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const dt = [];
          let last = 0;
          function measure(t) {
            if (last) dt.push(t - last);
            last = t;
            if (dt.length < 90) requestAnimationFrame(measure);
            else {
              dt.sort((a, b) => a - b);
              resolve({ median: dt[45], p95: dt[85], max: dt[89] });
            }
          }
          requestAnimationFrame(measure);
        }),
    );
    console.log(name + " animation frame intervals " + JSON.stringify(timing));
    assert(timing.p95 < 40, "Animation missed sustained frame budget");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await lab.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    assert.equal(await pause.getAttribute("aria-pressed"), "true");
    const reduced = await hash();
    await page.waitForTimeout(200);
    assert.equal(await hash(), reduced);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    check(name + ": frame timing and reduced-motion defaults");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + name + ".html");
    await page.locator("[data-process]").scrollIntoViewIfNeeded();
    for (let i = 1; i < total; i++) await page.locator("[data-next]").click();
    assert.equal(
      await page.locator("[data-step]").last().getAttribute("aria-selected"),
      "true",
    );
    assert.equal(
      await page.locator(".process-steps").getAttribute("aria-orientation"),
      "horizontal",
    );
    check(name + ": mobile process navigation");
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.goto(base + "index.html");
  assert(await page.locator("[data-reset-specimen]").isDisabled());
  await page.locator("[data-specimen=husk]").click();
  assert((await page.locator(".specimen-hint").textContent()).includes("Coir"));
  await page.locator("[data-specimen=shell]").click();
  assert(
    (await page.locator(".specimen-hint").textContent()).includes(
      "Activated carbon",
    ),
  );
  check("home: both material selectors");
  assert.equal(
    await page.locator("[data-separate]").getAttribute("aria-pressed"),
    "true",
  );
  await page.locator("[data-reset-specimen]").click();
  assert.equal(
    await page.locator("[data-separate]").getAttribute("aria-pressed"),
    "false",
  );
  assert(await page.locator("[data-reset-specimen]").isDisabled());
  const specimen = page.locator(".specimen-player");
  await specimen.focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await specimen.getAttribute("aria-valuenow"), "10");
  assert(await page.locator("[data-reset-specimen]").isEnabled());
  const box = await specimen.boundingBox();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.5, {
    steps: 15,
  });
  await page.mouse.up();
  assert(Number(await specimen.getAttribute("aria-valuenow")) > 10);
  await page.locator("[data-separate]").click();
  await page.waitForTimeout(850);
  await page.screenshot({
    path: path.join(__dirname, "../screenshots/home-separated.png"),
  });
  check("home: drag rotation, keyboard rotation, layer separation and reset");
  await page.locator('.try-links a[href="acoustics.html#lab"]').click();
  await page.waitForURL("**/acoustics.html#lab");
  await page.waitForTimeout(500);
  assert(Math.abs((await page.locator("#lab").boundingBox()).y) < 50);
  await page.goto(base + "energy.html#lab");
  await page.waitForTimeout(400);
  assert(Math.abs((await page.locator("#lab").boundingBox()).y) < 50);
  await page.goto(base + "index.html");
  check("model shortcuts: direct navigation and reload land at the live model");
  await page.evaluate(() => (window.__navigationSentinel = 1));
  await page.locator('#navigation a[href="acoustics.html"]').click();
  await page.waitForURL("**/acoustics.html");
  await page.locator("[data-process]").waitFor();
  assert.equal(await page.evaluate(() => window.__navigationSentinel), 1);
  await page.goBack();
  await page.locator("[data-specimen=husk]").waitFor();
  check("navigation: page transitions and browser history without a reload");
  await page.goto(base + "vision.html");
  const cycleTexts = new Set();
  for (let i = 0; i < 4; i++) {
    await page.locator(`[data-cycle="${i}"]`).click();
    cycleTexts.add(await page.locator("#cycle-text").textContent());
  }
  assert.equal(cycleTexts.size, 4);
  await page.locator(".accordion summary").nth(2).click();
  assert.equal(
    await page.locator(".accordion").nth(2).getAttribute("open"),
    "",
  );
  check("vision: all lifecycle stages and disclosure panels");
  await page.locator("[data-open-brief]").click();
  assert(await page.locator("#brief-dialog").isVisible());
  await page.locator("#interest").selectOption("energy");
  await page.locator("[data-create-brief]").click();
  assert(
    (await page.locator("#brief-text").inputValue()).includes(
      "Electrochemical",
    ),
  );
  await page.locator("#brief-text").fill("My edited research brief.");
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#download-brief").click();
  const download = await downloadPromise;
  assert.equal(
    download.suggestedFilename(),
    "cocotech-collaboration-brief.txt",
  );
  await page.keyboard.press("Escape");
  assert(!(await page.locator("#brief-dialog").isVisible()));
  check("collaboration: dialog, tailored brief, real download and Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "index.html");
  await page.locator(".menu-toggle").click();
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "true",
  );
  await page.locator('#navigation a[href="energy.html"]').click();
  await page.waitForURL("**/energy.html");
  await page.locator("[data-process]").waitFor();
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  check("mobile: menu opens, navigates and closes");
  function luminance(hex) {
    const channels = hex
      .match(/[a-f\d]{2}/gi)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }
  const contrast = [];
  for (const [label, fg, bg, min] of [
    ["Body", "#262923", "#eeede6", 4.5],
    ["Muted", "#626457", "#eeede6", 4.5],
    ["Muted on specimen", "#626457", "#e7e6dc", 4.5],
    ["Dark section", "#c3c5b8", "#262923", 4.5],
    ["Accent", "#d7d8ab", "#262923", 4.5],
    ["Large display", "#797c6a", "#eeede6", 3],
  ]) {
    const [a, b] = [luminance(fg), luminance(bg)].sort((a, b) => b - a),
      ratio = (a + 0.05) / (b + 0.05);
    contrast.push({ label, ratio: Number(ratio.toFixed(2)) });
    assert(ratio >= min, `${label} contrast ${ratio}`);
  }
  check("palette: WCAG AA text contrast");
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  check("no browser exceptions or failed asset requests");
  fs.writeFileSync(
    path.join(__dirname, "../screenshots/verification.json"),
    JSON.stringify(
      { checkedAt: new Date().toISOString(), checks, contrast, errors, failed },
      null,
      2,
    ),
  );
  await browser.close();
  console.log(`${checks.length} verification groups passed.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
