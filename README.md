# CocoTech

A four-page site built around a material specimen atlas. Manrope handles the editorial typography; IBM Plex Mono handles specimen labels and controls. Paper, carbon, coir and a pale mineral accent form the palette.

## Run

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No build step or runtime packages are needed. Fonts and all illustrations are served locally. Open the site through the server, rather than opening the HTML as a file, because the scripts use ES modules.

## Pages

- `index.html`: home, interactive husk/shell specimen, two product routes.
- `acoustics.html`: 12-stage process, interactive sound model, six evaluation metrics, intended markets and a proposed business model.
- `energy.html`: 11-stage process, interactive ion-storage model, seven evaluation topics and future work.
- `vision.html`: problem statement, interactive lifecycle diagram and claim boundaries.

Each URL works on a plain static server. Internal links use the browser View Transition API when available, with a standard immediate update as fallback. Back/forward navigation is supported.

## Interactions and evidence

- The home specimen supports pointer dragging, arrow-key rotation, layer separation and reset. The two model shortcuts lead directly to the live simulations.
- Process explorers support clicks, previous/next buttons, arrow keys, Home and End. Mobile uses a horizontally scrollable stage selector.
- Canvas models respond to both sliders, stop when offscreen, include pause/play, and start paused for reduced-motion preferences.
- Evaluation tabs explain each measurement and its test conditions. No empty chart or reference selector is shown while validated numerical results are unavailable.
- The collaboration dialog creates an editable brief and downloads the edited text. It does not submit anything, invent a contact address or imply an operational backend.
- The illustrations are procedural schematics, not specimen photographs or microscopy results.
- The ion model is a simplified negative-electrode interface. Positive ions approach the surface and negative ions move away as the illustrative charge state increases.

## Validation

With Playwright installed and the local server running:

```sh
npm install
npx playwright install chromium
npm test
npm run screenshots
```

Browser checks cover all pages at widths of 360, 390, 768, 820, 1440 and 1920 pixels; every process stage; evaluation controls; both canvas models; pause/play; reduced motion; page history; mobile menus; lifecycle controls; the brief download; and text contrast.

`screenshots/` contains desktop, tablet and mobile renders. `screenshots/verification.json` records the latest completed check. Frame timing is checked in local headless Chromium, not claimed as a guarantee on every device.

## Files

- `app.js`: shared layout, home, navigation and brief generator.
- `product-pages.js`: acoustic and energy page templates.
- `research.js`: separate manufacturing steps and evaluation content for each line.
- `materials.js`: responsive procedural specimen drawings.
- `specimen-player.js`: cached texture layers, drag rotation and separation controls.
- `interactions.js`: process diagrams, evaluation controls and simulations.
- `vision.js`: vision page and lifecycle controls.
- `styles.css`: shared visual system and responsive layouts.

Font licenses are included in `assets/`. No analytics, third-party embeds or external runtime requests are used.

Before a public commercial launch, replace the illustrative specimens with documented samples where available, review the proposed business model with the company, and connect an approved contact endpoint if one is wanted. Publish measured comparisons only when the methods and results are available.

## Deploy

Run `python3 scripts/build.py` to produce the allowlisted `dist/` folder and `cocotech-deploy.zip`. See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting settings, domains and live verification.
