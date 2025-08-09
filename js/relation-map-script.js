// Environmental Network Map Visualization
// Simplified version using available data

// Using Helvetica font for D3 text elements
const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// Initialize the visualization
function initRelationMap() {
  // Get container dimensions
  const container = document.getElementById('relation-map');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  // Scale factor based on container size
  const scaleFactor = Math.min(containerWidth, containerHeight) / 600;
  
  // Set up the SVG
  const svg = d3.select("#relation-map")
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .style("font-family", fontFamily);

  // Create a simple network visualization
  const nodes = [
    { id: "Trees", x: 200 * scaleFactor, y: 150 * scaleFactor, size: 20 * scaleFactor, color: "#2d5a27", label: "Urban Trees" },
    { id: "Air Quality", x: 400 * scaleFactor, y: 200 * scaleFactor, size: 25 * scaleFactor, color: "#e63946", label: "Air Quality" },
    { id: "Complaints", x: 300 * scaleFactor, y: 350 * scaleFactor, size: 15 * scaleFactor, color: "#1f4e79", label: "Complaints" },
    { id: "Monitoring", x: 500 * scaleFactor, y: 300 * scaleFactor, size: 18 * scaleFactor, color: "#457b9d", label: "Monitoring" },
    { id: "Community", x: 150 * scaleFactor, y: 400 * scaleFactor, size: 22 * scaleFactor, color: "#f4a261", label: "Community" },
    { id: "Environment", x: 450 * scaleFactor, y: 450 * scaleFactor, size: 20 * scaleFactor, color: "#2a9d8f", label: "Environment" }
  ];

  const links = [
    { source: "Trees", target: "Air Quality", strength: 0.8 },
    { source: "Air Quality", target: "Complaints", strength: 0.6 },
    { source: "Trees", target: "Community", strength: 0.7 },
    { source: "Air Quality", target: "Monitoring", strength: 0.9 },
    { source: "Complaints", target: "Community", strength: 0.5 },
    { source: "Monitoring", target: "Environment", strength: 0.8 },
    { source: "Community", target: "Environment", strength: 0.6 },
    { source: "Trees", target: "Environment", strength: 0.7 }
  ];

  // Create simulation
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(200 * scaleFactor)) // Increased distance for longer lines
    .force("charge", d3.forceManyBody().strength(-300 * scaleFactor))
    .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2)) // Center the entire network
    .force("x", d3.forceX(containerWidth / 2).strength(0.1)) // Add horizontal centering force
    .force("y", d3.forceY(containerHeight / 2).strength(0.1)); // Add vertical centering force

  // Create links
  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", d => d.strength * 3 * scaleFactor);

  // Create nodes
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", d => d.size * 0.4) // Make circles even smaller (40% of original size)
    .attr("fill", d => d.color)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2 * scaleFactor)
    .call(drag(simulation));

  // Add labels
  const label = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text(d => d.label)
    .attr("text-anchor", "start") // Align text to start (left side)
    .attr("dx", d => d.size * 0.4 + 8 * scaleFactor) // Position text to the right of the circle
    .attr("dy", "0.35em")
    .style("font-size", `${12 * scaleFactor}px`)
    .style("font-weight", "600")
    .style("fill", "#333") // Change text color to dark gray
    .style("pointer-events", "none");

  // Update positions on simulation tick
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });

  // Drag functionality
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  // Add title
  svg.append("text")
    .attr("x", containerWidth / 2)
    .attr("y", 30 * scaleFactor)
    .attr("text-anchor", "middle")
    .style("font-size", `${18 * scaleFactor}px`)
    .style("font-weight", "600")
    .text("Environmental Network Relations");

  // Add subtitle
  svg.append("text")
    .attr("x", containerWidth / 2)
    .attr("y", 50 * scaleFactor)
    .attr("text-anchor", "middle")
    .style("font-size", `${14 * scaleFactor}px`)
    .style("fill", "#666")
    .text("Interactive network showing relationships between urban environmental elements");

  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${containerWidth - 200 * scaleFactor}, ${containerHeight - 150 * scaleFactor})`);

  legend.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .style("font-size", `${14 * scaleFactor}px`)
    .style("font-weight", "600")
    .text("Environmental Elements");

  const legendData = [
    { color: "#2d5a27", label: "Urban Trees" },
    { color: "#e63946", label: "Air Quality" },
    { color: "#1f4e79", label: "Complaints" },
    { color: "#457b9d", label: "Monitoring" },
    { color: "#f4a261", label: "Community" },
    { color: "#2a9d8f", label: "Environment" }
  ];

  legend.selectAll("circle")
    .data(legendData)
    .join("circle")
    .attr("cx", 10)
    .attr("cy", (d, i) => i * 20 * scaleFactor)
    .attr("r", 6 * scaleFactor)
    .attr("fill", d => d.color)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  legend.selectAll("text")
    .data(legendData)
    .join("text")
    .attr("x", 25 * scaleFactor)
    .attr("y", (d, i) => i * 20 * scaleFactor + 4)
    .style("font-size", `${12 * scaleFactor}px`)
    .text(d => d.label);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRelationMap);
} else {
  initRelationMap();
} 