// Texture layers are cached once per resize. Dragging only updates compositor transforms.
export function setupSpecimen(root) {
  const player = root.querySelector(".specimen-player");
  if (!player) return { paint() {}, cleanup() {} };
  const source = player.querySelector("[data-material]");
  const layers = ["husk", "shell"].map((name) => {
    const canvas = document.createElement("canvas");
    canvas.className = `specimen-layer layer-${name}`;
    canvas.setAttribute("aria-hidden", "true");
    player.append(canvas);
    return canvas;
  });
  let angle = 0,
    separated = false,
    down = false,
    startX = 0,
    startAngle = 0;
  let enterFrame = 0;
  const control = root.querySelector("[data-separate]");
  const reset = root.querySelector("[data-reset-specimen]");
  const syncReset = () => {
    reset.disabled = angle === 0 && !separated && !player.dataset.focus;
  };
  const rotate = (value) => {
    angle = Math.max(-180, Math.min(180, value));
    player.style.setProperty("--rotation", `${angle}deg`);
    player.setAttribute("aria-valuenow", String(Math.round(angle)));
    player.setAttribute("aria-valuetext", `${Math.round(angle)} degrees`);
    syncReset();
  };
  const separate = (value) => {
    separated = value;
    player.classList.toggle("separated", value);
    control.setAttribute("aria-pressed", String(value));
    control.textContent = value
      ? "Bring layers together ↙"
      : "Separate the layers ↗";
    syncReset();
  };
  control.onclick = () => {
    separate(!separated);
    player.dataset.focus = "";
    syncReset();
    root.querySelectorAll("[data-specimen]").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
  };
  root.querySelector("[data-reset-specimen]").onclick = () => {
    rotate(0);
    separate(false);
    player.dataset.focus = "";
    syncReset();
    root.querySelectorAll("[data-specimen]").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    root.querySelector(".specimen-hint").textContent =
      "DRAG THE SPECIMEN. SELECT A LAYER. TAKE IT APART.";
  };
  root.querySelectorAll("[data-specimen]").forEach((button) =>
    button.addEventListener("click", () => {
      separate(true);
      player.dataset.focus = button.dataset.specimen;
    }),
  );
  player.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    down = true;
    startX = e.clientX;
    startAngle = angle;
    player.setPointerCapture(e.pointerId);
    player.classList.add("dragging");
  });
  player.addEventListener("pointermove", (e) => {
    if (down) rotate(startAngle + (e.clientX - startX) * 0.6);
  });
  const release = () => {
    down = false;
    player.classList.remove("dragging");
  };
  player.addEventListener("pointerup", release);
  player.addEventListener("pointercancel", release);
  player.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      rotate(angle + (e.key === "ArrowRight" ? 10 : -10));
    } else if (e.key === "Home") {
      e.preventDefault();
      rotate(0);
    }
  });
  function paint() {
    const width = source.clientWidth,
      height = source.clientHeight,
      dpr = source.width / width,
      s = Math.min(width / 530, height / 480);
    if (!width || !source.width) return;
    layers.forEach((canvas, i) => {
      canvas.width = source.width;
      canvas.height = source.height;
      const c = canvas.getContext("2d");
      c.save();
      c.scale(dpr, dpr);
      c.translate(width / 2, height / 2);
      c.scale(s, s);
      c.rotate(-0.27);
      c.scale(0.97, 1.04);
      c.beginPath();
      c.arc(0, 0, i === 0 ? 230 : 150, 0, Math.PI * 2);
      c.arc(0, 0, i === 0 ? 150 : 115, 0, Math.PI * 2, true);
      c.clip();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.drawImage(source, 0, 0);
      c.restore();
    });
    if (!player.classList.contains("ready"))
      enterFrame = requestAnimationFrame(() => {
        enterFrame = requestAnimationFrame(() => player.classList.add("ready"));
      });
  }
  return {
    paint,
    cleanup() {
      cancelAnimationFrame(enterFrame);
    },
  };
}
