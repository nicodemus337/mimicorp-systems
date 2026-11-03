import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const electionPath = process.env.ALASKA_ELECTION_PATH || "26PRIM";
const sourceUrl = `https://www.elections.alaska.gov/enr/${electionPath}/results/precincts.js`;
const outputPath = path.resolve("elections/data/alaska.json");
let source;
if (process.env.ALASKA_SOURCE_FILE) {
  source = JSON.parse(await readFile(path.resolve(process.env.ALASKA_SOURCE_FILE), "utf8"));
} else {
  const response = await fetch(sourceUrl, { headers: { "user-agent": "Countline/0.1 (+https://mimicorp.systems/elections/)" } });
  if (!response.ok) throw new Error(`Alaska results returned ${response.status} ${response.statusText}`);
  source = await response.json();
}
if (!Array.isArray(source.contestNames) || !Array.isArray(source.candidateNames) || !Array.isArray(source.totals)) {
  throw new Error("Alaska results schema changed: expected contestNames, candidateNames, and totals arrays");
}

const precinctByRace = new Map(source.contestNames.map((_, index) => [index, []]));
for (const precinct of source.precincts || []) {
  const contests = new Map((precinct.contests || []).map(contest => [contest.n, contest]));
  for (const [raceIndex, rows] of precinctByRace) {
    const contest = contests.get(raceIndex);
    rows.push({
      id: String(precinct.number || precinct.name),
      name: String(precinct.name || precinct.number),
      candidates: (contest?.c || []).map(choice => ({ id: choice.n, votes: Number(choice.t) })),
      reported: Boolean(contest)
    });
  }
}

const races = source.totals.map(total => ({
  id: Number(total.n),
  name: String(source.contestNames[total.n]),
  precinctsReporting: Number(total.r || 0),
  precinctsTotal: Number(total.p || 0),
  ballotsCounted: Number(total.b || 0),
  totalVotes: Number(total.t || 0),
  candidates: (total.c || []).map(choice => ({ id: Number(choice.n), name: String(source.candidateNames[choice.n]), votes: Number(choice.t) })),
  precincts: precinctByRace.get(total.n) || []
}));
const content = { schemaVersion: 1, provider: "Alaska Division of Elections", state: "AK", electionPath, electionName: source.name, sourceUpdatedAt: source.updated, certified: Boolean(source.certified), sourceUrl, races };
content.fingerprint = createHash("sha256").update(JSON.stringify(content)).digest("hex");
let existing = null;
try { existing = JSON.parse(await readFile(outputPath, "utf8")); } catch {}
if (existing?.fingerprint === content.fingerprint) {
  console.log(`No Alaska results change (${source.updated}).`);
  process.exit(0);
}
content.retrievedAt = new Date().toISOString();
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(content, null, 2) + "\n", "utf8");
console.log(`Wrote ${races.length} races and ${source.precincts?.length || 0} precincts.`);

