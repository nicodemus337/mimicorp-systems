export const nodes = [
  {
    id: "mimicorp",
    label: "mimicorp",
    kind: "core",
    orbit: "Core / heartbeat",
    status: "active",
    route: "/",
    summary: "The living center of the system.",
    detail:
      "This node keeps the field legible as one organism. It binds branches, stems, fruit, and notes into a single changing surface.",
    x: 0.5,
    y: 0.5,
    connections: ["second_cutting", "ag_lab", "joynet"]
  },
  {
    id: "second_cutting",
    label: "second cutting",
    kind: "branch",
    orbit: "Branch / capital narrative",
    status: "listening",
    route: "/nodes/second-cutting/",
    summary: "Stories, funding logic, and field evidence move together.",
    detail: "This branch turns working landscapes into investable narrative without flattening the land.",
    x: 0.27,
    y: 0.27,
    connections: ["mimicorp", "glc", "media", "data"]
  },
  {
    id: "ag_lab",
    label: "ag lab",
    kind: "branch",
    orbit: "Branch / proof system",
    status: "recording",
    route: "/nodes/ag-lab/",
    summary: "Experiment, record, compare, return with evidence.",
    detail: "A branch for proof, archives, and ecological observation that can shape actual build decisions.",
    x: 0.74,
    y: 0.31,
    connections: ["mimicorp", "gp", "shady_pines", "design", "data"]
  },
  {
    id: "joynet",
    label: "joynet",
    kind: "branch",
    orbit: "Branch / public signal",
    status: "broadcasting",
    route: "/nodes/joynet/",
    summary: "Trust, signal, and shared cultural surface.",
    detail: "This branch makes values public without turning the system into marketing language.",
    x: 0.63,
    y: 0.74,
    connections: ["mimicorp", "tlo", "design", "media"]
  },
  {
    id: "glc",
    label: "glc",
    kind: "stem",
    orbit: "Stem / operating ground",
    status: "grounded",
    route: "https://glcranch.com",
    summary: "Real constraints. Real timing. Real proof.",
    detail: "The ranch keeps the system accountable to weather, labor, and operational reality.",
    x: 0.18,
    y: 0.47,
    connections: ["second_cutting", "media", "data"]
  },
  {
    id: "tlo",
    label: "tlo",
    kind: "stem",
    orbit: "Stem / access system",
    status: "guiding",
    route: "https://www.techelakeoutfitters.com",
    summary: "A route into place through guided movement.",
    detail: "Direct encounter changes how partners relate to land-based systems.",
    x: 0.82,
    y: 0.57,
    connections: ["joynet", "media", "design"]
  },
  {
    id: "gp",
    label: "gp",
    kind: "stem",
    orbit: "Stem / utility system",
    status: "routing",
    route: "http://www.gpsupplyandlumber.com",
    summary: "Rural infrastructure without ornament.",
    detail: "Materials, logistics, and practical demand keep the system buildable.",
    x: 0.39,
    y: 0.82,
    connections: ["ag_lab", "design"]
  },
  {
    id: "shady_pines",
    label: "shady pines",
    kind: "stem",
    orbit: "Stem / test site",
    status: "testing",
    route: "https://example.com/shady-pines",
    summary: "A site for testing and field iteration.",
    detail: "This stem gives new infrastructure concepts texture before scale.",
    x: 0.85,
    y: 0.18,
    connections: ["ag_lab", "data", "media"]
  },
  {
    id: "design",
    label: "design",
    kind: "fruit",
    orbit: "Fruit / partner-facing output",
    status: "forming",
    route: "/nodes/design/",
    summary: "Form, clarity, and transmission.",
    detail: "Design packages the system into interfaces, decks, and decision surfaces.",
    x: 0.56,
    y: 0.13,
    connections: ["ag_lab", "joynet", "tlo", "gp"]
  },
  {
    id: "media",
    label: "media",
    kind: "fruit",
    orbit: "Fruit / attention output",
    status: "singing",
    route: "/nodes/media/",
    summary: "Sound, image, sequence, release.",
    detail: "Media makes the system legible without turning it into a startup landing page.",
    x: 0.11,
    y: 0.68,
    connections: ["second_cutting", "joynet", "glc", "tlo", "shady_pines"]
  },
  {
    id: "data",
    label: "data",
    kind: "fruit",
    orbit: "Fruit / evidence output",
    status: "compounding",
    route: "/nodes/data/",
    summary: "Memory that can be queried and revised.",
    detail: "Evidence loops back into the next cycle of financing, design, and stewardship.",
    x: 0.91,
    y: 0.42,
    connections: ["second_cutting", "ag_lab", "glc", "shady_pines"]
  }
];

export const edges = nodes.flatMap((node) =>
  node.connections
    .filter((targetId) => node.id < targetId)
    .map((targetId) => ({ source: node.id, target: targetId }))
);

export const kindColor = {
  core: "#edf4e7",
  branch: "#9bc886",
  stem: "#699969",
  fruit: "#d6b96a"
};
