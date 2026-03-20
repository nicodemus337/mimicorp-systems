import { edges, kindColor } from "./system-config.js";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function createPulseSystem({ canvas, shell, nodes, onFrame }) {
  const context = canvas.getContext("2d");
  const pointer = { x: 0, y: 0, active: false };
  let rafId = 0;
  let pulse = 0;
  let pulseTarget = 0;
  let pulseTimer = 0;

  function resize() {
    const rect = shell.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function schedulePulse() {
    const delay = 3000 + Math.random() * 3000;
    pulseTimer = window.setTimeout(() => {
      pulseTarget = 1;
      schedulePulse();
    }, delay);
  }

  function updateNodes(width, height, time) {
    for (const node of nodes) {
      const driftX =
        Math.cos(time * 1.4 + node.baseX * 12 + node.baseY * 5) * 0.009 +
        Math.sin(time * 0.7 + node.baseY * 11) * 0.006;
      const driftY =
        Math.sin(time * 1.1 + node.baseX * 9 + node.baseY * 7) * 0.012 +
        Math.cos(time * 0.8 + node.baseX * 6) * 0.005;

      let forceX = node.baseX + driftX - node.x;
      let forceY = node.baseY + driftY - node.y;

      if (pointer.active) {
        const px = pointer.x - node.x * width;
        const py = pointer.y - node.y * height;
        const distance = Math.hypot(px, py);
        const radius = node.kind === "core" ? 180 : 130;

        if (distance < radius) {
          const repel = (1 - distance / radius) * 0.003;
          forceX -= (px / Math.max(distance, 1)) * repel;
          forceY -= (py / Math.max(distance, 1)) * repel;
        }
      }

      node.influence *= 0.974;
      node.vx = (node.vx + forceX * 0.028) * 0.92;
      node.vy = (node.vy + forceY * 0.028) * 0.92;
      node.x = clamp(node.x + node.vx, 0.08, 0.92);
      node.y = clamp(node.y + node.vy, 0.08, 0.92);
      node.radius = node.size + pulse * (node.kind === "core" ? 7 : 4) + node.influence * 7;
    }
  }

  function draw(width, height) {
    context.clearRect(0, 0, width, height);

    for (const edge of edges) {
      const source = nodes.find((node) => node.id === edge.source);
      const target = nodes.find((node) => node.id === edge.target);
      const active = source.active || target.active || source.hovered || target.hovered;
      const influence = Math.max(source.influence, target.influence);

      context.strokeStyle = `rgba(184, 212, 164, ${0.08 + pulse * 0.18 + influence * 0.1 + (active ? 0.12 : 0)})`;
      context.lineWidth = 0.8 + pulse * 0.9 + influence * 0.5;
      context.beginPath();
      context.moveTo(source.x * width, source.y * height);
      context.bezierCurveTo(
        source.x * width + (target.x - source.x) * width * 0.24,
        source.y * height - height * 0.04,
        target.x * width - (target.x - source.x) * width * 0.24,
        target.y * height + height * 0.04,
        target.x * width,
        target.y * height
      );
      context.stroke();
    }

    for (const node of nodes) {
      const x = node.x * width;
      const y = node.y * height;
      const aura = node.radius * 2.6;
      const gradient = context.createRadialGradient(x, y, 0, x, y, aura);

      gradient.addColorStop(0, `${kindColor[node.kind]}66`);
      gradient.addColorStop(0.38, `${kindColor[node.kind]}18`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, aura, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = kindColor[node.kind];
      context.beginPath();
      context.arc(x, y, node.radius * 0.26, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = `rgba(234, 241, 229, ${0.18 + pulse * 0.4})`;
      context.lineWidth = 0.8 + pulse * 0.7;
      context.beginPath();
      context.arc(x, y, node.radius * 0.56, 0, Math.PI * 2);
      context.stroke();
    }
  }

  function frame() {
    const rect = shell.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const time = performance.now() * 0.001;

    pulse += (pulseTarget - pulse) * 0.08;
    if (pulse > 0.96) {
      pulseTarget = 0;
    }
    if (pulse < 0.02 && pulseTarget === 0) {
      pulse = 0;
    }

    updateNodes(width, height, time);
    draw(width, height);
    onFrame({ pulse, width, height });
    rafId = window.requestAnimationFrame(frame);
  }

  resize();
  schedulePulse();
  rafId = window.requestAnimationFrame(frame);

  window.addEventListener("resize", resize);
  shell.addEventListener("pointermove", (event) => {
    const rect = shell.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });
  shell.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  return {
    destroy() {
      window.clearTimeout(pulseTimer);
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    }
  };
}
