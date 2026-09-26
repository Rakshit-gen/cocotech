// Each short sequence acts on the part that physically changes in the step.
export function playProcess(svg, kind, reduced = false) {
  if (!svg || reduced) return [];
  const animations = [];
  const animate = (nodes, frames, options = {}) => {
    [...nodes].forEach((node, i) => {
      const animation = node.animate(
        typeof frames === "function" ? frames(node, i) : frames,
        {
          duration: 1050,
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "backwards",
          ...options,
          delay: (options.delay || 0) + i * (options.stagger || 0),
        },
      );
      animations.push(animation);
    });
  };
  const part = (name) => svg.querySelectorAll(`[data-part="${name}"]`);
  const pieces = (name) => svg.querySelectorAll(`[data-part="${name}"] > *`);
  const drop = [
    { transform: "translateY(-35px)", opacity: 0 },
    { transform: "translateY(0)", opacity: 1 },
  ];
  const trace = (nodes) =>
    [...nodes].forEach((node) => {
      const length = node.getTotalLength();
      animate(
        [node],
        [
          { strokeDasharray: `${length}`, strokeDashoffset: length },
          { strokeDasharray: `${length}`, strokeDashoffset: 0 },
        ],
        { duration: 1250, easing: "ease-in-out" },
      );
    });
  switch (kind) {
    case "collect":
      animate(pieces("material"), drop, { stagger: 18 });
      break;
    case "clean":
      animate(
        part("water"),
        [
          { transform: "translateY(-14px)", opacity: 0 },
          { transform: "translateY(10px)", opacity: 1, offset: 0.6 },
          { transform: "translateY(18px)", opacity: 0 },
        ],
        { duration: 600, iterations: 2 },
      );
      break;
    case "fiber":
      animate(
        pieces("fibers"),
        (node) => {
          const b = node.getBBox();
          return [
            {
              transform: `translate(${210 - b.x - b.width / 2}px, ${100 - b.y - b.height / 2}px) scaleX(.25)`,
            },
            { transform: "translate(0,0) scaleX(1)" },
          ];
        },
        { stagger: 12 },
      );
      break;
    case "dry":
    case "cure":
      animate(
        part("heat"),
        [
          { transform: "translateY(12px)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1, offset: 0.4 },
          { transform: "translateY(-12px)", opacity: 0 },
        ],
        { duration: 700, iterations: 2 },
      );
      break;
    case "treat":
      animate(part("fibers"), [
        { transform: "translateY(-35px)" },
        { transform: "translateY(0)" },
      ]);
      break;
    case "cut":
      animate(part("blade"), [
        { transform: "translateY(-28px)" },
        { transform: "translateY(17px)", offset: 0.55 },
        { transform: "translateY(0)" },
      ]);
      animate(pieces("material"), drop, { delay: 400, stagger: 12 });
      break;
    case "mix":
      animate(
        part("mixer"),
        [
          { transform: "rotate(-16deg)" },
          { transform: "rotate(16deg)", offset: 0.5 },
          { transform: "rotate(0deg)" },
        ],
        { duration: 650, iterations: 2 },
      );
      animate(
        part("material"),
        [
          { transform: "translateX(-7px)" },
          { transform: "translateX(7px)", offset: 0.5 },
          { transform: "translateX(0)" },
        ],
        { duration: 650, iterations: 2 },
      );
      break;
    case "mould":
      animate(part("panel"), [
        { transform: "translateY(-35px) scaleY(.4)", opacity: 0 },
        { transform: "translateY(0) scaleY(1)", opacity: 1 },
      ]);
      break;
    case "press":
      animate(part("panel"), [
        { transform: "scaleY(1.35)" },
        { transform: "scaleY(1)" },
      ]);
      animate(part("platen"), [
        { transform: "translateY(-35px)" },
        { transform: "translateY(0)" },
      ]);
      break;
    case "finish":
      animate(part("fabric"), [
        { transform: "translateY(-34px)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 },
      ]);
      break;
    case "furnace":
      animate(part("char"), [{ fill: "#b49b73" }, { fill: "#45483d" }], {
        duration: 1500,
      });
      animate(
        part("heat"),
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 1200 },
      );
      break;
    case "sieve":
      animate(
        part("screen"),
        [
          { transform: "translateX(-5px)" },
          { transform: "translateX(5px)", offset: 0.5 },
          { transform: "translateX(0)" },
        ],
        { duration: 230, iterations: 5 },
      );
      animate(pieces("material"), drop, { stagger: 20 });
      break;
    case "activate":
    case "pores":
      animate(
        pieces("pores"),
        [{ transform: "scale(.05)" }, { transform: "scale(1)" }],
        { stagger: 22 },
      );
      break;
    case "electrode":
      animate(part("coating"), [
        { transform: "translateY(-35px)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 },
      ]);
      animate(part("collector"), drop, { duration: 650 });
      break;
    case "assemble":
      animate(
        pieces("stack"),
        (node, i) => [
          { transform: `translateX(${(i - 1) * 35}px)`, opacity: 0 },
          { transform: "translateX(0)", opacity: 1 },
        ],
        { stagger: 140 },
      );
      break;
    case "test":
      trace(part("signal"));
      break;
  }
  return animations;
}

export function setupProcessMotion(container, getKind) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const replay = container.querySelector("[data-replay-process]");
  let animations = [],
    observer,
    inView = false,
    pending = true;
  const cancel = () => {
    animations.forEach((a) => a.cancel());
    animations = [];
  };
  const run = () => {
    cancel();
    pending = false;
    animations = playProcess(
      container.querySelector(".process-illustration svg"),
      getKind(),
      media.matches,
    );
  };
  const preference = () => {
    cancel();
    replay.disabled = media.matches;
    replay.textContent = media.matches
      ? "Motion reduced"
      : "Replay this step ↻";
  };
  preference();
  media.addEventListener("change", preference);
  replay.onclick = run;
  observer = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      if (inView && pending) run();
      if (!inView) cancel();
    },
    { threshold: 0.3 },
  );
  observer.observe(container.querySelector(".process-illustration"));
  return {
    changed() {
      cancel();
      pending = true;
      if (inView) run();
    },
    cleanup() {
      cancel();
      observer.disconnect();
      media.removeEventListener("change", preference);
    },
  };
}
