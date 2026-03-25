import { createFieldNotesController, loadFieldNotes } from "./field-notes.js";
import { createPulseSystem } from "./pulse-system.js";
import { nodes } from "./system-config.js";

const shell = document.getElementById("system-shell");
const canvas = document.getElementById("pulse-canvas");
const overlay = document.getElementById("node-overlay");
const notesFeed = document.getElementById("field-notes-feed");

const modalOrbit = document.getElementById("modal-orbit");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalSummary = document.getElementById("modal-summary");
const modalDetail = document.getElementById("modal-detail");
const modalLinks = document.getElementById("modal-links");
const modalRoute = document.getElementById("modal-route");
const sortOptions = Array.from(document.querySelectorAll(".sort-option"));
const sortTitle = document.getElementById("sort-title");
const sortSummary = document.getElementById("sort-summary");
const sortNext = document.getElementById("sort-next");
const sortPrimaryLink = document.getElementById("sort-primary-link");
const sortSecondaryLink = document.getElementById("sort-secondary-link");
const switchCards = Array.from(document.querySelectorAll(".switch-card[data-path]"));

const state = {
  activeId: "mimicorp",
  hoveredId: null,
  selectedPath: sortOptions[0]?.dataset.primaryPath ?? null,
  supportingPath: sortOptions[0]?.dataset.secondaryPath ?? null
};

function applySortSelection(option) {
  if (!option || !sortTitle || !sortSummary || !sortNext || !sortPrimaryLink || !sortSecondaryLink) {
    return;
  }

  state.selectedPath = option.dataset.primaryPath ?? null;
  state.supportingPath = option.dataset.secondaryPath ?? null;

  sortOptions.forEach((entry) => {
    entry.classList.toggle("is-selected", entry === option);
  });

  sortTitle.textContent = option.dataset.title ?? "";
  sortSummary.textContent = option.dataset.summary ?? "";
  sortNext.textContent = option.dataset.next ?? "";

  sortPrimaryLink.textContent = option.dataset.primaryLabel ?? "Open path";
  sortPrimaryLink.href = option.dataset.primaryHref ?? "#";
  sortPrimaryLink.target = (option.dataset.primaryHref ?? "").startsWith("http") ? "_blank" : "_self";

  sortSecondaryLink.textContent = option.dataset.secondaryLabel ?? "Next path";
  sortSecondaryLink.href = option.dataset.secondaryHref ?? "#";
  sortSecondaryLink.target = (option.dataset.secondaryHref ?? "").startsWith("http") ? "_blank" : "_self";

  switchCards.forEach((card) => {
    const path = card.dataset.path;
    const isPrimary = path === state.selectedPath;
    const isSupporting = path === state.supportingPath;

    card.classList.toggle("is-recommended", isPrimary);
    card.classList.toggle("is-supporting", isSupporting);
    card.classList.toggle("is-muted", !isPrimary && !isSupporting);
  });
}

const liveNodes = nodes.map((node) => ({
  ...node,
  baseX: node.x,
  baseY: node.y,
  x: node.x,
  y: node.y,
  vx: 0,
  vy: 0,
  size: node.kind === "core" ? 28 : node.kind === "branch" ? 22 : node.kind === "stem" ? 16 : 12,
  radius: 0,
  influence: 0,
  hovered: false,
  active: node.id === "mimicorp"
}));

function getNode(id) {
  return liveNodes.find((node) => node.id === id);
}

function setActive(id) {
  state.activeId = id;

  for (const node of liveNodes) {
    node.active = node.id === id;
  }

  updateModal();
  updateOverlay();
}

function createNodeElement(node) {
  const button = document.createElement("button");
  const relatedIds = new Set([node.id, ...node.connections]);

  button.className = "node-button";
  button.dataset.id = node.id;
  button.dataset.kind = node.kind;
  button.innerHTML = `
    <span class="node-core"></span>
    <span class="node-ring"></span>
    <span class="node-label">
      <strong>${node.label}</strong>
      <em>${node.kind}</em>
    </span>
  `;

  button.addEventListener("pointerenter", () => {
    state.hoveredId = node.id;
    node.hovered = true;
    updateOverlay();
  });

  button.addEventListener("pointerleave", () => {
    state.hoveredId = null;
    node.hovered = false;
    updateOverlay();
  });

  button.addEventListener("click", () => {
    setActive(node.id);
    node.influence = Math.min(node.influence + 1, 2);
  });

  button._relatedIds = relatedIds;
  return button;
}

function updateOverlay() {
  const active = getNode(state.activeId);
  const activeSet = new Set([active.id, ...active.connections]);

  Array.from(overlay.children).forEach((element) => {
    const node = getNode(element.dataset.id);
    const related =
      activeSet.has(node.id) ||
      (state.hoveredId && (node.id === state.hoveredId || node.connections.includes(state.hoveredId)));

    element.classList.toggle("is-active", node.id === state.activeId);
    element.classList.toggle("is-dimmed", !related && node.id !== state.activeId);
  });
}

function updateModal() {
  const node = getNode(state.activeId);

  modalOrbit.textContent = node.orbit;
  modalTitle.textContent = node.label;
  modalStatus.textContent = node.status;
  modalSummary.textContent = node.summary;
  modalDetail.textContent = node.detail;

  modalLinks.innerHTML = "";
  node.connections.forEach((id) => {
    const target = getNode(id);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = target.label;
    button.addEventListener("click", () => setActive(target.id));
    modalLinks.appendChild(button);
  });

  if (node.route) {
    modalRoute.hidden = false;
    modalRoute.href = node.route;
    modalRoute.target = node.route.startsWith("http") ? "_blank" : "_self";
    modalRoute.textContent = node.route.startsWith("http") ? "open external" : "open route";
  } else {
    modalRoute.hidden = true;
  }
}

for (const node of liveNodes) {
  overlay.appendChild(createNodeElement(node));
}

updateModal();
updateOverlay();

sortOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applySortSelection(option);
  });
});

if (sortOptions[0]) {
  applySortSelection(sortOptions[0]);
}

createPulseSystem({
  canvas,
  shell,
  nodes: liveNodes,
  onFrame({ pulse }) {
    document.documentElement.style.setProperty("--noise-opacity", (0.08 + pulse * 0.08).toFixed(2));

    for (const element of overlay.children) {
      const node = getNode(element.dataset.id);
      const scale = 1 + pulse * 0.08 + node.influence * 0.05 + (node.hovered ? 0.08 : 0);
      element.style.left = `${node.x * 100}%`;
      element.style.top = `${node.y * 100}%`;
      element.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
  }
});

loadFieldNotes()
  .then((notes) =>
    createFieldNotesController({
      notes,
      target: notesFeed,
      documentRef: document,
      onEmit(note) {
        const node = getNode(note.nodeId);
        if (node) {
          node.influence = Math.min(node.influence + 1.2, 2.4);
        }
      }
    })
  )
  .catch(() => {
    notesFeed.innerHTML = `
      <article class="note-row">
        <span>field notes / unavailable</span>
        <span>JSON feed missing. The network is still live.</span>
      </article>
    `;
  });
