const { chromium } = require("./browser.cjs");
const path = require("node:path");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const names = process.argv.slice(2);
  for (const name of names.length ? names : ["home"]) {
    for (const [size, width, height] of [
      ["desktop", 1440, 1000],
      ["tablet", 820, 1180],
      ["mobile", 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(
        "http://127.0.0.1:4173/" + (name === "home" ? "index" : name) + ".html",
      );
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(
          __dirname,
          "../screenshots",
          name + "-" + size + ".png",
        ),
        fullPage: true,
      });
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter((e) => {
            const r = e.getBoundingClientRect();
            const s = getComputedStyle(e);
            return (
              r.right > innerWidth + 1 &&
              s.position !== "fixed" &&
              s.display !== "none" &&
              !e.closest(".process-steps") && !e.closest(".specimen-player")
            );
          })
          .map((e) => ({
            tag: e.tagName,
            class: e.className,
            right: e.getBoundingClientRect().right,
          })),
      );
      console.log(JSON.stringify({ page: name, size, overflow, errors }));
    }
  }
  await browser.close();
  if (errors.length) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
