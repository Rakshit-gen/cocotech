import { setupMaterials, drawMaterial } from "./materials.js";
import { acousticContent, energyContent } from "./product-pages.js";
import { setupResearch } from "./interactions.js";
import { visionContent, setupVision } from "./vision.js";
import { setupMagnifiers } from "./magnifier.js";
const app = document.querySelector("#app");
const mark = `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M29 6a17 17 0 1 0 0 28M26 13a9 9 0 1 0 0 14" stroke="currentColor" stroke-width="3.3"/><path d="m31 12 4-4m-3 12h6m-7 8 4 4" stroke="currentColor" stroke-width="1.5"/></svg>`;
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const titles = {
  home: "CocoTech | Coconut materials, in development",
  acoustics: "Acoustic Panels  /  CocoTech Material Atlas",
  energy: "Energy Storage  /  CocoTech Material Atlas",
  vision: "Our Vision  /  CocoTech Material Atlas",
};
function currentPage() {
  const path = location.pathname
    .replace(/\/$/, "")
    .split("/")
    .pop()
    .replace(/\.html$/, "");
  return path === "acoustics"
    ? "acoustics"
    : path === "energy"
      ? "energy"
      : path === "vision"
        ? "vision"
        : "home";
}
function header(page) {
  return `<header class="container"><div class="site-header"><a class="brand" href="index.html" aria-label="CocoTech home">${mark}cocotech<sup>•</sup></a><button class="menu-toggle mono" aria-expanded="false" aria-controls="navigation">Menu +</button><nav class="desktop-nav" id="navigation" aria-label="Main navigation">${[
    ["home", "index.html", "Overview"],
    ["acoustics", "acoustics.html", "Acoustic panels"],
    ["energy", "energy.html", "Energy storage"],
    ["vision", "vision.html", "Our vision"],
  ]
    .map(
      ([id, url, title]) =>
        `<a href="${url}" ${page === id ? 'aria-current="page"' : ""}>${title}</a>`,
    )
    .join(
      "",
    )}<a class="nav-contact" href="#connect">Project brief <span aria-hidden="true">↗</span></a></nav></div></header>`;
}
function contact() {
  return `<section class="container contact" id="connect"><div class="contact-layout"><div><div class="eyebrow"><span class="dot"></span> RESEARCH & DEVELOPMENT PARTNERSHIPS</div><h2>Working on<br>something similar?</h2></div><div class="contact-copy"><p>We’re interested in material testing, local waste sourcing and small-scale trials. Choose a research area to make a short brief for a future conversation.</p><div class="contact-actions"><button class="button" data-open-brief>Make a collaboration brief ${arrow}</button></div><div class="contact-note">For research, material trials & development partnerships.</div></div></div></section>`;
}
function footer() {
  return `<footer class="container"><div class="site-footer"><a class="brand" href="index.html">${mark}cocotech</a><div class="footer-right mono"><span>Coconut material research / India</span><span>Research in progress · 2026</span><a href="#main">Back to top ↑</a></div></div><div class="footer-wordmark" aria-hidden="true"><span>Use what’s left.</span>${mark}</div></footer><dialog class="dialog" id="brief-dialog" aria-labelledby="brief-title"><div class="dialog-header"><h3 id="brief-title">What would you like to work on?</h3><button aria-label="Close dialog" data-close-brief>×</button></div><p>Choose an area of interest and save a short brief. The brief is a local download. No information is sent.</p><label for="interest">RESEARCH PATHWAY</label><select id="interest"><option value="acoustics">Acoustic panel development</option><option value="energy">Activated carbon & energy storage</option><option value="circular">Waste sourcing & circularity</option></select><label for="partner">YOUR PERSPECTIVE</label><select id="partner"><option>Research partner</option><option>Architect or interior designer</option><option>Material supplier</option><option>Potential pilot partner</option></select><button class="button" data-create-brief>Create my brief ${arrow}</button><div id="brief-output" aria-live="polite"></div></dialog>`;
}
function home() {
  return `<main id="main"><section class="container"><div class="home-hero"><div class="hero-copy"><div class="eyebrow"><span class="dot"></span> COCONUT WASTE. MATERIAL RESEARCH. INDIA.</div><h1>It starts with<br>what’s<br><span class="soft">left over.</span></h1><p>Coconut husks for quieter rooms. Coconut shells for energy-storage research. Two ways to put a familiar waste material to work.</p><a class="button" href="#pathways">Explore both materials ${arrow}</a><div class="try-links"><a href="acoustics.html#lab"><svg viewBox="0 0 48 24" aria-hidden="true"><path class="mini-wave" d="M-24 12q6-16 12 0t12 0t12 0t12 0t12 0t12 0t12 0" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span>Try the sound model</span><span aria-hidden="true">↗</span></a><a href="energy.html#lab"><svg viewBox="0 0 48 24" aria-hidden="true"><path d="M36 2v20" stroke="currentColor"/><circle class="mini-ion" cx="8" cy="8" r="2.5" fill="currentColor"/><circle class="mini-ion second" cx="13" cy="17" r="2.5" fill="currentColor"/></svg><span>Try the charge model</span><span aria-hidden="true">↗</span></a></div></div><div class="hero-visual"><div class="specimen-top mono">FIG. 001 / HUSK + SHELL / CROSS-SECTION</div><div class="specimen-player" role="slider" tabindex="0" aria-label="Rotate the coconut cross-section. Drag left or right, or use arrow keys." aria-valuemin="-180" aria-valuemax="180" aria-valuenow="0"><canvas class="specimen-canvas" data-material="ring" data-interactive="true" aria-hidden="true"></canvas><span class="specimen-center mono">DRAG TO ROTATE<br><b>↔</b></span></div><div class="specimen-tools"><button data-separate aria-pressed="false">Separate the layers ↗</button><button data-reset-specimen aria-label="Reset specimen" disabled>↺</button></div><button class="material-tag tag-husk" data-specimen="husk" aria-pressed="false"><span class="tag-num">01</span><span class="mono">THE HUSK<strong>Fiber for quieter rooms</strong></span></button><button class="material-tag tag-shell" data-specimen="shell" aria-pressed="false"><span class="tag-num">02</span><span class="mono">THE SHELL<strong>Carbon for electrodes</strong></span></button><p class="specimen-hint" aria-live="polite">DRAG THE SPECIMEN. SELECT A LAYER. TAKE IT APART.</p><div class="specimen-caption mono"><span>COCOS NUCIFERA · MATERIAL STUDY</span><span>ILLUSTRATION, NOT TO SCALE</span></div></div></div><div class="hero-foot mono"><span class="status">TWO PATHWAYS. BOTH IN DEVELOPMENT.</span><span>LOCALLY SOURCED. SCIENTIFICALLY EXPLORED.</span></div></section><section class="container section pathways" id="pathways"><div class="section-heading"><div><div class="eyebrow section-label">01 / THE MATERIAL ATLAS</div><h2>Same coconut.<br>Different jobs.</h2></div><p>The husk gives us fibers. The shell gives us carbon. We’re developing each separately, because they behave differently and serve different purposes.</p></div><div class="pathway-grid"><a href="acoustics.html" class="pathway"><div class="pathway-top"><span class="pathway-num">01</span><span class="mono">HUSK → FIBER → QUIET</span></div><div class="pathway-art"><canvas data-material="panel" role="img" aria-label="Tactile coir fiber acoustic panel specimen"></canvas></div><div class="pathway-bottom"><div><span class="mono">COIR-BASED MATERIALS</span><h3>Acoustic panels.</h3><p>Coconut fiber acoustic panels, developed to absorb sound and reduce reverberation.</p></div><span class="round-arrow" aria-label="Explore acoustic panels">↗</span></div></a><a href="energy.html" class="pathway"><div class="pathway-top"><span class="pathway-num">02</span><span class="mono">SHELL → CARBON → CHARGE</span></div><div class="pathway-art"><canvas data-material="carbon" role="img" aria-label="Porous carbon material illustration"></canvas></div><div class="pathway-bottom"><div><span class="mono">ACTIVATED CARBON MATERIALS</span><h3>Carbon electrodes.</h3><p>Activated carbon made from coconut shells, under study for supercapacitor electrodes.</p></div><span class="round-arrow" aria-label="Explore energy storage">↗</span></div></a></div><div class="pathway-note"><span>Different feedstocks. Different processes. One waste-to-value philosophy.</span><span>R&D-STAGE / NOT YET COMMERCIAL PRODUCTS</span></div></section><section class="manifesto section"><div class="container"><div class="eyebrow section-label">02 / THE WAY WE SEE IT</div><h2>The coconut gets used.<br><em>The leftovers<br>should too.</em></h2><div class="manifesto-bottom"><p>The husk and shell are often left after the useful food has been taken. We’re looking at what their fibers and carbon can do, and what it takes to use them well.</p><a class="text-link" href="vision.html">Why we’re working on this ${arrow}</a></div></div></section>${contact()}</main>`;
}
const pages = {
  home,
  acoustics: () => `<main id="main">${acousticContent()}${contact()}</main>`,
  energy: () => `<main id="main">${energyContent()}${contact()}</main>`,
  vision: () => `<main id="main">${visionContent()}${contact()}</main>`,
};
let cleanup = () => {};
function wireCommon() {
  const menu = document.querySelector(".menu-toggle");
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", open);
    menu.textContent = open ? "Close −" : "Menu +";
    document.querySelector("#navigation").classList.toggle("open", open);
  });
  document.querySelectorAll("#navigation a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "Menu +";
      document.querySelector("#navigation").classList.remove("open");
    }),
  );
  const dialog = document.querySelector("#brief-dialog");
  document
    .querySelectorAll("[data-open-brief]")
    .forEach((b) => b.addEventListener("click", () => dialog.showModal()));
  document
    .querySelector("[data-close-brief]")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const b = dialog.getBoundingClientRect();
      if (
        e.clientX < b.left ||
        e.clientX > b.right ||
        e.clientY < b.top ||
        e.clientY > b.bottom
      )
        dialog.close();
    }
  });
  dialog.querySelectorAll("select").forEach((select) =>
    select.addEventListener("change", () => {
      document.querySelector("#brief-output").replaceChildren();
    }),
  );
  document
    .querySelector("[data-create-brief]")
    .addEventListener("click", () => {
      const interest = document.querySelector("#interest"),
        partner = document.querySelector("#partner");
      const brief = `COCOTECH / COLLABORATION BRIEF\n\nPathway: ${interest.selectedOptions[0].text}\nPerspective: ${partner.value}\n\nResearch status: in development.\n\nDiscussion points:\n${interest.value === "acoustics" ? "• Coir supply, panel formulation and bio-based binder options.\n• Sample development and acoustic testing conditions.\n• Pilot-space requirements and material durability." : interest.value === "energy" ? "• Shell sourcing and activation conditions.\n• Pore characterization and electrode fabrication.\n• Electrochemical testing protocols and scale-up questions." : "• Local husk and shell collection, kept as separate feedstocks.\n• Cleaning, drying, logistics and batch traceability.\n• Lifecycle assessment and feasible end-of-life pathways."}\n\nNo product performance, commercial availability or partnership is implied by this brief.`;
      const output = document.querySelector("#brief-output");
      output.innerHTML =
        '<label for="brief-text">YOUR BRIEF / EDIT BEFORE DOWNLOADING</label><textarea id="brief-text"></textarea><button class="button" id="download-brief">Download brief ↓</button><p class="contact-note">Ready to download. Nothing has been submitted.</p>';
      document.querySelector("#brief-text").value = brief;
      document.querySelector("#download-brief").onclick = () => {
        const blob = new Blob([document.querySelector("#brief-text").value], {
            type: "text/plain",
          }),
          url = URL.createObjectURL(blob),
          a = document.createElement("a");
        a.href = url;
        a.download = "cocotech-collaboration-brief.txt";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        output.querySelector(".contact-note").textContent =
          "Download started. Nothing was submitted.";
      };
      document.querySelector("#brief-text").focus();
    });
}
function render({ focus = false } = {}) {
  cleanup();
  const page = currentPage();
  document.title = titles[page];
  app.innerHTML = header(page) + (pages[page] || home)() + footer();
  wireCommon();
  const offMaterials = setupMaterials(app);
  const offMagnifiers = setupMagnifiers(app);
  const offPage = setupPage(page);
  cleanup = () => {
    offMaterials();
    offMagnifiers();
    offPage();
  };
  if (focus) {
    const main = document.querySelector("#main");
    main.tabIndex = -1;
    main.focus({ preventScroll: true });
  }
}
function setupPage(page) {
  return page === "vision" ? setupVision(app) : setupResearch(page, app);
}
let activeTransition = null;
function navigate(url, push = true, origin = null) {
  activeTransition?.skipTransition();
  const target = new URL(url, location.href);
  const material = origin?.querySelector("[data-material]")?.dataset.material;
  const source = origin?.querySelector("[data-material]");
  const transfer =
    source &&
    !target.hash &&
    ["panel", "carbon"].includes(material) &&
    document.startViewTransition &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (transfer) source.style.viewTransitionName = "travelling-specimen";
  const update = () => {
    if (push) history.pushState({}, "", url);
    render({ focus: true });
    if (transfer) {
      const destination = app.querySelector(
        `.page-hero-art [data-material="${material}"]`,
      );
      if (destination) {
        destination.style.viewTransitionName = "travelling-specimen";
        // Painting is suspended during a view-transition callback. Draw directly
        // rather than waiting for an animation frame before its snapshot.
        drawMaterial(destination, material);
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    if (location.hash)
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "instant" });
  };
  if (
    document.startViewTransition &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const transition = document.startViewTransition(update);
    activeTransition = transition;
    // A second navigation can legitimately skip the first visual transition.
    // Its DOM update still runs; only the optional animation is cancelled.
    transition.ready.catch(() => {});
    transition.finished
      .finally(() => {
        if (activeTransition !== transition) return;
        activeTransition = null;
        app
          .querySelectorAll("[data-material]")
          .forEach((canvas) =>
            canvas.style.removeProperty("view-transition-name"),
          );
      })
      .catch(() => {});
  } else update();
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (
    !a ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    e.button !== 0 ||
    a.hasAttribute("download") ||
    a.target
  )
    return;
  const url = new URL(a.href);
  if (url.origin !== location.origin) return;
  const name = url.pathname.split("/").pop();
  if (
    ["index.html", "acoustics.html", "energy.html", "vision.html", ""].includes(
      name,
    ) &&
    url.pathname !== location.pathname
  ) {
    e.preventDefault();
    navigate(url, true, a.closest(".pathway"));
  }
});
window.addEventListener("popstate", () => navigate(location.href, false));
render();
if (location.hash)
  requestAnimationFrame(() =>
    document
      .querySelector(location.hash)
      ?.scrollIntoView({ behavior: "instant" }),
  );
