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

function updateState() {
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
  const total = race.candidates.reduce((sum, candidate) => sum + candidate[2], 0);
  const candidates = race.candidates.map((candidate, index) => ({ name: candidate[0], affiliation: candidate[1], votes: candidate[2], share: candidate[2] / total, color: COLORS[index] }));
  document.querySelector("#race-path").textContent = `${stateName} · ${locality} · ${race.type}`;
  document.querySelector("#race-name").textContent = raceSelect.value;
  document.querySelector("#race-rule").textContent = race.rule;
  document.querySelector("#reporting-value").textContent = `${race.reporting.toFixed(1)}%`;
  document.querySelector("#reporting-bar").style.width = `${race.reporting}%`;
  document.querySelector("#scoreboard").replaceChildren(...candidates.map((candidate, index) => candidateRow(candidate, index === 0)));
  document.querySelector("#decision").textContent = `${candidates[0].name} leads reported votes by ${(candidates[0].votes - candidates[1].votes).toLocaleString("en-US")} votes. This is not a projection.`;
  buildJurisdictions(stateName, state, candidates, race.reporting);
  renderTiles(candidates);
  renderTable();
  document.querySelector("#legend").replaceChildren(...candidates.map(candidate => {
    const span = document.createElement("span"); span.innerHTML = `<i style="background:${candidate.color}"></i>${candidate.name}`; return span;
  }));
}

function candidateRow(candidate, isLeader) {
  const row = document.createElement("div");
  row.className = "candidate-row";
  row.innerHTML = `<span class="candidate-swatch" style="background:${candidate.color}"></span><span><span class="candidate-name">${candidate.name}</span><span class="candidate-detail">${candidate.affiliation}${isLeader ? " · LEADS" : ""}</span></span><span class="candidate-total"><strong>${candidate.votes.toLocaleString("en-US")}</strong><small>${(candidate.share * 100).toFixed(1)}%</small></span>`;
  return row;
}

function buildJurisdictions(stateName, state, candidates, reporting) {
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

function renderTable() {
  const query = search.value.trim().toLowerCase();
  const rows = tableRows.filter(row => row.name.toLowerCase().includes(query)).map(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.name}</td><td>${row.votes === null ? "—" : row.leader.name}</td><td>${row.votes === null ? "—" : row.votes.toLocaleString("en-US")}</td><td>${row.reporting}</td><td><span class="status">${row.status}</span></td>`;
    return tr;
  });
  document.querySelector("#results-table").replaceChildren(...rows);
}

fillSelect(stateSelect, Object.keys(DATA));
updateState();
document.querySelector("#us-globe").addEventListener("click", openResults);
document.querySelector("#back-to-globe").addEventListener("click", closeResults);
stateSelect.addEventListener("change", updateState);
localitySelect.addEventListener("change", renderRace);
raceSelect.addEventListener("change", renderRace);
search.addEventListener("input", renderTable);
