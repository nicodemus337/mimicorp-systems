const nodes = [
  {
    id: "mimicorp",
    label: "Mimicorp",
    type: "kernel",
    description: "Root kernel for the Mimicorp ecosystem, connecting projects across land, agriculture, media, and ecological systems.",
    internal: true,
    url: "/",
    connections: ["second_cutting", "ag_lab", "joynet"]
  },
  {
    id: "second_cutting",
    label: "Second Cutting",
    type: "branch",
    description: "Podcast and documentary work focused on land, animals, and ecological systems.",
    internal: true,
    url: "/nodes/second-cutting",
    connections: ["glc", "media", "data"]
  },
  {
    id: "ag_lab",
    label: "Ag Lab",
    type: "branch",
    description: "Experimental agriculture lab for field systems, applied research, and practical prototyping.",
    internal: true,
    url: "/nodes/ag-lab",
    connections: ["data", "software"]
  },
  {
    id: "joynet",
    label: "JoyNet",
    type: "branch",
    description: "Creative network layer for distributed storytelling, publishing, and cultural collaboration.",
    internal: true,
    url: "/nodes/joynet",
    connections: ["design", "media", "software"]
  },
  {
    id: "glc",
    label: "GLC",
    type: "stem",
    description: "Ground logistics and connective infrastructure for field operations and partner systems.",
    internal: false,
    url: "https://example.com/glc",
    connections: ["media", "design"]
  },
  {
    id: "teche_lake_outfitters",
    label: "Teche Lake Outfitters",
    type: "stem",
    description: "Place-based operations node for land access, fieldwork, and outdoor systems.",
    internal: false,
    url: "https://example.com/teche-lake-outfitters",
    connections: ["joynet", "design"]
  },
  {
    id: "gp_supply",
    label: "GP Supply",
    type: "stem",
    description: "Supply and support node for infrastructure, materials, and practical deployment.",
    internal: false,
    url: "https://example.com/gp-supply",
    connections: ["ag_lab", "software"]
  },
  {
    id: "shady_pines",
    label: "Shady Pines",
    type: "stem",
    description: "Landscape and stewardship node focused on habitat, seasonality, and ecological management.",
    internal: false,
    url: "https://example.com/shady-pines",
    connections: ["ag_lab", "data"]
  },
  {
    id: "design",
    label: "Design",
    type: "fruit",
    description: "Visual systems, interfaces, and creative direction across the Mimicorp network.",
    internal: true,
    url: "/nodes/design",
    connections: ["mimicorp"]
  },
  {
    id: "media",
    label: "Media",
    type: "fruit",
    description: "Publishing, audio, film, and documentary output distributed through the ecosystem.",
    internal: true,
    url: "/nodes/media",
    connections: ["mimicorp"]
  },
  {
    id: "data",
    label: "Data",
    type: "fruit",
    description: "Research, archives, mapping, and information systems supporting adaptive work.",
    internal: true,
    url: "/nodes/data",
    connections: ["mimicorp"]
  },
  {
    id: "software",
    label: "Software",
    type: "fruit",
    description: "Tools, automations, and custom lightweight systems that hold the network together.",
    internal: true,
    url: "/nodes/software",
    connections: ["mimicorp"]
  }
];

const typeColors = {
  kernel: "#ffffff",
  branch: "#5ea96a",
  stem: "#7b5b42",
  fruit: "#d7b45f"
};

const nodeLookup = new Map(nodes.map((node) => [node.id, node]));
const linkSeen = new Set();
const links = [];

// Build a unique link list from each node's declared connections.
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

const sidebarTitle = document.getElementById("node-title");
const sidebarType = document.getElementById("node-type");
const sidebarRoute = document.getElementById("node-route");
const sidebarDescription = document.getElementById("node-description");
const connectionList = document.getElementById("connection-list");
const openProjectButton = document.getElementById("open-project");
const viewConnectionsButton = document.getElementById("view-connections");
const placeholderPanel = document.getElementById("placeholder-panel");
const placeholderTitle = document.getElementById("placeholder-title");
const placeholderDescription = document.getElementById("placeholder-description");
const placeholderPath = document.getElementById("placeholder-path");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalResponse = document.getElementById("terminal-response");
const statusNodeCount = document.getElementById("status-node-count");
const statusLinkCount = document.getElementById("status-link-count");
const graphCanvas = document.getElementById("graph-canvas");

statusNodeCount.textContent = String(nodes.length);
statusLinkCount.textContent = String(links.length);

let selectedNodeId = "mimicorp";
let simulation;
let nodeSelection;
let linkSelection;
let labelSelection;

function renderPlaceholder(node) {
  if (!node.internal) {
    placeholderPanel.hidden = true;
    return;
  }

  placeholderTitle.textContent = node.label;
  placeholderDescription.textContent = "Internal page placeholder loaded for " + node.label + ".";
  placeholderPath.textContent = node.url;
  placeholderPanel.hidden = false;
}

function renderSidebar(node) {
  sidebarTitle.textContent = node.label;
  sidebarType.textContent = node.type;
  sidebarType.dataset.type = node.type;
  sidebarRoute.textContent = node.internal ? "internal" : "external";
  sidebarDescription.textContent = node.description;

  connectionList.innerHTML = "";
  node.connections
    .map((id) => nodeLookup.get(id))
    .filter(Boolean)
    .forEach((connectedNode) => {
      const button = document.createElement("button");
      button.className = "connection-chip";
      button.type = "button";
      button.textContent = connectedNode.label;
      button.addEventListener("click", () => selectNode(connectedNode.id));
      connectionList.appendChild(button);
    });

  renderPlaceholder(node);
}

function updateGraphState() {
  if (!nodeSelection || !linkSelection || !labelSelection) {
    return;
  }

  nodeSelection.classed("is-selected", (d) => d.id === selectedNodeId);

  linkSelection.classed("is-highlighted", (d) => {
    const sourceId = typeof d.source === "object" ? d.source.id : d.source;
    const targetId = typeof d.target === "object" ? d.target.id : d.target;
    return sourceId === selectedNodeId || targetId === selectedNodeId;
  });

  labelSelection.style("opacity", (d) => {
    if (d.id === selectedNodeId) {
      return 1;
    }

    return nodeLookup.get(selectedNodeId).connections.includes(d.id) ? 0.95 : 0.55;
  });
}

function selectNode(nodeId) {
  const node = nodeLookup.get(nodeId);
  if (!node) {
    terminalResponse.textContent = 'Node "' + nodeId + '" not found.';
    return;
  }

  selectedNodeId = nodeId;
  renderSidebar(node);
  updateGraphState();
  terminalResponse.textContent = "Selected " + node.label + ".";
}

function activateNode(node) {
  if (node.internal) {
    renderPlaceholder(node);
    terminalResponse.textContent = "Loaded internal placeholder for " + node.label + ".";
    return;
  }

  window.open(node.url, "_blank", "noopener,noreferrer");
  terminalResponse.textContent = "Opened external project for " + node.label + ".";
}

function focusConnections() {
  updateGraphState();
  const node = nodeLookup.get(selectedNodeId);
  const names = node.connections
    .map((id) => nodeLookup.get(id))
    .filter(Boolean)
    .map((item) => item.label)
    .join(", ");

  terminalResponse.textContent = names
    ? "Connections: " + names + "."
    : "No connections available for this node.";
}

function centerOnNode(nodeId) {
  const node = nodeLookup.get(nodeId);
  if (!node || !simulation) {
    return;
  }

  simulation.alphaTarget(0.15).restart();
  node.fx = window.innerWidth * 0.38;
  node.fy = window.innerHeight * 0.42;

  window.setTimeout(() => {
    node.fx = null;
    node.fy = null;
    simulation.alphaTarget(0);
  }, 800);
}

function parseCommand(command) {
  const normalized = command.trim().toLowerCase();
  if (!normalized) {
    terminalResponse.textContent = "Enter a command.";
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
    terminalResponse.textContent = nodes.map((node) => node.id).join(" | ");
    return;
  }

  if (normalized.startsWith("open ")) {
    const requested = normalized.slice(5).trim().replace(/-/g, "_");
    selectNode(requested);
    centerOnNode(requested);
    const node = nodeLookup.get(requested);
    if (node) {
      activateNode(node);
    }
    return;
  }

  terminalResponse.textContent = 'Unknown command "' + command + '". Use map, list, or open [node_id].';
}

function buildGraph() {
  const graphPanel = graphCanvas.parentElement;
  const width = graphPanel.clientWidth;
  const height = graphPanel.clientHeight;

  graphCanvas.setAttribute("viewBox", "0 0 " + width + " " + height);

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
    .data(links)
    .join("line")
    .attr("class", "link-line");

  nodeSelection = zoomLayer
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "node-group")
    .style("color", (d) => typeColors[d.type])
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
    .data(nodes)
    .join("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dy", (d) => (d.type === "kernel" ? 34 : 28))
    .text((d) => d.label);

  // Combine link attraction, repulsion, centering, and collision to keep the map readable.
  simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d) => d.id).distance(130).strength(0.5))
    .force("charge", d3.forceManyBody().strength(-320))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius((d) => {
      if (d.type === "kernel") {
        return 66;
      }
      if (d.type === "branch") {
        return 50;
      }
      return 38;
    }))
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

  updateGraphState();
}

openProjectButton.addEventListener("click", () => {
  activateNode(nodeLookup.get(selectedNodeId));
});

viewConnectionsButton.addEventListener("click", () => {
  focusConnections();
});

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  parseCommand(terminalInput.value);
  terminalInput.value = "";
});

window.addEventListener("resize", buildGraph);

buildGraph();
selectNode(selectedNodeId);
