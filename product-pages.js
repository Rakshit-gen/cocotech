import { research } from "./research.js";
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
export function productHero(type) {
  const a = type === "acoustics",
    d = research[type];
  return `<section class="container page-hero"><div class="breadcrumbs mono"><a href="index.html">MATERIAL ATLAS</a><span>/</span><span>${d.code} · ${d.name}</span></div><div class="page-hero-grid"><div><div class="eyebrow"><span class="dot"></span> SPECIMEN ${a ? "01" : "02"} / ${d.feedstock}</div><h1>${a ? "Less echo.<br>Made from coir." : "From shell<br>to electrode."}</h1><p class="page-intro">${a ? "From Coconut Waste to Quiet Spaces. We’re developing coir-based acoustic panels that put the structure of natural fibers to work." : "From coconut waste to high-value carbon materials for the next generation of energy storage. Our focus: activated carbon for supercapacitor electrodes."}</p><a class="button" href="#process">See how it’s made ${arrow}</a><a class="lab-jump" href="#lab"><span class="play-mark" aria-hidden="true">▷</span> ${a ? "Try the interactive sound model" : "Try the interactive charge model"} <span aria-hidden="true">↓</span></a></div><div class="page-hero-art" data-inspect-material="${d.material}"><span class="art-corner mono">${d.code} / MATERIAL STUDY</span><canvas data-material="${d.material}" role="img" aria-label="${a ? "Schematic coir acoustic panel" : "Schematic porous activated carbon"}"></canvas><div class="texture-lens" hidden><canvas aria-hidden="true"></canvas><span class="mono">ENLARGED SCHEMATIC</span></div><div class="inspection-controls"><button data-inspect aria-pressed="false">Inspect texture ⊕</button><span class="inspect-hint">Enlarged illustration. No microscopic scale implied.</span></div><div class="art-label"><span>${a ? "COIR FIBER + BINDER" : "SHELL-DERIVED POROUS CARBON"}</span><span>ILLUSTRATIVE / NOT A MICROGRAPH</span></div></div></div><div class="notice"><span class="mono">RESEARCH STATUS / IN DEVELOPMENT</span><p>${a ? "Designed for sound absorption and reverberation reduction, not full soundproofing. Performance, durability and environmental claims require validation." : "A materials and electrode research pathway, not a commercially validated energy-storage device. No capacitance, lifetime or cost advantage is claimed."}</p></div></section>`;
}
export function processSection(type) {
  const d = research[type];
  return `<section class="container section process-section" id="process"><div class="section-heading"><div><div class="eyebrow section-label">02 / THE TRANSFORMATION</div><h2>${type === "acoustics" ? "How a panel takes shape." : "From shell to cell."}</h2></div><p>Select a step to see what happens to the material and why it matters.</p></div><p class="mobile-step-label">SWIPE THE STAGE SELECTOR OR USE THE ARROWS BELOW →</p><div class="process-console" data-process="${type}"><div class="process-steps" role="tablist" aria-label="Manufacturing stages" aria-orientation="vertical">${d.stages.map(([name], i) => `<button class="process-step" role="tab" id="step-${i}" aria-controls="process-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-step="${i}"><span class="mono">${String(i + 1).padStart(2, "0")}</span>${name}</button>`).join("")}</div><div class="process-display" id="process-panel" role="tabpanel" aria-labelledby="step-0" tabindex="0"><div class="process-meta mono"><span>${d.code} / PROCESS EXPLORER</span><span id="step-count">01 / ${d.stages.length}</span></div><div class="process-illustration" aria-hidden="true"></div><div class="process-animation-tools"><span class="mono">ONE STEP AT A TIME</span><button data-replay-process>Replay this step ↻</button></div><div class="process-text" aria-live="polite"><h3></h3><p></p></div><div class="process-controls"><span class="mono">TRACE THE MATERIAL</span><div class="process-progress" aria-hidden="true">${d.stages.map(() => "<span></span>").join("")}</div><div><button data-prev aria-label="Previous stage">←</button><button data-next aria-label="Next stage">→</button></div></div></div></div><p class="process-footnote">DEVELOPMENT PATHWAY / Schematics explain the process; they are not validated production specifications.</p></section>`;
}
export function labSection(type) {
  const a = type === "acoustics";
  return `<section class="lab section" id="lab"><div class="container"><div class="section-heading"><div><div class="eyebrow section-label">03 / THE MATERIAL, IN MOTION</div><h2>${a ? "What happens<br>when sound meets coir?" : "A charge held<br>at the surface."}</h2></div><p>${a ? "Air movement through a porous fiber network dissipates some acoustic energy. Explore the principle by changing the illustrated structure." : "Accessible carbon surfaces allow ions in an electrolyte to accumulate at the electrode interface. Explore a simplified view of that process."}</p></div><div class="simulation" data-simulation="${type}"><div class="simulation-stage"><canvas role="img" aria-label="${a ? "Conceptual sound waves attenuating through a porous fiber layer" : "Conceptual ions accumulating along the accessible surface of porous carbon"}"></canvas><div class="simulation-labels mono"><span>${a ? "INCIDENT SOUND →" : "ELECTROLYTE / MOBILE IONS"}</span><span>${a ? "FIBER NETWORK" : "POROUS CARBON SURFACE"}</span><span>${a ? "ATTENUATED WAVE →" : "INTERFACE"}</span></div></div><div class="simulation-controls"><div><label class="control-label" for="structure"><span>${a ? "FIBER NETWORK" : "PORE ACCESSIBILITY"}</span><output id="structure-value">${a ? "BALANCED" : "PARTIAL"}</output></label><input type="range" id="structure" min="0" max="100" value="50" aria-valuetext="${a ? "Balanced fiber network" : "Partial pore accessibility"}"></div><div><label class="control-label" for="excitation"><span>${a ? "RELATIVE FREQUENCY" : "CHARGE STATE"}</span><output id="excitation-value">MID</output></label><input type="range" id="excitation" min="0" max="100" value="50" aria-valuetext="Mid"></div><button data-motion aria-pressed="false">Pause motion Ⅱ</button>${a ? `<button class="pulse-button" data-send-pulse>Send a sound pulse →</button><p class="pulse-status" role="status" aria-live="polite">Send one pulse and follow it through the fibers.</p>` : ""}<div class="simulation-key"><i></i> ${a ? "WAVE ENERGY (ILLUSTRATED)" : "IONS IN ELECTROLYTE (ILLUSTRATED)"}</div><p>${a ? "More compaction is not automatically better. Real absorption depends on interconnected pores, airflow resistance and frequency." : "Pores must be accessible to electrolyte ions. Surface area, pore size, electrolyte and electrode structure all matter."}</p></div></div><p class="lab-note">CONCEPTUAL MODEL ONLY / ${a ? "Slider positions are qualitative controls, not measured density, frequency or absorption values. This animation is not a performance prediction. No audio is played." : "This shows a negative electrode attracting positive ions and repelling negative ions. It illustrates interfacial charge storage, not a battery reaction. Positions and speeds are illustrative; no capacitance or device performance is calculated."}</p></div></section>`;
}
export function comparisonSection(type) {
  const d = research[type];
  return `<section class="container section comparison"><div class="section-heading"><div><div class="eyebrow section-label">04 / EVIDENCE BEFORE CLAIMS</div><h2>What needs<br>to be measured.</h2></div><p>Choose a measurement to see how we’ll assess it. Each topic explains what a useful test needs to establish.</p></div><div class="metric-tabs" role="tablist" aria-label="Evaluation metrics">${d.metrics.map(([name], i) => `<button role="tab" class="metric-tab" id="metric-${i}" aria-controls="metric-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-metric="${i}">${name}</button>`).join("")}</div><div class="chart-layout" id="metric-panel" role="tabpanel" aria-labelledby="metric-0"><aside class="measurement-status"><div class="eyebrow" id="chart-metric"></div><h3>Measurements not yet published.</h3><p id="chart-axis"></p><p>We’ll compare samples with reference materials once we have results from matched test conditions.</p><div class="mono">POSSIBLE REFERENCE MATERIALS</div><p>${d.references.join(" · ")}</p></aside><div class="metric-description" aria-live="polite"><h3></h3><p></p><span class="mono">MEASUREMENT FRAMEWORK / RESULTS IN DEVELOPMENT</span></div></div></section>`;
}
const list = (items) =>
  `<ol class="detail-list">${items.map(([h, p], i) => `<li><span class="mono">0${i + 1}</span><div><h3>${h}</h3><p>${p}</p></div></li>`).join("")}</ol>`;
export function acousticContent() {
  return `${productHero("acoustics")}<section class="container section two-col"><div><div class="eyebrow section-label">01 / THE DESIGN QUESTIONS</div><h2>Coir is the start.<br>The mix matters.</h2><p class="section-copy">A useful panel has to absorb sound, hold together and stand up to everyday use. The fiber, binder and finishing layer all affect that balance.</p></div>${list(
    [
      [
        "Finding the right binder",
        "Bio-based binder options are under investigation. The right formulation needs to hold the fibers without closing the pathways that make absorption possible.",
      ],
      [
        "A surface that still breathes",
        "A dust-resistant breathable fabric layer is part of the panel design. Its influence on sound absorption and maintenance must be evaluated.",
      ],
      [
        "Getting the structure right",
        "Thickness, density, fiber size and binder ratio are optimization variables. Potential thermal-insulation benefits remain a separate question for testing.",
      ],
    ],
  )}</section>${processSection("acoustics")}${labSection("acoustics")}${comparisonSection("acoustics")}<section class="container section two-col"><div><div class="eyebrow section-label">05 / FROM THE LAB TO THE ROOM</div><h2>For rooms<br>with too much echo.</h2><p class="section-copy">We’re designing for spaces where people speak, work and listen. These are intended uses; we have not presented validated installations.</p><div class="audiences">${["Schools", "Studios", "Offices", "Auditoriums", "Cafés", "Co-working spaces", "Eco-conscious homes"].map((s) => `<span>${s}</span>`).join("")}</div></div><div><h3>How we plan to bring it to market.</h3><p class="section-copy">The proposed route is B2B material supply for architects, interior contractors and acoustic integrators, with potential homeowner access through channel partners.</p><div class="business"><div class="mono">FIRST / SAMPLES & PARTNERSHIPS</div><p>Develop test specimens, establish performance evidence and explore partner-led room trials before making installation or commercial claims.</p></div><div class="business"><div class="mono">NEXT / VALIDATION BEFORE SCALE</div><p>Product dimensions, pricing, production capacity, fire performance and installation specifications remain to be established. A bio-based composition alone does not make a finished panel “100% biodegradable.”</p></div></div></section><div class="container"><a class="next-pathway" href="energy.html"><div><span class="mono">CONTINUE THROUGH THE ATLAS / SPECIMEN 02</span><h3>Next: carbon from the shell.</h3></div><span class="round-arrow">↗</span></a></div>`;
}
export function energyContent() {
  return `${productHero("energy")}<section class="container section two-col"><div><div class="eyebrow section-label">01 / WHAT WE’RE INVESTIGATING</div><h2>The useful part<br>is the empty space.</h2><p class="section-copy">Activation develops pores within carbon. We’re studying how to make those pores accessible to electrolyte ions, then testing the material as an electrode.</p></div>${list(
    [
      [
        "Three variables to work with",
        "Activating-agent ratio, temperature and time influence the resulting pore structure. Each needs to be studied alongside electrochemical performance.",
      ],
      [
        "A local source of carbon",
        "Coconut shell waste offers a locally sourced feedstock in India. Consistent quality, collection and processing still need to be worked out at scale.",
      ],
      [
        "From a powder to an electrode",
        "Surface-area measurements are one part of the picture. Electrode formulation, electrolyte and cell assembly affect the performance of the finished test cell.",
      ],
    ],
  )}</section>${processSection("energy")}${labSection("energy")}${comparisonSection("energy")}<section class="container section two-col"><div><div class="eyebrow section-label">05 / THE WORK AHEAD</div><h2>A promising source.<br>A lot left to test.</h2><p class="section-copy">The aim is a repeatable route from local shell waste to useful electrode material. That means checking the whole process, not just one good result.</p></div>${list(
    [
      [
        "Refine the activation process",
        "Study the relationship between activation conditions, pore structure and charge storage. Repeat measurements across batches before settling on a formulation.",
      ],
      [
        "Test the full cell",
        "Extend evaluation from material and electrode measurements to assembled supercapacitors. Document charge-discharge behavior, internal resistance and cycling stability.",
      ],
      [
        "Work out the resource cost",
        "Evaluate carbon yield, activating chemicals, wash water, heat, effluent handling and fabrication costs. These determine whether a process can scale responsibly.",
      ],
      [
        "Build the right partnerships",
        "Potential next steps include research collaborations, electrode-development trials and pilot-scale studies. Commercial supply and application readiness are not established.",
      ],
    ],
  )}</section><div class="container"><a class="next-pathway" href="acoustics.html"><div><span class="mono">ALSO IN THE ATLAS / SPECIMEN 01</span><h3>What can the husk do?</h3></div><span class="round-arrow">↗</span></a></div>`;
}
