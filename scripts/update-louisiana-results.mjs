import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://voterportal.sos.la.gov/ElectionResults/ElectionResults/Data";
const electionDate = process.env.LOUISIANA_ELECTION_DATE || "20261103";
const outputPath = path.resolve("elections/data/louisiana.json");
const parishNames = ["Acadia","Allen","Ascension","Assumption","Avoyelles","Beauregard","Bienville","Bossier","Caddo","Calcasieu","Caldwell","Cameron","Catahoula","Claiborne","Concordia","De Soto","East Baton Rouge","East Carroll","East Feliciana","Evangeline","Franklin","Grant","Iberia","Iberville","Jackson","Jefferson","Jefferson Davis","Lafayette","Lafourche","LaSalle","Lincoln","Livingston","Madison","Morehouse","Natchitoches","Orleans","Ouachita","Plaquemines","Pointe Coupee","Rapides","Red River","Richland","Sabine","St. Bernard","St. Charles","St. Helena","St. James","St. John the Baptist","St. Landry","St. Martin","St. Mary","St. Tammany","Tangipahoa","Tensas","Terrebonne","Union","Vermilion","Vernon","Washington","Webster","West Baton Rouge","West Carroll","West Feliciana","Winn"];

async function getBlob(blob) {
  const url = new URL(baseUrl);
  url.searchParams.set("blob", blob);
  const response = await fetch(url, { headers: { "user-agent": "Countline/0.1 (+https://mimicorp.systems/elections/)" } });
  if (!response.ok) throw new Error(`Louisiana results returned ${response.status} for ${blob}`);
  return response.json();
}

const sourceDirectory = process.env.LOUISIANA_SOURCE_DIRECTORY;
async function load(name, blob) {
  if (!sourceDirectory) return getBlob(blob);
  return JSON.parse(await readFile(path.join(path.resolve(sourceDirectory), name), "utf8"));
}

const [datesRaw, definitionsRaw, totalsRaw, parishStatusRaw] = await Promise.all([
  load("election-dates.json", "ElectionDates.htm"),
  load("races.json", `${electionDate}/RacesCandidates_Multiparish.htm`),
  load("votes.json", `${electionDate}/Votes_Multiparish.htm`),
  load("parishes.json", `${electionDate}/ParishesInElection.htm`)
]);
const definitions = definitionsRaw.Races?.Race || [];
const totals = new Map((totalsRaw.Races?.Race || []).map(race => [String(race.ID), race]));
const selected = definitions.filter(race => ["140", "145"].includes(String(race.OfficeLevel)) || String(race.SpecificTitle).startsWith("CA No."));
const parishResults = await Promise.all(selected.map(race => load(`race-${race.ID}.json`, `${electionDate}/VotesRaceByParish/Votes_${race.ID}.htm`)));
const election = (datesRaw.Dates?.Date || []).find(item => String(item.ElectionDate).replaceAll("/", "") === `${electionDate.slice(4,8)}${electionDate.slice(0,4)}`) || (datesRaw.Dates?.Date || [])[0];

function number(value) { return Number(value || 0); }
function partyAndName(description) {
  const match = String(description).match(/\s+\(([^)]+)\)$/);
  return { name: match ? description.slice(0, match.index) : String(description), party: match?.[1] || "" };
}
function ruleFor(race) {
  if (String(race.SpecificTitle).startsWith("CA No.")) return { type: "Ballot proposition", rule: "A majority of votes cast determines whether the amendment is approved." };
  if (String(race.CanHaveRunoff) === "1") return { type: "Open primary", rule: "A candidate receiving more than 50% is elected; otherwise the top two advance to the runoff." };
  return { type: "General election", rule: "The candidate receiving the most votes is elected after certification." };
}

const statusByParish = new Map((parishStatusRaw.ParishesInElection?.Parish || []).map(item => [String(item.ParishValue).padStart(2, "0"), item]));
const races = selected.map((definition, index) => {
  const total = totals.get(String(definition.ID)) || {};
  const candidateDefinitions = new Map((definition.Choice || []).map(choice => [String(choice.ID), choice]));
  const candidates = (total.Choice || definition.Choice || []).map(choice => {
    const source = candidateDefinitions.get(String(choice.ID)) || choice;
    return { id: String(choice.ID), ...partyAndName(source.Desc), votes: number(choice.VoteTotal) };
  });
  const parishRows = parishResults[index].Parishes?.Parish || [];
  const parishById = new Map(parishRows.map(item => [String(item.ParishValue).padStart(2, "0"), item]));
  const parishes = parishNames.map((name, parishIndex) => {
    const id = String(parishIndex + 1).padStart(2, "0");
    const row = parishById.get(id) || statusByParish.get(id);
    const precinctsReporting = number(row?.PrecinctsReporting);
    const precinctsTotal = number(row?.PrecinctsExpected || row?.Precincts);
    const absenteeReporting = number(row?.NumAbsenteeReporting);
    const absenteeTotal = number(row?.NumAbsenteeExpected);
    return {
      id, name, precinctsReporting, precinctsTotal, absenteeReporting, absenteeTotal,
      reported: precinctsReporting > 0 || absenteeReporting > 0,
      candidates: (row?.Choice || []).map(choice => ({ id: String(choice.ID), votes: number(choice.VoteTotal) }))
    };
  });
  return {
    id: String(definition.ID), name: String(definition.SpecificTitle), ...ruleFor(definition),
    numberToBeElected: number(definition.NumberToBeElected || 1),
    precinctsReporting: number(total.PrecinctsReporting), precinctsTotal: number(total.PrecinctsExpected),
    absenteeReporting: number(total.NumAbsenteeReporting), absenteeTotal: number(total.NumAbsenteeExpected),
    qualifiedVoters: number(total.VoterCountQualified), ballotsCounted: number(total.VoterCountVoted), candidates, parishes
  };
});
const versionCandidates = [totalsRaw.Races?.VersionDateTime, parishStatusRaw.ParishesInElection?.VersionDateTime, definitionsRaw.Races?.WriteTime].filter(Boolean).sort();
const content = {
  schemaVersion: 1, provider: "Louisiana Secretary of State", state: "LA", electionDate,
  electionName: "November 3, 2026 Louisiana Election", sourceUpdatedAt: versionCandidates.at(-1),
  certified: String(election?.ResultsOfficial) === "1", sourceUrl: "https://voterportal.sos.la.gov/graphical", races
};
content.fingerprint = createHash("sha256").update(JSON.stringify(content)).digest("hex");
let existing = null;
try { existing = JSON.parse(await readFile(outputPath, "utf8")); } catch {}
if (existing?.fingerprint === content.fingerprint) {
  console.log(`No Louisiana results change (${content.sourceUpdatedAt}).`);
  process.exit(0);
}
content.retrievedAt = new Date().toISOString();
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(content, null, 2) + "\n", "utf8");
console.log(`Wrote ${races.length} Louisiana races across 64 parishes.`);
