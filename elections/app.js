const COLORS = ["#e6b94f", "#65aee4", "#b997e8", "#ee8b73"];

const DATA = {
  Louisiana: {
    localLabel: "Parish",
    localities: ["All parishes", "East Baton Rouge", "Jefferson", "Lafayette", "Orleans", "St. Tammany"],
    races: {
      "U.S. Senate": { type: "Statewide general election", reporting: 78.4, rule: "The candidate with the most votes leads. Displayed standings are not certifications.", candidates: [["Avery Landry", "Civic Alliance", 634218], ["Jordan Batiste", "Forward Louisiana", 598441], ["Casey Thibodeaux", "Independent", 143118], ["Morgan Reed", "Community Party", 65923]] },
      "U.S. House District 3": { type: "Open primary", reporting: 66.1, rule: "More than 50% wins; otherwise the top two advance.", candidates: [["Renée Fontenot", "Civic Alliance", 102441], ["Devon LeBlanc", "Forward Louisiana", 88309], ["Taylor Chen", "Independent", 41405], ["Quinn Jackson", "Community Party", 22271]] },
      "Constitutional Amendment 1": { type: "Ballot proposition", reporting: 81.7, rule: "A majority of votes cast determines the result.", candidates: [["Yes", "For the amendment", 701503], ["No", "Against the amendment", 651204]] }
    }
  },
  Michigan: {
    localLabel: "County",
    localities: ["All counties", "Ingham", "Kent", "Oakland", "Washtenaw", "Wayne"],
    races: {
      "Governor": { type: "Statewide general election", reporting: 72.3, rule: "The candidate with the most votes leads.", candidates: [["Alex Morgan", "Great Lakes Party", 1138012], ["Samira Patel", "Common Ground", 1099204], ["Drew Ellis", "Independent", 114401]] },
      "U.S. House District 7": { type: "District general election", reporting: 69.8, rule: "The candidate with the most votes leads.", candidates: [["Jamie Brooks", "Common Ground", 143807], ["Robin Hayes", "Great Lakes Party", 139020], ["Cameron Lee", "Independent", 12561]] }
    }
  },
  Pennsylvania: {
    localLabel: "County",
    localities: ["All counties", "Allegheny", "Bucks", "Erie", "Lancaster", "Philadelphia"],
    races: {
      "U.S. Senate": { type: "Statewide general election", reporting: 74.9, rule: "The candidate with the most votes leads.", candidates: [["Riley Mercer", "Keystone Coalition", 1862801], ["Noah Price", "Commonwealth Party", 1817220], ["Ari Monroe", "Independent", 142910]] },
      "Governor": { type: "Statewide general election", reporting: 75.2, rule: "The candidate with the most votes leads.", candidates: [["Taylor Walsh", "Commonwealth Party", 1901228], ["Emery Stone", "Keystone Coalition", 1783094]] }
    }
  },
  Alaska: {
    localLabel: "Borough or census area",
    localities: ["All areas", "Anchorage", "Fairbanks North Star", "Juneau", "Kenai Peninsula", "Matanuska-Susitna"],
    races: {
      "U.S. House At-Large": { type: "Ranked-choice general election", reporting: 61.5, rule: "First-choice totals shown; later rounds are calculated if no candidate has a majority.", candidates: [["Morgan North", "Alaska First", 100311], ["Sasha King", "Northern Coalition", 97442], ["Ellis Grant", "Independent", 44019], ["Parker Wells", "Liberty", 18903]] }
    }
  }
};

const parishNames = ["Acadia","Allen","Ascension","Assumption","Avoyelles","Beauregard","Bienville","Bossier","Caddo","Calcasieu","Caldwell","Cameron","Catahoula","Claiborne","Concordia","De Soto","East Baton Rouge","East Carroll","East Feliciana","Evangeline","Franklin","Grant","Iberia","Iberville","Jackson","Jefferson","Jefferson Davis","Lafayette","Lafourche","LaSalle","Lincoln","Livingston","Madison","Morehouse","Natchitoches","Orleans","Ouachita","Plaquemines","Pointe Coupee","Rapides","Red River","Richland","Sabine","St. Bernard","St. Charles","St. Helena","St. James","St. John the Baptist","St. Landry","St. Martin","St. Mary","St. Tammany","Tangipahoa","Tensas","Terrebonne","Union","Vermilion","Vernon","Washington","Webster","West Baton Rouge","West Carroll","West Feliciana","Winn"];

const landing = document.querySelector("#landing");
const resultsApp = document.querySelector("#results");
const stateSelect = document.querySelector("#state-select");
const localitySelect = document.querySelector("#locality-select");
const raceSelect = document.querySelector("#race-select");
const search = document.querySelector("#search");
let tableRows = [];
let alaskaLiveLoaded = false;
let alaskaMap = null;
let louisianaLiveLoaded = false;
let louisianaMap = null;

function option(value) { const item = document.createElement("option"); item.value = value; item.textContent = value; return item; }
function fillSelect(element, values) { element.replaceChildren(...values.map(option)); }
function hashNumber(value) { return [...value].reduce((total, char) => ((total * 31) + char.charCodeAt(0)) >>> 0, 7); }

function openResults() {
  landing.hidden = true;
  resultsApp.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("#results-title").focus?.();
}
function closeResults() { resultsApp.hidden = true; landing.hidden = false; window.scrollTo({ top: 0, behavior: "smooth" }); }

async function loadAlaskaLive() {
  if (alaskaLiveLoaded) return;
  try {
    const response = await fetch("data/alaska.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Alaska snapshot returned ${response.status}`);
    const snapshot = await response.json();
    const mapResponse = await fetch("data/alaska-map.json?v=2", { cache: "no-store" });
    if (mapResponse.ok) alaskaMap = await mapResponse.json();
    const races = {};
    for (const race of snapshot.races) {
      const reporting = race.precinctsTotal ? race.precinctsReporting / race.precinctsTotal * 100 : 0;
      races[race.name] = {
        type: "Official state results",
        reporting,
        rule: `Results reported by the Alaska Division of Elections. ${snapshot.certified ? "Certified" : "Unofficial"} snapshot.`,
        candidates: race.candidates.map(candidate => [candidate.name, "Alaska ballot choice", candidate.votes, candidate.id]),
        precincts: race.precincts,
        source: snapshot
      };
    }
    DATA.Alaska = { localLabel: "Precinct", localities: ["All precincts"], races, source: snapshot };
    alaskaLiveLoaded = true;
  } catch (error) {
    console.warn("Official Alaska snapshot unavailable; retaining demo data.", error);
  }
}

async function loadLouisianaLive() {
  if (louisianaLiveLoaded) return;
  try {
    const [resultsResponse, mapResponse] = await Promise.all([
      fetch("data/louisiana.json", { cache: "no-store" }),
      fetch("data/louisiana-map.json?v=1", { cache: "no-store" })
    ]);
    if (!resultsResponse.ok) throw new Error(`Louisiana snapshot returned ${resultsResponse.status}`);
    const snapshot = await resultsResponse.json();
    if (mapResponse.ok) louisianaMap = await mapResponse.json();
    const races = {};
    for (const race of snapshot.races) {
      const reporting = race.precinctsTotal ? race.precinctsReporting / race.precinctsTotal * 100 : 0;
      races[race.name] = {
        type: race.type,
        reporting,
        rule: race.rule,
        candidates: race.candidates.map(candidate => [candidate.name, candidate.party || "No party listed", candidate.votes, candidate.id]),
        parishes: race.parishes,
        source: snapshot
      };
    }
    DATA.Louisiana = { localLabel: "Parish", localities: ["All parishes", ...parishNames], races, source: snapshot };
    louisianaLiveLoaded = true;
  } catch (error) {
    console.warn("Official Louisiana snapshot unavailable; retaining demo data.", error);
  }
}

async function updateState() {
  if (stateSelect.value === "Alaska") await loadAlaskaLive();
  if (stateSelect.value === "Louisiana") await loadLouisianaLive();
  const state = DATA[stateSelect.value];
  document.querySelector("#locality-label").firstChild.textContent = `${state.localLabel} `;
  fillSelect(localitySelect, state.localities);
  fillSelect(raceSelect, Object.keys(state.races));
  const plural = state.localLabel === "Parish" ? "Parishes" : `${state.localLabel}s`;
  document.querySelector("#map-label").textContent = plural.toUpperCase();
  renderRace();
}

function renderRace() {
  const stateName = stateSelect.value;
  const state = DATA[stateName];
  const race = state.races[raceSelect.value];
  const locality = localitySelect.value;
  let candidateRows = race.candidates;
  let reporting = race.reporting;
  let hasResults = candidateRows.some(candidate => candidate[2] > 0);
  if (race.parishes && locality !== "All parishes") {
    const parish = race.parishes.find(item => item.name === locality);
    const votesById = new Map((parish?.candidates || []).map(candidate => [candidate.id, candidate.votes]));
    candidateRows = race.candidates.map(candidate => [candidate[0], candidate[1], votesById.get(candidate[3]) ?? 0, candidate[3]]);
    reporting = parish?.precinctsTotal ? parish.precinctsReporting / parish.precinctsTotal * 100 : 0;
    hasResults = Boolean(parish?.reported);
  }
  const total = candidateRows.reduce((sum, candidate) => sum + candidate[2], 0);
  const candidates = candidateRows.map((candidate, index) => ({ name: candidate[0], affiliation: candidate[1], votes: candidate[2], share: total ? candidate[2] / total : 0, color: COLORS[index % COLORS.length], id: candidate[3] }));
  if (hasResults) candidates.sort((a, b) => b.votes - a.votes);
  const notice = document.querySelector("#data-notice");
  if (race.source) {
    notice.classList.add("live-source");
    const sourceStatus = race.source.certified ? "CERTIFIED" : hasResults ? "LIVE · UNOFFICIAL" : "OFFICIAL SOURCE · NOT STARTED";
    notice.innerHTML = `<b>${sourceStatus}</b> — <a href="${race.source.sourceUrl}" target="_blank" rel="noopener">${race.source.provider}</a>. Updated ${race.source.sourceUpdatedAt}.`;
    document.querySelector("#updated-time").textContent = race.source.sourceUpdatedAt;
  } else {
    notice.classList.remove("live-source");
    notice.innerHTML = "<b>PRODUCT DEMO</b> — Fictional candidates and results. Not an official election source.";
    document.querySelector("#updated-time").textContent = "9:14 PM CT";
  }
  document.querySelector("#race-path").textContent = `${stateName} · ${locality} · ${race.type}`;
  document.querySelector("#race-name").textContent = raceSelect.value;
  document.querySelector("#race-rule").textContent = race.rule;
  document.querySelector("#reporting-value").textContent = `${reporting.toFixed(1)}%`;
  document.querySelector("#reporting-bar").style.width = `${reporting}%`;
  document.querySelector("#scoreboard").replaceChildren(...candidates.map((candidate, index) => candidateRow(candidate, hasResults && index === 0, hasResults)));
  document.querySelector("#decision").textContent = !hasResults
    ? `No results have been reported for ${locality}. Missing returns are not counted as zero votes.`
    : candidates[1]
    ? `${candidates[0].name} leads reported votes by ${(candidates[0].votes - candidates[1].votes).toLocaleString("en-US")} votes. This is not a projection.`
    : `${candidates[0].name} is the only reported choice. This is not a projection.`;
  buildJurisdictions(stateName, state, candidates, reporting);
  renderTiles(candidates);
  renderTable();
  document.querySelector("#legend").replaceChildren(...candidates.map(candidate => {
    const span = document.createElement("span"); span.innerHTML = `<i style="background:${candidate.color}"></i>${candidate.name}`; return span;
  }));
}

function candidateRow(candidate, isLeader, hasResults = true) {
  const row = document.createElement("div");
  row.className = "candidate-row";
  row.innerHTML = `<span class="candidate-swatch" style="background:${candidate.color}"></span><span><span class="candidate-name">${candidate.name}</span><span class="candidate-detail">${candidate.affiliation}${isLeader ? " · LEADS" : ""}</span></span><span class="candidate-total"><strong>${hasResults ? candidate.votes.toLocaleString("en-US") : "—"}</strong><small>${hasResults ? `${(candidate.share * 100).toFixed(1)}%` : "Awaiting returns"}</small></span>`;
  return row;
}

function buildJurisdictions(stateName, state, candidates, reporting) {
  const selectedRace = state.races[raceSelect.value];
  const officialAreas = selectedRace.parishes || selectedRace.precincts;
  if (officialAreas) {
    const candidateById = new Map(candidates.map(candidate => [candidate.id, candidate]));
    tableRows = officialAreas.map(area => {
      const candidateResults = area.candidates
        .map(result => ({ candidate: candidateById.get(result.id), votes: result.votes }))
        .filter(result => result.candidate)
        .sort((a, b) => b.votes - a.votes);
      const leaderResult = candidateResults[0];
      return {
        name: area.name,
        abbreviation: area.id.replace(/[^A-Za-z0-9]/g, "").slice(-3).toUpperCase(),
        leader: leaderResult?.candidate || candidates[0],
        votes: area.reported ? leaderResult?.votes ?? 0 : null,
        reporting: area.precinctsTotal !== undefined ? `${area.precinctsReporting}/${area.precinctsTotal}` : area.reported ? "1/1" : "0/1",
        status: !area.reported ? "Not started" : area.precinctsReporting === area.precinctsTotal && area.absenteeReporting === area.absenteeTotal ? "Complete" : "Reporting"
      };
    });
    return;
  }
  const names = stateName === "Louisiana" ? parishNames : Array.from({ length: 36 }, (_, index) => `${state.localLabel} ${String(index + 1).padStart(2, "0")}`);
  tableRows = names.map((name, index) => {
    const seed = hashNumber(stateName + name + raceSelect.value);
    const noReport = index % 13 === 0;
    const leader = candidates[seed % candidates.length];
    const precinctTotal = 8 + seed % 53;
    const precincts = noReport ? 0 : Math.min(precinctTotal, Math.max(1, Math.round(precinctTotal * reporting / 100 + (seed % 9 - 4))));
    return { name, abbreviation: name.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase(), leader, votes: noReport ? null : 900 + seed % 34000, reporting: `${precincts}/${precinctTotal}`, status: noReport ? "Not started" : precincts === precinctTotal ? "Complete" : "Reporting" };
  });
}

function renderTiles(candidates) {
  const stateMap = stateSelect.value === "Alaska" ? alaskaMap : stateSelect.value === "Louisiana" ? louisianaMap : null;
  if (stateMap) {
    renderGeoMap(stateMap, stateSelect.value === "Louisiana" ? "parish" : "precinct");
    return;
  }
  document.querySelector("#tile-map").classList.remove("geo-map");
  const tiles = tableRows.map(row => {
    const tile = document.createElement("div");
    tile.className = `tile${row.votes === null ? " no-report" : ""}`;
    tile.style.background = row.votes === null ? "" : row.leader.color;
    tile.textContent = row.abbreviation;
    tile.title = `${row.name}: ${row.votes === null ? "No report" : row.leader.name + " leads"}`;
    tile.setAttribute("aria-label", tile.title);
    return tile;
  });
  document.querySelector("#tile-map").replaceChildren(...tiles);
}

function renderGeoMap(mapData, areaLabel) {
  const container = document.querySelector("#tile-map");
  container.classList.add("geo-map");
  const namespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(namespace, "svg");
  svg.classList.add("precinct-map");
  svg.setAttribute("viewBox", "0 0 1000 560");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${stateSelect.value} ${areaLabel} results. Select an area to filter the table.`);
  const { minLongitude, maxLongitude, minLatitude, maxLatitude } = mapData.bounds;
  const project = ([longitude, latitude]) => [
    24 + ((longitude - minLongitude) / (maxLongitude - minLongitude)) * 952,
    536 - ((latitude - minLatitude) / (maxLatitude - minLatitude)) * 512
  ];
  const rows = new Map(tableRows.map(row => [row.abbreviation, row]));
  for (const region of mapData.regions) {
    const row = rows.get(region.id.replace(/[^A-Za-z0-9]/g, "").slice(-3).toUpperCase());
    const path = document.createElementNS(namespace, "path");
    const commands = region.polygons.flatMap(polygon => polygon.map(ring => ring.map((point, index) => `${index ? "L" : "M"}${project(point).map(value => value.toFixed(1)).join(" ")}`).join(" ") + " Z"));
    path.setAttribute("d", commands.join(" "));
    path.setAttribute("fill", row?.votes === null ? "#203846" : row?.leader.color || "#203846");
    path.setAttribute("class", "precinct-shape");
    path.setAttribute("tabindex", "0");
    const label = `${row?.name || region.id}: ${row?.votes === null ? "not started" : `${row?.leader.name} leads; reported`}`;
    path.setAttribute("aria-label", label);
    const title = document.createElementNS(namespace, "title");
    title.textContent = label;
    path.append(title);
    const select = () => { search.value = row?.name || region.id; renderTable(); document.querySelector("#results-table")?.scrollIntoView({ behavior: "smooth", block: "center" }); };
    path.addEventListener("click", select);
    path.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") select(); });
    svg.append(path);
  }
  container.replaceChildren(svg);
}

function renderTable() {
  const query = search.value.trim().toLowerCase();
  const rows = tableRows.filter(row => row.name.toLowerCase().includes(query)).map(row => {
    const tr = document.createElement("tr");
    const [reported, total] = row.reporting.split("/").map(Number);
    const percent = total ? reported / total * 100 : 0;
    tr.innerHTML = `<td>${row.name}</td><td>${row.votes === null ? "—" : row.leader.name}</td><td>${row.votes === null ? "—" : row.votes.toLocaleString("en-US")}</td><td><span class="row-progress"><span>${row.reporting}</span><span class="row-progress-track" aria-label="${percent.toFixed(0)} percent reporting"><i style="width:${percent}%"></i></span></span></td><td><span class="status">${row.status}</span></td>`;
    return tr;
  });
  document.querySelector("#results-table").replaceChildren(...rows);
}

fillSelect(stateSelect, Object.keys(DATA));
updateState();
document.querySelector("#us-globe").addEventListener("click", openResults);
document.querySelector("#back-to-globe").addEventListener("click", closeResults);
stateSelect.addEventListener("change", updateState);
localitySelect.addEventListener("change", () => {
  search.value = localitySelect.value.startsWith("All ") ? "" : localitySelect.value;
  renderRace();
});
raceSelect.addEventListener("change", renderRace);
search.addEventListener("input", renderTable);
