export function visionContent() {
  return `<section class="container"><div class="vision-hero"><div class="breadcrumbs mono"><a href="index.html">MATERIAL ATLAS</a><span>/</span><span>ABOUT COCOTECH</span></div><div class="eyebrow"><span class="dot"></span> OUR REASON FOR DOING THIS</div><h1>There’s still a use<br>for what’s left.</h1><div class="vision-intro"><span class="mono">COCONUT MATERIAL RESEARCH<br>BASED IN THE INDIAN CONTEXT</span><p>CocoTech starts with two leftovers from coconut processing: husks and shells. We’re studying how to turn one into acoustic panels and the other into activated carbon for energy storage.</p></div><div class="vision-strip"><div class="vision-specimen"><span class="mono">THE SOURCE / HUSK + SHELL</span><canvas data-material="ring" role="img" aria-label="Coconut husk and shell cross-section"></canvas></div><div class="vision-specimen"><span class="mono">PATHWAY 01 / COIR PANEL</span><canvas data-material="panel" role="img" aria-label="Coir panel specimen"></canvas></div><div class="vision-specimen"><span class="mono">PATHWAY 02 / POROUS CARBON</span><canvas data-material="carbon" role="img" aria-label="Porous carbon specimen"></canvas></div></div></div></section><section class="container section two-col principles"><div><div class="eyebrow section-label">01 / THE PROBLEM</div><h2>The food is used.<br>The rest has value too.</h2></div><div><p class="section-copy" style="margin-top:0">Coconut processing leaves bulky husks and hard shells. Some already have useful markets. Where they are discarded or poorly managed, there’s a reason to look for other uses.</p><p class="section-copy">Our approach is to work with the material’s existing structure. Coir’s fibrous network is useful to investigate for sound absorption. Shell-derived carbon can be processed to develop pores for electrochemical applications.</p><p class="section-copy">The Indian manufacturing context matters: local sourcing, simple collection routes, process consistency and affordable production all need attention. A good lab sample is only the first step.</p></div></section><section class="container section principles"><div class="section-heading"><div><div class="eyebrow section-label">02 / CIRCULARITY, WITH THE GAPS LEFT VISIBLE</div><h2>A loop we still<br>have to close.</h2></div><p>Using waste is a start. Circularity also depends on processing, useful service life and what happens after use. Select a stage to see the questions.</p></div><div class="cycle-layout"><div class="cycle-diagram" role="group" aria-label="Explore the material lifecycle"><svg class="cycle-trace" viewBox="0 0 400 400" aria-hidden="true"><defs><mask id="cycle-reveal"><path id="cycle-mask-path" pathLength="1" fill="none" stroke="white" stroke-width="8"/></mask></defs><circle cx="200" cy="200" r="152" fill="none" stroke="#9a9e8d" stroke-width="1" stroke-dasharray="3 7"/><path id="cycle-active-path" fill="none" stroke="#855333" stroke-width="3" mask="url(#cycle-reveal)"/></svg><div class="cycle-center">Use.<br>Learn.<br>Use again?</div><button class="cycle-node" data-cycle="0" aria-pressed="true">01 / SOURCE</button><button class="cycle-node" data-cycle="1" aria-pressed="false">02 / MAKE</button><button class="cycle-node" data-cycle="2" aria-pressed="false">03 / USE</button><button class="cycle-node" data-cycle="3" aria-pressed="false">04 / RECOVER?</button></div><div class="cycle-copy" aria-live="polite"><span class="mono" id="cycle-counter">01 / SOURCE</span><h3 id="cycle-title">Start close to the source.</h3><p id="cycle-text">Map local husk and shell waste streams separately. Check availability, existing uses, collection distance and consistency before choosing a supply route.</p><div class="notice">THE DOTTED LOOP IS AN AIM, NOT A VERIFIED CLOSED-LOOP SYSTEM.</div></div></div></section><section class="manifesto section"><div class="container"><div class="eyebrow section-label">03 / A RULE WE WORK BY</div><h2>A natural ingredient<br>doesn’t make a product<br><em>sustainable by itself.</em></h2><div class="manifesto-bottom"><p>Binders, heat, chemicals, water and transport count too. We want to understand those trade-offs before claiming an environmental benefit.</p><span class="mono">LIFECYCLE ASSESSMENT<br>IS STILL NEEDED.</span></div></div></section><section class="container section two-col"><div><div class="eyebrow section-label">04 / WHERE WE DRAW THE LINE</div><h2>What we can<br>say today.</h2><p class="section-copy">Both material lines are in research and development. These are the limits of the claims on this site.</p></div><div><details class="accordion" open><summary>Absorbing sound is not soundproofing.</summary><p>Coir panels are being developed to absorb sound and reduce reverberation within a room. Blocking sound transmission between spaces is a different problem. We do not claim full soundproofing.</p></details><details class="accordion"><summary>Bio-based is not the same as biodegradable.</summary><p>A finished panel includes fibers, binder and a fabric layer. End-of-life behavior depends on the whole formulation and disposal conditions. We do not claim that the panel is 100% biodegradable.</p></details><details class="accordion"><summary>Carbon research is not a finished device.</summary><p>Activated carbon is an electrode material under investigation. A supercapacitor’s performance depends on electrode fabrication, electrolyte, separator and assembly. No validated device performance is published here.</p></details><details class="accordion"><summary>No results means no performance ranking.</summary><p>We have not published matched test data for these materials and their conventional alternatives. Comparisons will be added once those measurements are available. Environmental benefits also need a lifecycle assessment.</p></details></div></section><div class="container"><a class="next-pathway" href="acoustics.html"><div><span class="mono">BACK TO THE MATERIAL / SPECIMEN 01</span><h3>Start with the husk.</h3></div><span class="round-arrow">↗</span></a></div>`;
}
export function setupVision(root) {
  const stages = [
    [
      "SOURCE",
      "Start close to the source.",
      "Map local husk and shell waste streams separately. Check availability, existing uses, collection distance and consistency before choosing a supply route.",
    ],
    [
      "MAKE",
      "Count everything that goes in.",
      "For panels, that includes fiber treatment, binders, drying and curing. For activated carbon, it includes heat, activating chemicals, washing and effluent treatment. A waste feedstock does not cancel these inputs.",
    ],
    [
      "USE",
      "Make it useful enough to keep.",
      "Panels need validated acoustic response, durability and practical installation. Electrodes need documented cell performance and cycling stability. Useful service life has to be tested for each product.",
    ],
    [
      "RECOVER?",
      "Design for the last day as well.",
      "Repair, reuse, disassembly and recovery options need to be assessed. Binders can limit fiber recovery; used electrodes have their own handling requirements. Neither pathway has a verified closed-loop end-of-life process yet.",
    ],
  ];
  const arcs = [
    "M48 200 A152 152 0 0 1 200 48",
    "M200 48 A152 152 0 0 1 352 200",
    "M352 200 A152 152 0 0 1 200 352",
    "M200 352 A152 152 0 0 1 48 200",
  ];
  const mask = root.querySelector("#cycle-mask-path"),
    line = root.querySelector("#cycle-active-path");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let tracing = null;
  const trace = (i) => {
    tracing?.cancel();
    mask.setAttribute("d", arcs[i]);
    line.setAttribute("d", arcs[i]);
    line.setAttribute("stroke-dasharray", i === 3 ? "4 7" : "none");
    if (!reduced.matches)
      tracing = mask.animate(
        [
          { strokeDasharray: "1", strokeDashoffset: 1 },
          { strokeDasharray: "1", strokeDashoffset: 0 },
        ],
        { duration: 750, easing: "cubic-bezier(.22,1,.36,1)" },
      );
  };
  const reduceChange = () => tracing?.cancel();
  reduced.addEventListener("change", reduceChange);
  trace(0);
  root.querySelectorAll("[data-cycle]").forEach(
    (b) =>
      (b.onclick = () => {
        const i = Number(b.dataset.cycle),
          [label, title, text] = stages[i];
        root
          .querySelectorAll("[data-cycle]")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        root.querySelector("#cycle-counter").textContent =
          `0${i + 1} / ${label}`;
        root.querySelector("#cycle-title").textContent = title;
        root.querySelector("#cycle-text").textContent = text;
        trace(i);
      }),
  );
  return () => {
    tracing?.cancel();
    reduced.removeEventListener("change", reduceChange);
  };
}
