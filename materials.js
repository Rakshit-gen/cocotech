import { setupSpecimen } from "./specimen-player.js";
// Procedural scientific illustrations. These are schematic material studies, not micrographs.
export function random(seed = 17) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}
export function drawMaterial(canvas, mode = "ring", highlight = "both") {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const c = canvas.getContext("2d");
  c.scale(dpr, dpr);
  const w = rect.width,
    h = rect.height;
  c.translate(w / 2, h / 2);
  const s = Math.min(w / 530, h / 480);
  c.scale(s, s);
  const r = random(mode === "carbon" ? 34 : 71);
  c.save();
  c.scale(1, 0.26);
  const shadow = c.createRadialGradient(0, 670, 5, 0, 670, 205);
  shadow.addColorStop(0, "#29291c30");
  shadow.addColorStop(1, "#29291c00");
  c.fillStyle = shadow;
  c.fillRect(-230, 460, 460, 440);
  c.restore();
  if (mode === "ring") {
    c.rotate(-0.27);
    c.scale(0.97, 1.04);
    // A crescent-shaped cutaway separates husk, shell and the empty inner cavity.
    const start = -0.71,
      end = 5.16;
    function arcBand(inner, outer, fill) {
      c.beginPath();
      c.arc(0, 0, outer, start, end);
      c.arc(0, 0, inner, end, start, true);
      c.closePath();
      c.fillStyle = fill;
      c.fill();
    }
    arcBand(146, 206, "#917351");
    arcBand(122, 149, "#35342c");
    for (let i = 0; i < 14000; i++) {
      const angle = start + r() * (end - start),
        radius = 150 + r() * 55,
        length = 1 + r() * 15;
      const lighting = (Math.cos(angle + 1.7) + 1) / 2;
      const tone = Math.round(76 + r() * 80 + lighting * 53);
      c.strokeStyle = `rgba(${tone + 25},${tone + 7},${Math.max(20, tone - 27)},${0.25 + r() * 0.65})`;
      c.lineWidth = 0.25 + r() * 1.1;
      c.beginPath();
      c.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      c.quadraticCurveTo(
        Math.cos(angle + 0.02) * (radius + length * 0.5),
        Math.sin(angle + 0.02) * (radius + length * 0.5),
        Math.cos(angle + 0.01 + r() * 0.03) * (radius + length),
        Math.sin(angle + 0.01 + r() * 0.03) * (radius + length),
      );
      c.stroke();
    }
    for (let i = 0; i < 4700; i++) {
      const a = start + r() * (end - start),
        radius = 123 + r() * 24,
        light = r() * 45;
      c.fillStyle = `rgba(${85 + light},${77 + light},${60 + light},${r() * 0.8})`;
      c.beginPath();
      c.ellipse(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        0.25 + r() * 1.2,
        0.3 + r() * 2,
        a,
        0,
        Math.PI * 2,
      );
      c.fill();
    }
    for (const a of [start, end]) {
      c.beginPath();
      c.moveTo(Math.cos(a) * 121, Math.sin(a) * 121);
      c.lineTo(Math.cos(a) * 207, Math.sin(a) * 207);
      c.strokeStyle = "#ccb28b";
      c.lineWidth = 3;
      c.stroke();
    }
    c.beginPath();
    c.arc(0, 0, 120, start, end);
    c.strokeStyle = "#a2987c";
    c.lineWidth = 1;
    c.stroke();
    if (highlight !== "both") {
      c.beginPath();
      c.arc(0, 0, highlight === "husk" ? 211 : 119, start, end);
      c.strokeStyle = "#855333";
      c.lineWidth = 2;
      c.setLineDash([3, 5]);
      c.stroke();
      c.setLineDash([]);
    }
    c.rotate(0.27);
    c.font = "10px Plex";
    c.fillStyle = "#68695e";
    c.textAlign = "center";
    if (!canvas.dataset.interactive) c.fillText("COCOS NUCIFERA", 0, -5);
    c.font = "8px Plex";
    if (!canvas.dataset.interactive)
      c.fillText("CROSS-SECTION / SCHEMATIC", 0, 14);
  } else if (mode === "panel") {
    c.translate(0, -10);
    const top = [
        [-190, -48],
        [64, -145],
        [201, -53],
        [-53, 49],
      ],
      front = [
        [-190, -48],
        [-53, 49],
        [-53, 112],
        [-190, 15],
      ],
      side = [
        [-53, 49],
        [201, -53],
        [201, 10],
        [-53, 112],
      ];
    const polygon = (pts, fill) => {
      c.beginPath();
      pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.closePath();
      c.fillStyle = fill;
      c.fill();
    };
    polygon(front, "#8c7554");
    polygon(side, "#6c593d");
    polygon(top, "#b49b73");
    for (const [points, count, base] of [
      [top, 10000, 130],
      [front, 2200, 90],
      [side, 2900, 72],
    ]) {
      c.save();
      polygon(points, "rgba(0,0,0,0)");
      c.clip();
      for (let i = 0; i < count; i++) {
        const x = -195 + r() * 405,
          y = -150 + r() * 265,
          t = base + r() * 80;
        c.strokeStyle = `rgba(${t + 22},${t + 5},${t - 29},${0.2 + r() * 0.65})`;
        c.lineWidth = 0.25 + r() * 0.6;
        c.beginPath();
        c.moveTo(x, y);
        c.quadraticCurveTo(x + 3, y + 2, x + 3 + r() * 12, y - 4 + r() * 12);
        c.stroke();
      }
      c.restore();
    }
    c.strokeStyle = "#26292360";
    c.lineWidth = 0.65;
    c.setLineDash([3, 4]);
    c.beginPath();
    c.moveTo(-201, 28);
    c.lineTo(-64, 124);
    c.lineTo(211, 20);
    c.stroke();
    c.setLineDash([]);
  } else if (mode === "carbon") {
    c.rotate(-0.18);
    c.scale(1, 0.89);
    const pts = [
      [-176, -87],
      [-102, -161],
      [50, -166],
      [151, -105],
      [191, 22],
      [120, 146],
      [-53, 172],
      [-174, 93],
      [-199, -5],
    ];
    c.beginPath();
    pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    c.closePath();
    const shade = c.createLinearGradient(-140, -140, 140, 150);
    shade.addColorStop(0, "#626158");
    shade.addColorStop(0.45, "#363730");
    shade.addColorStop(1, "#20231e");
    c.fillStyle = shade;
    c.fill();
    c.save();
    c.clip();
    for (let i = 0; i < 2000; i++) {
      const x = -210 + r() * 430,
        y = -190 + r() * 400,
        rad = 1 + r() * 6;
      c.beginPath();
      c.ellipse(x, y, rad, rad * (0.5 + r()), r() * 3, 0, Math.PI * 2);
      c.fillStyle = r() > 0.55 ? "#11170f" : "#858577";
      c.globalAlpha = 0.2 + r() * 0.35;
      c.fill();
      c.strokeStyle = "#b0ad92";
      c.lineWidth = 0.4;
      c.stroke();
    }
    c.globalAlpha = 1;
    for (let i = 0; i < 17000; i++) {
      const x = -210 + r() * 430,
        y = -190 + r() * 400;
      c.fillStyle = r() > 0.5 ? "#c4c1ad30" : "#0c130c40";
      c.fillRect(x, y, r() * 1.8, r() * 1.5);
    }
    c.restore();
  }
}

export function setupMaterials(root) {
  const canvases = [...root.querySelectorAll("[data-material]")];
  const specimen = setupSpecimen(root);
  let frame = 0;
  const draw = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      canvases.forEach((c) =>
        drawMaterial(c, c.dataset.material, c.dataset.highlight),
      );
      specimen.paint();
    });
  };
  draw();
  const observer = new ResizeObserver(draw);
  canvases.forEach((c) => observer.observe(c));
  root.querySelectorAll("[data-specimen]").forEach((button) =>
    button.addEventListener("click", () => {
      root.querySelectorAll("[data-specimen]").forEach((b) => {
        b.classList.toggle("active", b === button);
        b.setAttribute("aria-pressed", String(b === button));
      });
      const canvas = root.querySelector("[data-material=ring]");
      root.querySelector(".specimen-hint").textContent =
        button.dataset.specimen === "husk"
          ? "HUSK → Coir fibers for acoustic absorption."
          : "SHELL → Activated carbon for electrode research.";
    }),
  );
  return () => {
    specimen.cleanup();
    observer.disconnect();
    cancelAnimationFrame(frame);
  };
}
