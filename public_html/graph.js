const nodes = [
  {
    id: "mimicorp",
    label: "Mimicorp",
    type: "kernel",
    description: "Exploring the networks that connect land, people, and technology.",
    internal: true,
    url: "/",
    connections: ["second_cutting", "ag_lab", "joynet", "design", "media", "data", "software"]
  },
  {
    id: "second_cutting",
    label: "Second Cutting",
    type: "branch",
    description: "Second Cutting is a podcast and documentary project about land, animals, people, and the systems that connect them.",
    internal: true,
    url: "/nodes/second-cutting/",
    connections: ["mimicorp", "glc", "media", "data"]
  },
  {
    id: "ag_lab",
    label: "Ag Lab",
    type: "branch",
    description: "Ag Lab is an experimental space for observing and testing agricultural systems.",
    internal: true,
    url: "/nodes/ag-lab/",
    connections: ["mimicorp", "data", "software", "gp_supply", "shady_pines"]
  },
  {
    id: "joynet",
    label: "JoyNet",
    type: "branch",
    description: "JoyNet explores the philosophical and ethical frameworks that underlie systems of belief, community, and responsibility.",
    internal: true,
    url: "/nodes/joynet/",
    connections: ["mimicorp", "design", "media", "software", "teche_lake_outfitters"]
  },
  {
    id: "glc",
    label: "GLC",
    type: "stem",
    description: "Gonsoulin Land and Cattle is a grass fed cattle ranch in South Louisiana and a real world environment where many Mimicorp ideas begin.",
    internal: false,
    url: "https://example.com/glc",
    connections: ["second_cutting", "media", "design"]
  },
  {
    id: "teche_lake_outfitters",
    label: "Teche Lake Outfitters",
    type: "stem",
    description: "Teche Lake Outfitters connects people to the landscape through guided outdoor experiences and a deeper sense of place.",
    internal: false,
    url: "https://example.com/teche-lake-outfitters",
    connections: ["joynet", "design"]
  },
  {
    id: "gp_supply",
    label: "GP Supply",
    type: "stem",
    description: "GP Supply and Lumber is a rural hardware and building supply store representing the practical layer of rural infrastructure.",
    internal: false,
    url: "https://example.com/gp-supply",
    connections: ["ag_lab", "software"]
  },
  {
    id: "shady_pines",
    label: "Shady Pines",
    type: "stem",
    description: "Shady Pines is a working landscape and creative site for observation, experimentation, and retreat.",
    internal: false,
    url: "https://example.com/shady-pines",
    connections: ["ag_lab", "data"]
  },
  {
    id: "design",
    label: "Design",
    type: "fruit",
    description: "Design is where ideas become visible and complex systems communicate clearly.",
    internal: true,
    url: "/nodes/design/",
    connections: ["mimicorp", "joynet", "glc", "teche_lake_outfitters"]
  },
  {
    id: "media",
    label: "Media",
    type: "fruit",
    description: "Media production is one of the primary ways Mimicorp documents the systems it studies.",
    internal: true,
    url: "/nodes/media/",
    connections: ["mimicorp", "second_cutting", "joynet", "glc"]
  },
  {
    id: "data",
    label: "Data",
    type: "fruit",
    description: "Data projects gather and organize information about land and ecological systems to reveal patterns otherwise hard to see.",
    internal: true,
    url: "/nodes/data/",
    connections: ["mimicorp", "second_cutting", "ag_lab", "shady_pines"]
  },
  {
    id: "software",
    label: "Software",
    type: "fruit",
    description: "Software tools support the infrastructure behind Mimicorp projects through dashboards, data pipelines, media systems, and custom applications.",
    internal: true,
    url: "/nodes/software/",
    connections: ["mimicorp", "ag_lab", "joynet", "gp_supply"]
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
const nodeUrl = document.getElementById("node-url");
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
const drawerTitle = document.getElementById("drawer-title");
const drawerDescription = document.getElementById("drawer-description");
const drawerType = document.getElementById("drawer-type");
const drawerRoute = document.getElementById("drawer-route");
const drawerOpenProject = document.getElementById("drawer-open-project");
const drawerInspectConnections = document.getElementById("drawer-inspect-connections");

statusNodeCount.textContent = String(nodes.length);
statusLinkCount.textContent = String(links.length);

let selectedNodeId = "mimicorp";
let simulation;
let nodeSelection;
let linkSelection;
let labelSelection;

function getConnectedSet(nodeId) {
  const node = nodeLookup.get(nodeId);
  return new Set([nodeId, ...(node ? node.connections : [])]);
}

function renderPlaceholder(node) {
  placeholderTitle.textContent = node.label;
  placeholderDescription.textContent = node.internal
    ? "This project has an internal page ready. Open it to move deeper into the Mimicorp system."
    : "This node routes to an external destination. Open it to visit the real world counterpart.";
  placeholderPath.textContent = node.url;
  placeholderPanel.hidden = false;
}

function renderSidebar(node) {
  sidebarTitle.textContent = node.label;
  sidebarType.textContent = node.type;
  sidebarType.dataset.type = node.type;
  sidebarRoute.textContent = node.internal ? "internal" : "external";
  sidebarDescription.textContent = node.description;
  nodeUrl.textContent = node.url;

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
  renderDrawer(node);
}

function renderDrawer(node) {
  drawerTitle.textContent = node.label;
  drawerDescription.textContent = node.description;
  drawerType.textContent = node.type;
  drawerType.dataset.type = node.type;
  drawerRoute.textContent = node.internal ? "internal" : "external";
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
  const node = nodeLookup.get(nodeId);
  if (!node) {
    terminalResponse.textContent = 'Node "' + nodeId + '" not found.';
    return;
  }

  selectedNodeId = nodeId;
  renderSidebar(node);
  updateGraphState();
  terminalResponse.textContent = node.label + " selected. " + node.description;
}

function activateNode(node) {
  if (node.internal) {
    window.location.href = node.url;
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
    ? "Connected to: " + names + "."
    : "No connections available for this node.";
}

function centerOnNode(nodeId) {
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
  return nodes.find((node) => {
    const normalizedLabel = normalizeNodeQuery(node.label);
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
    terminalResponse.textContent = nodes.map((node) => node.label).join(" | ");
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
    .force("link", d3.forceLink(links).id((d) => d.id).distance(130).strength(0.45))
    .force("charge", d3.forceManyBody().strength(-340))
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

drawerOpenProject.addEventListener("click", () => {
  activateNode(nodeLookup.get(selectedNodeId));
});

viewConnectionsButton.addEventListener("click", () => {
  focusConnections();
});

drawerInspectConnections.addEventListener("click", () => {
  focusConnections();
});

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  parseCommand(terminalInput.value);
  terminalInput.value = "";
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    parseCommand(button.getAttribute("data-command"));
  });
});

window.addEventListener("resize", buildGraph);

buildGraph();
selectNode(selectedNodeId);
