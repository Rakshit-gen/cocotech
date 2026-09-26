import { research } from "./research.js";
import { random } from "./materials.js";
const fiberPaths = Array.from({ length: 32 }, (_, i) => {
  const x = 115 + (i % 8) * 23,
    y = 43 + Math.floor(i / 8) * 34;
  return `<path d="M${x} ${y}q17 -13 29 9t21 -4"/>`;
}).join("");
function illustration(kind, index, type) {
  const common =
    '<g fill="none" stroke="#c9c9bc" stroke-width="1"><path d="M28 195H392M45 25V210M375 25V210" stroke-dasharray="3 6"/><path d="M35 35h20m-10-10v20M365 185h20m-10-10v20"/></g>';
  const shell =
    '<path d="M120 95Q210 212 305 95L290 78Q210 162 135 78Z" fill="#855333" stroke="#262923"/>';
  const smalls = Array.from(
    { length: 22 },
    (_, i) =>
      `<path d="m${130 + ((i * 47) % 145)} ${75 + ((i * 31) % 95)} 12 -4 7 9 -13 5Z" fill="${type === "energy" ? "#45483d" : "#a68b62"}"/>`,
  ).join("");
  const fibers = `<g fill="none" stroke="#855333" stroke-width="2">${fiberPaths}</g>`;
  const panel =
    '<path d="m120 95 120-44 66 39-118 45Z" fill="#b49b73" stroke="#855333"/><path d="m120 95 68 40v29l-68-43Z" fill="#a08961"/><path d="m188 135 118-45v29l-118 45Z" fill="#796446"/>';
  const drops =
    '<g stroke="#68695e" fill="none"><path d="m145 36-8 17m46-17-8 17m46-17-8 17m46-17-8 17m46-17-8 17"/><path d="M112 62h201" stroke-dasharray="2 7"/></g>';
  const heat =
    '<g fill="none" stroke="#855333" stroke-width="1.5"><path d="M156 184q-9-10 0-20t0-20M211 184q-9-10 0-20t0-20M267 184q-9-10 0-20t0-20"/></g>';
  const pore = Array.from(
    { length: 28 },
    (_, i) =>
      `<circle cx="${133 + ((i * 41) % 150)}" cy="${58 + ((i * 29) % 110)}" r="${3 + (i % 4) * 2}" fill="#eeede6" stroke="#818475"/>`,
  ).join("");
  const drawings = {
    collect:
      type === "energy"
        ? smalls
        : shell +
          '<path d="M124 91q75 67 173 0M132 96q64 86 155 7M141 111q60 70 133 7" fill="none" stroke="#c4aa7e"/>',
    clean:
      (type === "energy" ? smalls : shell) +
      drops +
      '<path d="M100 176h220" stroke="#68695e"/>',
    fiber: fibers,
    dry:
      fibers +
      '<path d="M80 51q30-15 60 0M260 32q30-15 60 0M90 185q30-15 60 0" fill="none" stroke="#68695e" stroke-dasharray="5 5"/>',
    treat:
      '<path d="M95 70v110h230V70" fill="#d7d8ab" stroke="#262923"/>' +
      fibers +
      '<path d="M96 85q30-10 60 0t60 0t60 0t49 0" fill="none" stroke="#68695e"/>',
    cut:
      smalls +
      '<path d="m205 35 25 9-8 52-23-8Z" fill="#68695e"/><path d="m213 98-6 26" stroke="#262923" stroke-dasharray="3 3"/>',
    mix:
      '<path d="M115 87q8 100 95 100t95-100Z" fill="#d7d8ab" stroke="#262923"/>' +
      smalls +
      '<path d="M207 34v107m-25-13 25 13 25-13" fill="none" stroke="#262923" stroke-width="6"/>',
    mould:
      '<path d="m96 96 147-55 86 49v64l-147 54-86-51Z" fill="none" stroke="#262923" stroke-width="2"/>' +
      panel,
    press:
      panel +
      '<path d="M97 46h227v19H97z" fill="#262923"/><path d="M210 15v25m-8-7 8 8 8-8M210 210v-31m-8 7 8-8 8 8" fill="none" stroke="#262923" stroke-width="2"/>',
    cure: panel + heat,
    finish:
      panel +
      '<path d="m120 71 120-44 66 39-118 45Z" fill="#d7d8ab" stroke="#68695e" stroke-dasharray="3 3"/><path d="M100 46v93M324 40v90" fill="none" stroke="#68695e"/>',
    furnace:
      '<path d="M111 47h200v131H111z" fill="none" stroke="#262923" stroke-width="2"/><path d="M126 61h170v69H126z" fill="#45483d"/>' +
      heat +
      '<path d="M165 21v20m45-20v20m45-20v20" stroke="#855333"/>',
    sieve:
      smalls +
      '<path d="M105 110h210M105 115h210" stroke="#262923"/><path d="M105 116l50 53h112l48-53" fill="none" stroke="#68695e"/><path d="M146 110v7m25-7v7m25-7v7m25-7v7m25-7v7m25-7v7" stroke="#eeede6" stroke-width="4"/>',
    activate:
      '<path d="M159 30v39l-55 103q-8 18 14 18h184q22 0 14-18L261 69V30" fill="#d7d8ab" stroke="#262923" stroke-width="2"/><path d="M145 30h130M134 129h152" stroke="#262923"/>' +
      pore,
    pores: '<path d="M113 44h194v145H113z" fill="#45483d"/>' + pore,
    electrode:
      '<path d="m104 100 147-54 74 41-147 54Z" fill="#45483d"/><path d="m104 114 147-54 74 41-147 54Z" fill="none" stroke="#855333" stroke-width="3"/><path d="m104 128 147-54 74 41-147 54Z" fill="none" stroke="#68695e" stroke-width="2"/>',
    assemble:
      '<path d="M114 60h42v118h-42zM183 60h42v118h-42zM252 60h42v118h-42z" fill="#45483d"/><path d="M170 50v137M239 50v137" stroke="#b49b73" stroke-width="5" stroke-dasharray="3 3"/><path d="M133 60V30h140v30" fill="none" stroke="#262923"/><text x="125" y="207" font-size="16" fill="#262923">+</text><text x="266" y="207" font-size="16" fill="#262923">−</text>',
    test:
      '<path d="M100 36h220v148H100z" fill="none" stroke="#262923" stroke-width="2"/><path d="M122 152h176M122 58v94" stroke="#68695e"/>' +
      (type === "acoustics"
        ? '<path d="M132 107q12-62 25 0t25 0t25 0t25 0t25 0t25 0" fill="none" stroke="#855333" stroke-width="2"/>'
        : '<path d="m135 134 35-58 35 58 35-58 35 58" fill="none" stroke="#855333" stroke-width="2"/>') +
      '<path d="M165 202h90M210 184v18" stroke="#262923"/>',
  };
  return `<svg viewBox="0 0 420 225" xmlns="http://www.w3.org/2000/svg">${common}<g>${drawings[kind] || fibers}</g><text x="385" y="24" text-anchor="end" fill="#68695e" font-size="9" font-family="monospace">${String(index + 1).padStart(2, "0")} / SCHEMATIC</text></svg>`;
}
export function setupResearch(type, root) {
  const data = research[type];
  if (!data) return () => {};
  const console = root.querySelector("[data-process]");
  let stage = 0;
  const tabs = [...console.querySelectorAll("[data-step]")];
  function choose(i, animate = true) {
    stage = i;
    tabs.forEach((tab, n) => {
      tab.setAttribute("aria-selected", String(n === i));
      tab.tabIndex = n === i ? 0 : -1;
    });
    const [title, desc, kind] = data.stages[i];
    console.querySelector("#step-count").textContent =
      `${String(i + 1).padStart(2, "0")} / ${data.stages.length}`;
    console.querySelector(".process-text h3").textContent = title;
    console.querySelector(".process-text p").textContent = desc;
    console.querySelector(".process-illustration").innerHTML = illustration(
      kind,
      i,
      type,
    );
    console
      .querySelector("[role=tabpanel]")
      .setAttribute("aria-labelledby", `step-${i}`);
    console.querySelector("[data-prev]").disabled = i === 0;
    console.querySelector("[data-next]").disabled =
      i === data.stages.length - 1;
    console
      .querySelectorAll(".process-progress span")
      .forEach((s, n) => s.classList.toggle("passed", n <= i));
    if (animate) {
      const pic = console.querySelector(".process-illustration");
      pic.classList.remove("stamped");
      void pic.offsetWidth;
      pic.classList.add("stamped");
    }
    if (innerWidth <= 760)
      tabs[i].parentElement.scrollTo({
        left: tabs[i].offsetLeft - tabs[0].offsetLeft - 12,
        behavior: "smooth",
      });
  }
  tabs.forEach((tab, i) => tab.addEventListener("click", () => choose(i)));
  console.querySelector("[data-prev]").onclick = () =>
    choose(Math.max(0, stage - 1));
  console.querySelector("[data-next]").onclick = () =>
    choose(Math.min(data.stages.length - 1, stage + 1));
  function keyboard(list, select) {
    list.forEach((tab, i) =>
      tab.addEventListener("keydown", (e) => {
        let next = i;
        if (["ArrowDown", "ArrowRight"].includes(e.key))
          next = (i + 1) % list.length;
        else if (["ArrowUp", "ArrowLeft"].includes(e.key))
          next = (i - 1 + list.length) % list.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = list.length - 1;
        else return;
        e.preventDefault();
        select(next);
        list[next].focus({ preventScroll: true });
      }),
    );
  }
  keyboard(tabs, choose);
  choose(0, false);
  const metricTabs = [...root.querySelectorAll("[data-metric]")];
  function metric(i) {
    const [name, title, desc, axis] = data.metrics[i];
    metricTabs.forEach((b, n) => {
      b.setAttribute("aria-selected", String(n === i));
      b.tabIndex = n === i ? 0 : -1;
    });
    root
      .querySelector("#metric-panel")
      .setAttribute("aria-labelledby", `metric-${i}`);
    root.querySelector("#chart-metric").textContent = name.toUpperCase();
    root.querySelector("#chart-axis").textContent = axis;
    root.querySelector(".metric-description h3").textContent = title;
    root.querySelector(".metric-description p").textContent = desc;
  }
  metricTabs.forEach((b, i) => (b.onclick = () => metric(i)));
  keyboard(metricTabs, metric);
  metric(0);
  const media = matchMedia("(max-width:760px)");
  const orientation = () =>
    console
      .querySelector("[role=tablist]")
      .setAttribute(
        "aria-orientation",
        media.matches ? "horizontal" : "vertical",
      );
  media.addEventListener("change", orientation);
  orientation();
  const stopSimulation = setupSimulation(
    root.querySelector("[data-simulation]"),
    type,
  );
  return () => {
    stopSimulation();
    media.removeEventListener("change", orientation);
  };
}

function setupSimulation(root, type) {
  const canvas = root.querySelector("canvas"),
    c = canvas.getContext("2d"),
    structure = root.querySelector("#structure"),
    excitation = root.querySelector("#excitation"),
    button = root.querySelector("[data-motion]");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduce.matches,
    visible = false,
    frame = 0,
    t = 0,
    last = 0,
    w = 1,
    h = 1;
  let background = document.createElement("canvas");
  const a = type === "acoustics";
  function base() {
    const d = Math.min(devicePixelRatio || 1, 2);
    const b = canvas.getBoundingClientRect();
    w = b.width;
    h = b.height;
    canvas.width = Math.round(w * d);
    canvas.height = Math.round(h * d);
    c.setTransform(d, 0, 0, d, 0, 0);
    background.width = canvas.width;
    background.height = canvas.height;
    const g = background.getContext("2d");
    g.scale(d, d);
    const r = random(44);
    g.fillStyle = "#30342b";
    g.fillRect(w * 0.38, 28, w * 0.33, h - 80);
    g.strokeStyle = "#686d50";
    g.lineWidth = 0.5;
    g.strokeRect(w * 0.38, 28, w * 0.33, h - 80);
    if (a) {
      for (let i = 0; i < 90 + Number(structure.value) * 1.5; i++) {
        const x = w * (0.39 + r() * 0.3),
          y = 35 + r() * (h - 99);
        g.strokeStyle = r() > 0.5 ? "#a59c7470" : "#d7d8ab55";
        g.lineWidth = 0.5 + r();
        g.beginPath();
        g.moveTo(x, y);
        g.quadraticCurveTo(x + 10, y - 14, x + 3 + r() * 24, y + 6 + r() * 16);
        g.stroke();
      }
    } else {
      g.fillStyle = "#c6c7a1";
      g.beginPath();
      g.moveTo(w * 0.71, 28);
      for (let y = 28; y <= h - 52; y += 2) {
        const edge =
          w *
          (0.51 -
            (0.035 + (0.095 * Number(structure.value)) / 100) *
              (0.5 + 0.5 * Math.sin(((y - 28) / (h - 80)) * Math.PI * 6)));
        g.lineTo(edge, y);
      }
      g.lineTo(w * 0.71, h - 52);
      g.closePath();
      g.fill();
      g.strokeStyle = "#93987a";
      for (let i = 0; i < 50; i++) {
        g.beginPath();
        g.arc(w * (0.55 + r() * 0.13), 40 + r() * (h - 105), 2 + r() * 4, 0, 7);
        g.stroke();
      }
      g.fillStyle = "#262923";
      g.font = "13px monospace";
      for (let y = 50; y < h - 70; y += 35) g.fillText("−", w * 0.65, y);
    }
  }
  function draw(time = 0) {
    c.clearRect(0, 0, w, h);
    c.drawImage(background, 0, 0, w, h);
    const value = Number(structure.value) / 100,
      ex = Number(excitation.value) / 100;
    if (a) {
      for (let line = 0; line < 5; line++) {
        c.beginPath();
        const center = 55 + (line * (h - 122)) / 4;
        for (let x = 16; x < w - 16; x += 3) {
          const pos = x / w;
          const through = Math.max(0, Math.min(1, (pos - 0.38) / 0.33));
          const absorption = 0.25 + Math.sin(value * Math.PI) * 0.42;
          const amp = (11 + ex * 7) * (1 - through * absorption);
          const y =
            center +
            Math.sin(x / (18 - ex * 10) - time * 2.3 + line * 0.65) * amp;
          x === 16 ? c.moveTo(x, y) : c.lineTo(x, y);
        }
        c.strokeStyle = line % 2 ? "#bca386" : "#d7d8ab";
        c.lineWidth = 1.4;
        c.stroke();
      }
    } else {
      const r = random(63);
      for (let i = 0; i < 55; i++) {
        const seedX = r(),
          seedY = r(),
          negative = i % 3 === 0;
        const y =
          45 + seedY * (h - 115) + Math.sin(time * 0.8 + i) * 5 * (1 - ex);
        const freeX = 20 + seedX * w * 0.3 + Math.sin(time * 0.6 + i) * 5;
        const edge =
          w *
          (0.51 -
            (0.035 + 0.095 * value) *
              (0.5 + 0.5 * Math.sin(((y - 28) / (h - 80)) * Math.PI * 6)));
        const targetX = negative
          ? w * (0.08 + seedX * 0.11)
          : edge - 9 - seedX * 10;
        const x = freeX + (targetX - freeX) * ex;
        c.fillStyle = negative ? "#bb9573" : "#d7d8ab";
        c.beginPath();
        c.arc(x, y, 3.4, 0, 7);
        c.fill();
        c.fillStyle = "#262923";
        c.font = "8px monospace";
        c.textAlign = "center";
        c.fillText(negative ? "−" : "+", x, y + 2.8);
      }
    }
  }
  function tick(now) {
    if (paused || !visible) {
      frame = 0;
      return;
    }
    if (last) t += Math.min(now - last, 40) / 1000;
    last = now;
    draw(t);
    frame = requestAnimationFrame(tick);
  }
  function play() {
    cancelAnimationFrame(frame);
    last = 0;
    if (!paused && visible) frame = requestAnimationFrame(tick);
    else draw(t);
    button.textContent = paused ? "Play motion ▷" : "Pause motion Ⅱ";
    button.setAttribute("aria-pressed", String(paused));
  }
  function controls() {
    const sv = Number(structure.value),
      ev = Number(excitation.value);
    const st = a
      ? sv < 34
        ? "OPEN"
        : sv > 66
          ? "COMPACT"
          : "BALANCED"
      : sv < 34
        ? "LIMITED"
        : sv > 66
          ? "MORE OPEN"
          : "PARTIAL";
    const ex = ev < 34 ? "LOW" : ev > 66 ? "HIGH" : "MID";
    root.querySelector("#structure-value").value = st;
    root.querySelector("#excitation-value").value = ex;
    structure.setAttribute("aria-valuetext", st);
    excitation.setAttribute("aria-valuetext", ex);
    base();
    draw(t);
  }
  structure.addEventListener("input", controls);
  excitation.addEventListener("input", controls);
  button.onclick = () => {
    paused = !paused;
    play();
  };
  const reduceChange = () => {
    paused = reduce.matches;
    play();
  };
  reduce.addEventListener("change", reduceChange);
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      play();
    },
    { threshold: 0.08 },
  );
  observer.observe(canvas);
  const resize = new ResizeObserver(() => {
    base();
    draw(t);
  });
  resize.observe(canvas);
  base();
  draw();
  play();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    resize.disconnect();
    reduce.removeEventListener("change", reduceChange);
  };
}
