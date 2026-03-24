const coreNodes = [
  {
    id: "mimicorp",
    label: "Mimicorp",
    type: "kernel",
    description: "A systems lab that attracts capital and partners to build ecological infrastructure.",
    internal: true,
    url: "/",
    connections: ["second_cutting", "ag_lab", "joynet"]
  },
  {
    id: "second_cutting",
    label: "Second Cutting",
    type: "branch",
    description: "Second Cutting builds the narrative case around land, labor, and infrastructure so ecological projects can earn support and strategic alignment.",
    internal: true,
    url: "/nodes/second-cutting/",
    connections: ["mimicorp", "glc", "media", "data"]
  },
  {
    id: "ag_lab",
    label: "Ag Lab",
    type: "branch",
    description: "An experimental agricultural lab linking ranch operations, ecological research, and funding pathways that can support infrastructure on the ground.",
    internal: true,
    url: "/nodes/ag-lab/",
    connections: ["mimicorp", "data", "software", "gp_supply", "shady_pines"]
  },
  {
    id: "joynet",
    label: "JoyNet",
    type: "branch",
    description: "A public-facing branch that builds trust, values alignment, and cultural legitimacy around the wider Mimicorp system.",
    internal: true,
    url: "/nodes/joynet/",
    connections: ["mimicorp", "media", "instagram_joynet_church"]
  },
  {
    id: "glc",
    label: "GLC",
    type: "stem",
    description: "Gonsoulin Land and Cattle is a working ranch that gives Mimicorp real operating conditions, constraints, and proof for infrastructure ideas.",
    internal: false,
    url: "https://glcranch.com",
    connections: ["second_cutting", "media", "design"]
  },
  {
    id: "teche_lake_outfitters",
    label: "Teche Lake Outfitters",
    type: "stem",
    description: "Teche Lake Outfitters connects people to the landscape through direct encounter, helping partners understand place as lived reality instead of abstraction.",
    internal: false,
    url: "https://www.techelakeoutfitters.com",
    connections: ["design"]
  },
  {
    id: "gp_supply",
    label: "GP Supply",
    type: "stem",
    description: "GP Supply and Lumber is a rural hardware and building supply store representing the practical layer of rural infrastructure.",
    internal: false,
    url: "http://www.gpsupplyandlumber.com",
    connections: ["ag_lab", "software"]
  },
  {
    id: "shady_pines",
    label: "Shady Pines",
    type: "stem",
    description: "Shady Pines is a working landscape for observation, experimentation, and testing ecological infrastructure ideas before they scale.",
    internal: false,
    url: "https://example.com/shady-pines",
    connections: ["ag_lab", "data"]
  },
  {
    id: "design",
    label: "Design",
    type: "fruit",
    description: "Design packages complex systems into briefs, interfaces, and materials that help projects secure commitment.",
    internal: true,
    url: "/nodes/design/",
    connections: ["mimicorp", "glc", "teche_lake_outfitters"]
  },
  {
    id: "media",
    label: "Media",
    type: "fruit",
    description: "Media makes the work visible so partners, funders, and the public can see ecological systems and interventions clearly.",
    internal: true,
    url: "/nodes/media/",
    connections: ["mimicorp", "second_cutting", "joynet", "glc", "instagram_cajunleprochaun", "tiktok_auntie_christ", "instagram_joynet_church"]
  },
  {
    id: "data",
    label: "Data",
    type: "fruit",
    description: "A living archive of ecological data that turns observation into evidence for design, funding, and stewardship decisions.",
    internal: true,
    url: "/nodes/data/",
    connections: ["mimicorp", "second_cutting", "ag_lab", "shady_pines"]
  },
  {
    id: "software",
    label: "Software",
    type: "fruit",
    description: "Software tools support the infrastructure behind Mimicorp projects through dashboards, data pipelines, and custom decision systems.",
    internal: true,
    url: "/nodes/software/",
    connections: ["mimicorp", "ag_lab", "gp_supply"]
  },
  {
    id: "book_time",
    label: "Book Time",
    type: "fruit",
    description: "Reserve focused studio time to shape strategy, partnerships, and project pathways for ecological infrastructure work.",
    internal: true,
    url: "/nodes/book-time/",
    connections: ["mimicorp"]
  },
  {
    id: "instagram_cajunleprochaun",
    label: "@cajunleprochaun",
    type: "stem",
    description: "Instagram presence for Mimicorp media and field storytelling.",
    internal: false,
    url: "https://instagram.com/cajunleprochaun",
    connections: ["media"]
  },
  {
    id: "tiktok_auntie_christ",
    label: "@the_auntie_christ",
    type: "stem",
    description: "TikTok presence for short-form Mimicorp media.",
    internal: false,
    url: "https://tiktok.com/@the_auntie_christ",
    connections: ["media"]
  },
  {
    id: "instagram_joynet_church",
    label: "@joynet.church",
    type: "stem",
    description: "Instagram presence connected to the JoyNet / Church of Joy branch.",
    internal: false,
    url: "https://instagram.com/joynet.church",
    connections: ["joynet", "media"]
  }
];

const typeColors = {
  kernel: "#ffffff",
  branch: "#5ea96a",
  stem: "#7b5b42",
  fruit: "#d7b45f",
  episode: "#d7b45f"
};

function buildEpisodeNodes(registry) {
  return registry.map((episode) => {
    const slug = String(episode.episode_number).padStart(2, "0");
    const extraConnections = (episode.connections || []).filter((id) => id !== "second_cutting" && id !== "media");
    return {
      id: episode.id,
      label: "Ep " + slug,
      type: "episode",
      description: episode.description,
      internal: true,
      url: "/nodes/second-cutting/episode-" + slug + "/",
      connections: ["second_cutting", "media", ...extraConnections],
      episode_number: episode.episode_number,
      episode_title: episode.title,
      guest: episode.guest,
      themes: episode.themes,
      date: episode.date,
      listen_url: episode.listen_url,
      spotify_url: episode.spotify_url,
      watch_url: episode.watch_url,
      transcript_url: episode.transcript_url,
      kind: "episode"
    };
  });
}

const generatedEpisodes = buildEpisodeNodes(typeof episodeRegistry !== "undefined" ? episodeRegistry : []);
let showEpisodes = true;
let selectedNodeId = "mimicorp";
let simulation;
let nodeSelection;
let linkSelection;
let labelSelection;

const sidebarTitle = document.getElementById("node-title");
const sidebarType = document.getElementById("node-type");
const sidebarRoute = document.getElementById("node-route");
const sidebarDescription = document.getElementById("node-description");
const nodeInvitation = document.getElementById("node-invitation");
const nodeUrl = document.getElementById("node-url");
const connectionList = document.getElementById("connection-list");
const episodeMeta = document.getElementById("episode-meta");
const episodeNumber = document.getElementById("episode-number");
const episodeGuest = document.getElementById("episode-guest");
const episodeDate = document.getElementById("episode-date");
const episodeThemes = document.getElementById("episode-themes");
const openProjectButton = document.getElementById("open-project");
const watchProjectButton = document.getElementById("watch-project");
const transcriptProjectButton = document.getElementById("transcript-project");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalResponse = document.getElementById("terminal-response");
const statusNodeCount = document.getElementById("status-node-count");
const graphCanvas = document.getElementById("graph-canvas");
const episodeToggle = document.getElementById("episode-toggle");

function getDisplayTitle(node) {
  return node.kind === "episode" ? node.episode_title : node.label;
}

function getDisplayType(node) {
  if (node.kind === "episode") {
    return "episode";
  }

  if (node.type === "fruit") {
    return "service";
  }

  return node.type;
}

function getRouteLabel(node) {
  return node.internal ? "internal page" : "external link";
}

function getInvitation(node) {
  if (node.id === "mimicorp") {
    return "Explore the network to see how Mimicorp attracts capital and partners around ecological infrastructure.";
  }

  if (node.id === "second_cutting") {
    return "Enter the archive and start listening from the field.";
  }

  if (node.kind === "episode") {
    return "Listen now, then open the episode page for Spotify and transcript details.";
  }

  if (!node.internal) {
    return "Open the live site to see the operating context behind the thesis.";
  }

  if (node.type === "fruit") {
    return "Open this output layer to see how Mimicorp turns strategy and evidence into partner-facing infrastructure tools.";
  }

  return "Open this node to follow the infrastructure logic in more detail.";
}

function getPrimaryActionLabel(node) {
  if (node.kind === "episode" || node.id === "second_cutting") {
    return "Listen";
  }

  if (!node.internal) {
    return "Visit site";
  }

  if (node.type === "fruit") {
    return "Explore service";
  }

  return "Explore node";
}

function getActiveNodes() {
  return showEpisodes ? [...coreNodes, ...generatedEpisodes] : [...coreNodes];
}

function getGraphState() {
  const nodes = getActiveNodes();
  const nodeLookup = new Map(nodes.map((node) => [node.id, node]));
  const links = [];
  const linkSeen = new Set();

  nodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      if (!nodeLookup.has(targetId)) {
        return;
      }

      const key = [node.id, targetId].sort().join("|");
      if (linkSeen.has(key)) {
        return;
      }

      linkSeen.add(key);
      links.push({ source: node.id, target: targetId });
    });
  });

  return { nodes, links, nodeLookup };
}

function getConnectedSet(nodeId) {
  const { nodeLookup } = getGraphState();
  const node = nodeLookup.get(nodeId);
  return new Set([nodeId, ...(node ? node.connections : [])]);
}

function renderEpisodeMeta(node) {
  if (!episodeMeta || !watchProjectButton || !transcriptProjectButton) {
    return;
  }

  if (node.kind !== "episode") {
    episodeMeta.hidden = true;
    watchProjectButton.hidden = true;
    transcriptProjectButton.hidden = true;
    return;
  }

  episodeMeta.hidden = false;
  watchProjectButton.hidden = !node.watch_url;
  transcriptProjectButton.hidden = !node.transcript_url;
  episodeNumber.textContent = "Episode " + String(node.episode_number).padStart(2, "0");
  episodeGuest.textContent = "Guest: " + node.guest;
  episodeDate.textContent = "Date: " + node.date;
  episodeThemes.textContent = "Themes: " + node.themes.join(", ");
}

function renderSidebar(node) {
  if (
    !sidebarTitle ||
    !sidebarType ||
    !sidebarRoute ||
    !sidebarDescription ||
    !nodeInvitation ||
    !nodeUrl ||
    !connectionList ||
    !openProjectButton
  ) {
    renderEpisodeMeta(node);
    return;
  }

  const displayType = getDisplayType(node);
  sidebarTitle.textContent = getDisplayTitle(node);
  sidebarType.textContent = displayType;
  sidebarType.dataset.type = displayType;
  sidebarRoute.textContent = getRouteLabel(node);
  sidebarDescription.textContent = node.description;
  nodeInvitation.textContent = getInvitation(node);
  nodeUrl.textContent = node.url;
  openProjectButton.textContent = getPrimaryActionLabel(node);

  const { nodeLookup } = getGraphState();
  connectionList.innerHTML = "";
  let visibleConnectionIds = node.connections;

  if (node.id === "mimicorp") {
    visibleConnectionIds = ["second_cutting", "ag_lab", "joynet"];
  }

  visibleConnectionIds
    .map((id) => nodeLookup.get(id))
    .filter(Boolean)
    .forEach((connectedNode) => {
      const button = document.createElement("button");
      button.className = "connection-chip";
      button.type = "button";
      button.textContent = connectedNode.kind === "episode" ? connectedNode.episode_title : connectedNode.label;
      button.addEventListener("click", () => selectNode(connectedNode.id));
      connectionList.appendChild(button);
    });

  renderEpisodeMeta(node);
}

function updateGraphState() {
  if (!nodeSelection || !linkSelection || !labelSelection) {
    return;
  }

  const connectedSet = getConnectedSet(selectedNodeId);

  nodeSelection
    .classed("is-selected", (d) => d.id === selectedNodeId)
    .classed("is-dimmed", (d) => !connectedSet.has(d.id));

  linkSelection.classed("is-highlighted", (d) => {
    const sourceId = typeof d.source === "object" ? d.source.id : d.source;
    const targetId = typeof d.target === "object" ? d.target.id : d.target;
    return sourceId === selectedNodeId || targetId === selectedNodeId;
  });

  labelSelection.style("opacity", (d) => (connectedSet.has(d.id) ? 1 : 0.28));
}

function selectNode(nodeId) {
  const { nodeLookup } = getGraphState();
  const node = nodeLookup.get(nodeId);
  if (!node) {
    terminalResponse.textContent = 'Node "' + nodeId + '" not found.';
    return;
  }

  selectedNodeId = nodeId;
  renderSidebar(node);
  updateGraphState();
  terminalResponse.textContent = getDisplayTitle(node) + " active. " + getInvitation(node);
}

function activateNode(node, section = "") {
  if (node.kind === "episode") {
    if (section === "watch" && node.watch_url) {
      window.open(node.watch_url, "_blank", "noopener,noreferrer");
      return;
    }

    if (section === "transcript" && node.transcript_url) {
      window.open(node.transcript_url, "_blank", "noopener,noreferrer");
      return;
    }

    if ((section === "" || section === "listen") && node.listen_url) {
      window.open(node.listen_url, "_blank", "noopener,noreferrer");
      return;
    }
  }

  if (!node.internal) {
    window.open(node.url, "_blank", "noopener,noreferrer");
    terminalResponse.textContent = "Opened " + getDisplayTitle(node) + ".";
    return;
  }

  window.location.href = section ? node.url + "#" + section : node.url;
}

function focusConnections() {
  const { nodeLookup } = getGraphState();
  const node = nodeLookup.get(selectedNodeId);
  if (!node) {
    return;
  }

  updateGraphState();
  const names = node.connections
    .map((id) => nodeLookup.get(id))
    .filter(Boolean)
    .map((item) => getDisplayTitle(item))
    .join(", ");

  terminalResponse.textContent = names ? "Connected to: " + names + "." : "No connections available for this node.";
}

function centerOnNode(nodeId) {
  const { nodeLookup } = getGraphState();
  const node = nodeLookup.get(nodeId);
  if (!node || !simulation) {
    return;
  }

  const width = graphCanvas.viewBox.baseVal.width || graphCanvas.clientWidth;
  const height = graphCanvas.viewBox.baseVal.height || graphCanvas.clientHeight;

  simulation.alphaTarget(0.15).restart();
  node.fx = width * 0.5;
  node.fy = height * 0.48;

  window.setTimeout(() => {
    node.fx = null;
    node.fy = null;
    simulation.alphaTarget(0);
  }, 800);
}

function normalizeNodeQuery(value) {
  return value.trim().toLowerCase().replace(/-/g, "_").replace(/\s+/g, "_");
}

function findNodeByQuery(query) {
  const normalized = normalizeNodeQuery(query);
  const { nodes } = getGraphState();
  return nodes.find((node) => {
    const normalizedLabel = normalizeNodeQuery(node.kind === "episode" ? node.episode_title : node.label);
    return node.id === normalized || normalizedLabel === normalized;
  });
}

function parseCommand(command) {
  const normalized = command.trim().toLowerCase();
  if (!normalized) {
    terminalResponse.textContent = "Enter a command.";
    return;
  }

  if (normalized === "help") {
    terminalResponse.textContent = "Commands: help, map, list, inspect [node], open [node].";
    return;
  }

  if (normalized === "map") {
    if (simulation) {
      simulation.alpha(1).restart();
    }
    terminalResponse.textContent = "Map simulation refreshed.";
    return;
  }

  if (normalized === "list") {
    const { nodes } = getGraphState();
    terminalResponse.textContent = nodes.map((node) => getDisplayTitle(node)).join(" | ");
    return;
  }

  if (normalized.startsWith("inspect ")) {
    const node = findNodeByQuery(normalized.slice(8));
    if (!node) {
      terminalResponse.textContent = 'Node "' + normalized.slice(8) + '" not found.';
      return;
    }
    selectNode(node.id);
    centerOnNode(node.id);
    return;
  }

  if (normalized.startsWith("open ")) {
    const node = findNodeByQuery(normalized.slice(5));
    if (!node) {
      terminalResponse.textContent = 'Node "' + normalized.slice(5) + '" not found.';
      return;
    }
    selectNode(node.id);
    centerOnNode(node.id);
    activateNode(node);
    return;
  }

  terminalResponse.textContent = 'Unknown command "' + command + '". Use help for available commands.';
}

function buildGraph() {
  const graphPanel = graphCanvas.parentElement;
  const width = graphPanel.clientWidth;
  const height = graphPanel.clientHeight;
  const graphData = getGraphState();

  graphCanvas.setAttribute("viewBox", "0 0 " + width + " " + height);
  if (statusNodeCount) {
    statusNodeCount.textContent = String(graphData.nodes.length) + " nodes";
  }

  const svg = d3.select(graphCanvas);
  svg.selectAll("*").remove();

  const zoomLayer = svg.append("g");
  svg.call(
    d3.zoom()
      .scaleExtent([0.7, 1.8])
      .on("zoom", (event) => {
        zoomLayer.attr("transform", event.transform);
      })
  );

  linkSelection = zoomLayer
    .append("g")
    .selectAll("line")
    .data(graphData.links)
    .join("line")
    .attr("class", "link-line");

  nodeSelection = zoomLayer
    .append("g")
    .selectAll("g")
    .data(graphData.nodes)
    .join("g")
    .attr("class", "node-group")
    .style("color", (d) => typeColors[d.kind === "episode" ? "episode" : d.type])
    .on("mouseenter", function () {
      d3.select(this).classed("is-hovered", true);
    })
    .on("mouseleave", function () {
      d3.select(this).classed("is-hovered", false);
    })
    .on("click", (_, d) => {
      selectNode(d.id);
      centerOnNode(d.id);
    })
    .on("dblclick", (_, d) => {
      activateNode(d);
    })
    .call(
      d3.drag()
        .on("start", (event, d) => {
          if (!event.active) {
            simulation.alphaTarget(0.18).restart();
          }
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) {
            simulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
        })
    );

  nodeSelection
    .append("circle")
    .attr("class", "node-ring")
    .attr("stroke", "currentColor")
    .attr("r", (d) => {
      if (d.kind === "episode") {
        return 14;
      }
      if (d.type === "kernel") {
        return 34;
      }
      if (d.type === "branch") {
        return 24;
      }
      return 18;
    });

  nodeSelection
    .append("circle")
    .attr("class", "node-core")
    .attr("fill", "currentColor")
    .attr("r", (d) => {
      if (d.kind === "episode") {
        return 7;
      }
      if (d.type === "kernel") {
        return 15;
      }
      if (d.type === "branch") {
        return 11;
      }
      if (d.type === "stem") {
        return 10;
      }
      return 9;
    });

  labelSelection = zoomLayer
    .append("g")
    .selectAll("text")
    .data(graphData.nodes)
    .join("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dy", (d) => (d.kind === "episode" ? 22 : d.type === "kernel" ? 34 : 28))
    .text((d) => d.kind === "episode" ? "EP " + String(d.episode_number).padStart(2, "0") : d.label);

  simulation = d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links).id((d) => d.id).distance((d) => {
      const sourceId = typeof d.source === "object" ? d.source.id : d.source;
      const targetId = typeof d.target === "object" ? d.target.id : d.target;
      if (sourceId === "second_cutting" || targetId === "second_cutting") {
        return 85;
      }
      return 130;
    }).strength((d) => {
      const sourceId = typeof d.source === "object" ? d.source.id : d.source;
      const targetId = typeof d.target === "object" ? d.target.id : d.target;
      return sourceId === "second_cutting" || targetId === "second_cutting" ? 0.7 : 0.45;
    }))
    .force("charge", d3.forceManyBody().strength((d) => d.kind === "episode" ? -120 : -340))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius((d) => {
      if (d.kind === "episode") {
        return 24;
      }
      if (d.type === "kernel") {
        return 66;
      }
      if (d.type === "branch") {
        return 50;
      }
      return 38;
    }))
    .force("episodeX", d3.forceX((d) => d.kind === "episode" ? width * 0.42 : width * 0.5).strength((d) => d.kind === "episode" ? 0.08 : 0.015))
    .force("episodeY", d3.forceY((d) => d.kind === "episode" ? height * 0.45 : height * 0.5).strength((d) => d.kind === "episode" ? 0.08 : 0.015))
    .on("tick", () => {
      linkSelection
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      nodeSelection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
      labelSelection
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
    });

  if (!graphData.nodeLookup.has(selectedNodeId)) {
    selectedNodeId = "second_cutting";
  }
  updateGraphState();
}

if (openProjectButton) {
  openProjectButton.addEventListener("click", () => {
    const { nodeLookup } = getGraphState();
    activateNode(nodeLookup.get(selectedNodeId));
  });
}

if (watchProjectButton) {
  watchProjectButton.addEventListener("click", () => {
    const { nodeLookup } = getGraphState();
    activateNode(nodeLookup.get(selectedNodeId), "watch");
  });
}

if (transcriptProjectButton) {
  transcriptProjectButton.addEventListener("click", () => {
    const { nodeLookup } = getGraphState();
    activateNode(nodeLookup.get(selectedNodeId), "transcript");
  });
}

if (terminalForm && terminalInput) {
  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    parseCommand(terminalInput.value);
    terminalInput.value = "";
  });
}

if (episodeToggle) {
  episodeToggle.addEventListener("change", () => {
    showEpisodes = episodeToggle.checked;
    buildGraph();
    selectNode(selectedNodeId);
  });
}

window.addEventListener("resize", buildGraph);

buildGraph();
selectNode(selectedNodeId);
