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
    orbitLabel: "Home / Overture",
    summary: "The overture. A central score that keeps every movement in relation.",
    detail:
      "The center holds the system for one continuous composition. Branches circle first. Stems and fruit answer from further out.",
    connections: ["second-cutting-vapg", "ag-lab-archive", "joynet-church"]
  },
  {
    id: "second-cutting-vapg",
    label: "Second Cutting + VAPG",
    kind: "branch",
    orbitLabel: "Branch / Primary movement",
    summary: "Stories, funding logic, and field observation move together.",
    detail:
      "This branch stages reversal and overlap: documentary listening, grant structure, and working land in the same frame.",
    connections: ["mimicorp", "glc", "media", "data"]
  },
  {
    id: "ag-lab-archive",
    label: "Ag Lab + Ecological Archive",
    kind: "branch",
    orbitLabel: "Branch / Primary movement",
    summary: "Experiment, record, compare, and return.",
    detail:
      "A branch for patient observation. It links working operations to archive systems so each pass changes what the next pass can see.",
    connections: ["mimicorp", "gp-supply", "shady-pines", "data", "design"]
  },
  {
    id: "joynet-church",
    label: "JoyNet.church",
    kind: "branch",
    orbitLabel: "Branch / Primary movement",
    summary: "A branch for voice, doubt, and public intimacy.",
    detail:
      "This movement shifts perspective quickly. It brings confession, signal, and publication into one lighter register.",
    connections: ["mimicorp", "tlo", "media", "design"]
  },
  {
    id: "glc",
    label: "GLC",
    kind: "stem",
    orbitLabel: "Stem / Operational system",
    summary: "The ranch. Concrete pressure. Real timing.",
    detail:
      "GLC grounds the composition in work that cannot be faked. It gives the system weather, constraint, and proof.",
    connections: ["second-cutting-vapg", "media", "data"]
  },
  {
    id: "tlo",
    label: "TLO",
    kind: "stem",
    orbitLabel: "Stem / Operational system",
    summary: "A route into place through guided movement.",
    detail:
      "TLO extends the score outward. It translates observation into a shared encounter with the landscape.",
    connections: ["joynet-church", "design", "media"]
  },
  {
    id: "gp-supply",
    label: "GP Supply",
    kind: "stem",
    orbitLabel: "Stem / Operational system",
    summary: "Rural infrastructure. Utility without ornament.",
    detail:
      "GP Supply introduces the practical counterpoint. Materials, logistics, and ordinary need reshape the branch around them.",
    connections: ["ag-lab-archive", "design"]
  },
  {
    id: "shady-pines",
    label: "Shady Pines",
    kind: "stem",
    orbitLabel: "Stem / Operational system",
    summary: "A site for testing, retreat, and return.",
    detail:
      "Shady Pines slows the tempo without stopping it. It gives the archive a place to accumulate texture.",
    connections: ["ag-lab-archive", "data", "media"]
  },
  {
    id: "design",
    label: "Design",
    kind: "fruit",
    orbitLabel: "Fruit / Output",
    summary: "Form, clarity, and precise transmission.",
    detail:
      "Design is fruit because it leaves the system carrying structure outward. It is concise but not simple.",
    connections: ["ag-lab-archive", "joynet-church", "tlo", "gp-supply"]
  },
  {
    id: "media",
    label: "Media",
    kind: "fruit",
    orbitLabel: "Fruit / Output",
    summary: "Sound, image, sequence, release.",
    detail:
      "Media captures the overlapping cast. It lets multiple movements remain audible at the same time.",
    connections: ["second-cutting-vapg", "joynet-church", "glc", "tlo", "shady-pines"]
  },
  {
    id: "data",
    label: "Data",
    kind: "fruit",
    orbitLabel: "Fruit / Output",
    summary: "Memory that can be queried, compared, and revised.",
    detail:
      "Data is the fruit that keeps unfolding after release. It carries evidence back into the next cycle of attention.",
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
