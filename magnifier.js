import { drawMaterial } from "./materials.js";
export function setupMagnifiers(root) {
  const cleanups = [];
  root.querySelectorAll("[data-inspect-material]").forEach((stage) => {
    const source = stage.querySelector("[data-material]");
    const detail = document.createElement("canvas");
    let detailWidth = 0,
      detailHeight = 0;
    const button = stage.querySelector("[data-inspect]");
    const lens = stage.querySelector(".texture-lens");
    const canvas = lens.querySelector("canvas"),
      c = canvas.getContext("2d");
    const hint = stage.querySelector(".inspect-hint");
    let active = false,
      x = 0.5,
      y = 0.4,
      frame = 0,
      dragging = false;
    const draw = () => {
      frame = 0;
      if (!active || !source.width) return;
      const box = source.getBoundingClientRect(),
        size = lens.offsetWidth;
      if (detailWidth !== box.width || detailHeight !== box.height) {
        drawMaterial(detail, source.dataset.material, "both", {
          bounds: box,
          resolution: 4,
        });
        detailWidth = box.width;
        detailHeight = box.height;
      }
      const px = x * box.width,
        py = y * box.height;
      lens.style.left = `${Math.max(size / 2 + 8, Math.min(box.width - size / 2 - 8, px))}px`;
      lens.style.top = `${Math.max(size / 2 + 36, Math.min(box.height - size / 2 - 65, py))}px`;
      const dpr = Math.min(devicePixelRatio || 1, 2),
        pixelSize = Math.round(size * dpr);
      if (canvas.width !== pixelSize) {
        canvas.width = pixelSize;
        canvas.height = pixelSize;
      }
      c.fillStyle = "#eeede6";
      c.fillRect(0, 0, pixelSize, pixelSize);
      const crop = (size / 2.8) * (detail.width / box.width);
      c.drawImage(
        detail,
        x * detail.width - crop / 2,
        y * detail.height - crop / 2,
        crop,
        crop,
        0,
        0,
        pixelSize,
        pixelSize,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const toggle = (value) => {
      active = value;
      button.setAttribute("aria-pressed", String(value));
      stage.classList.toggle("inspecting", value);
      button.textContent = value ? "Close inspection ×" : "Inspect texture ⊕";
      hint.textContent = value
        ? "Move across the specimen. Arrow keys move the lens."
        : "Enlarged illustration. No microscopic scale implied.";
      lens.hidden = !value;
      if (value) schedule();
    };
    button.onclick = () => toggle(!active);
    stage.addEventListener("pointerdown", (e) => {
      if (!active || e.target.closest("button")) return;
      dragging = true;
      if (e.pointerType !== "mouse") stage.setPointerCapture(e.pointerId);
      move(e);
    });
    function move(e) {
      if (
        !active ||
        e.target.closest("button") ||
        (e.pointerType !== "mouse" && !dragging)
      )
        return;
      const b = source.getBoundingClientRect();
      x = Math.max(0.08, Math.min(0.92, (e.clientX - b.left) / b.width));
      y = Math.max(0.12, Math.min(0.8, (e.clientY - b.top) / b.height));
      schedule();
    }
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", () => (dragging = false));
    stage.addEventListener("pointercancel", () => (dragging = false));
    stage.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toggle(false);
        button.focus();
        return;
      }
      if (
        !active ||
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
      )
        return;
      e.preventDefault();
      x = Math.max(
        0.08,
        Math.min(
          0.92,
          x +
            (e.key === "ArrowRight" ? 0.04 : e.key === "ArrowLeft" ? -0.04 : 0),
        ),
      );
      y = Math.max(
        0.12,
        Math.min(
          0.8,
          y + (e.key === "ArrowDown" ? 0.04 : e.key === "ArrowUp" ? -0.04 : 0),
        ),
      );
      schedule();
    });
    const resize = new ResizeObserver(schedule);
    resize.observe(source);
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    });
  });
  return () => cleanups.forEach((fn) => fn());
}
