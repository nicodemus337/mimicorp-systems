export type NodeKind = "core" | "branch" | "stem" | "fruit";

export type SystemNode = {
  id: string;
  label: string;
  kind: NodeKind;
  summary: string;
  orbitLabel: string;
  connections: string[];
  detail: string;
};

export const systemNodes: SystemNode[] = [
  {
    id: "mimicorp",
    label: "mimicorp",
    kind: "core",
    orbitLabel: "Home / Thesis",
    summary:
      "A systems lab that attracts capital and partners to build ecological infrastructure.",
    detail:
      "The center states the thesis plainly: observation, media, operations, and design are assembled here to de-risk projects, align collaborators, and move ecological infrastructure from concept into financed reality.",
    connections: ["second-cutting-vapg", "ag-lab-archive", "joynet-church"]
  },
  {
    id: "second-cutting-vapg",
    label: "Second Cutting + VAPG",
    kind: "branch",
    orbitLabel: "Branch / Capital narrative",
    summary: "Stories, funding logic, and field evidence move together.",
    detail:
      "This branch turns working landscapes into investable narratives. Documentary listening, grant structure, and field observation are kept in one frame so support can convert into durable infrastructure.",
    connections: ["mimicorp", "glc", "media", "data"]
  },
  {
    id: "ag-lab-archive",
    label: "Ag Lab + Ecological Archive",
    kind: "branch",
    orbitLabel: "Branch / Proof system",
    summary: "Experiment, record, compare, and return with evidence.",
    detail:
      "A branch for generating proof. It links field operations to archive systems so ecological change becomes legible to collaborators, operators, and capital partners over time.",
    connections: ["mimicorp", "gp-supply", "shady-pines", "data", "design"]
  },
  {
    id: "joynet-church",
    label: "JoyNet.church",
    kind: "branch",
    orbitLabel: "Branch / Public signal",
    summary: "A branch for trust, public signal, and cultural legitimacy.",
    detail:
      "This movement builds the human register around the system. It turns values, doubt, and public voice into a credible surface that can attract aligned partners instead of passive spectators.",
    connections: ["mimicorp", "tlo", "media", "design"]
  },
  {
    id: "glc",
    label: "GLC",
    kind: "stem",
    orbitLabel: "Stem / Operating ground",
    summary: "The ranch. Real constraints, real sequencing, real proof.",
    detail:
      "GLC grounds the system in conditions that cannot be faked. It supplies weather, labor, constraint, and timing so infrastructure strategy stays accountable to operational reality.",
    connections: ["second-cutting-vapg", "media", "data"]
  },
  {
    id: "tlo",
    label: "TLO",
    kind: "stem",
    orbitLabel: "Stem / Access system",
    summary: "A route into place through guided movement and shared encounter.",
    detail:
      "TLO extends the system outward. It translates ecological observation into guided experience so partners can encounter place directly instead of relating to it only through abstraction.",
    connections: ["joynet-church", "design", "media"]
  },
  {
    id: "gp-supply",
    label: "GP Supply",
    kind: "stem",
    orbitLabel: "Stem / Utility system",
    summary: "Rural infrastructure. Utility without ornament.",
    detail:
      "GP Supply introduces practical necessity. Materials, logistics, and ordinary rural demand keep the lab oriented toward infrastructure that can actually be sourced, installed, and maintained.",
    connections: ["ag-lab-archive", "design"]
  },
  {
    id: "shady-pines",
    label: "Shady Pines",
    kind: "stem",
    orbitLabel: "Stem / Test site",
    summary: "A site for testing, retreat, and field iteration.",
    detail:
      "Shady Pines gives the system a place to test and iterate. It lets ecological infrastructure concepts accumulate texture before they are generalized, funded, or scaled.",
    connections: ["ag-lab-archive", "data", "media"]
  },
  {
    id: "design",
    label: "Design",
    kind: "fruit",
    orbitLabel: "Fruit / Partner-facing output",
    summary: "Form, clarity, and precise transmission.",
    detail:
      "Design is fruit because it packages the thesis for partners. It turns complexity into legible briefs, interfaces, decks, and decision surfaces that help projects secure commitment.",
    connections: ["ag-lab-archive", "joynet-church", "tlo", "gp-supply"]
  },
  {
    id: "media",
    label: "Media",
    kind: "fruit",
    orbitLabel: "Fruit / Attention output",
    summary: "Sound, image, sequence, and release.",
    detail:
      "Media captures the overlapping cast and makes the work visible. It is how projects gain attention, trust, and partner energy without flattening the complexity of the land.",
    connections: ["second-cutting-vapg", "joynet-church", "glc", "tlo", "shady-pines"]
  },
  {
    id: "data",
    label: "Data",
    kind: "fruit",
    orbitLabel: "Fruit / Evidence output",
    summary: "Memory that can be queried, compared, and revised.",
    detail:
      "Data is the fruit that keeps compounding after release. It carries evidence back into the next cycle of financing, design, and stewardship so decisions can be made against records instead of slogans.",
    connections: ["second-cutting-vapg", "ag-lab-archive", "glc", "shady-pines"]
  }
];

export const nodeSizes: Record<NodeKind, number> = {
  core: 140,
  branch: 90,
  stem: 50,
  fruit: 20
};

export const nodesById = Object.fromEntries(
  systemNodes.map((node) => [node.id, node])
) as Record<string, SystemNode>;
