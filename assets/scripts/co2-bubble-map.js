// CO2 Emissions Bubble Map Visualization
// Based on D3 Observable Bubble Map: https://observablehq.com/@d3/bubble-map/2

// Initialize the visualization when DOM is loaded
function initCO2BubbleMap() {
  // Get container dimensions
  const container = d3.select("#co2-map");
  if (!container.node()) {
    console.error("Container #co2-map not found");
    return;
  }
  
  const containerWidth = container.node().getBoundingClientRect().width || 800;
  const containerHeight = 450;

  // Set up the visualization with responsive dimensions
  const width = Math.min(containerWidth, 1200);
  const height = containerHeight;

  // Create SVG container
  const svg = d3.select("#co2-map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("max-width", "100%")
    .style("height", "auto");

  // Create tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "rgba(0, 0, 0, 0.8)")
    .style("color", "white")
    .style("padding", "8px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Create projection and path generator
  const projection = d3.geoAlbersUsa()
    .scale(width * 0.8)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  // Color scale using NYC Historic Districts palette
  const color = d3.scaleSequential()
    .domain([0, 100]) // Domain based on petroleum percentage
    .interpolator(d3.interpolateHcl("#4ECDC4", "#FF6B6B")); // Manhattan Teal to Brooklyn Red

  // Size scale for total emissions
  const size = d3.scaleSqrt()
    .domain([0, 700]) // Domain based on total emissions
    .range([3, 25]);

  // Load data and create visualization
  Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),
    d3.json("../assets/data/co2_emissions_by_state_2023_accurate.json")
  ]).then(([us, emissionsData]) => {
    
    // Create a map of state names to data
    const stateDataMap = new Map();
    
    emissionsData.forEach(d => {
      stateDataMap.set(d.state, {
        total: d.total,
        coal: d.coal,
        natural_gas: d.natural_gas,
        petroleum: d.petroleum,
        // Calculate percentage breakdowns
        coalPercent: (d.coal / d.total) * 100,
        naturalGasPercent: (d.natural_gas / d.total) * 100,
        petroleumPercent: (d.petroleum / d.total) * 100
      });
    });

    // Convert TopoJSON to GeoJSON
    const states = topojson.feature(us, us.objects.states);

    // Draw state boundaries
    svg.append("g")
      .selectAll("path")
      .data(states.features)
      .join("path")
      .attr("d", path)
      .attr("fill", "#F8F8F8") // Using our background-secondary color
      .attr("stroke", "#E5E5E5") // Using our border-subtle color
      .attr("stroke-width", 0.5);

    // Create bubble data with state centroids
    const bubbleData = [];
    states.features.forEach(state => {
      const stateName = state.properties.name;
      const data = stateDataMap.get(stateName);
      if (data) {
        const centroid = path.centroid(state);
        if (centroid[0] && centroid[1]) { // Check if centroid is valid
          bubbleData.push({
            state: stateName,
            x: centroid[0],
            y: centroid[1],
            total: data.total,
            coal: data.coal,
            natural_gas: data.natural_gas,
            petroleum: data.petroleum,
            coalPercent: data.coalPercent,
            naturalGasPercent: data.naturalGasPercent,
            petroleumPercent: data.petroleumPercent
          });
        }
      }
    });

    // Add bubbles
    svg.append("g")
      .selectAll("circle")
      .data(bubbleData)
      .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => size(d.total))
      .attr("fill", d => color(d.petroleumPercent))
      .attr("stroke", "#FFFFFF") // Using our primary-white color
      .attr("stroke-width", 1)
      .attr("opacity", 0.7)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("opacity", 1)
          .attr("stroke-width", 2);
        
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        
        tooltip.html(`
          <strong>${d.state}</strong><br/>
          Total: ${d.total.toLocaleString()} MMT CO₂<br/>
          Petroleum: ${d.petroleumPercent.toFixed(1)}%<br/>
          Natural Gas: ${d.naturalGasPercent.toFixed(1)}%<br/>
          Coal: ${d.coalPercent.toFixed(1)}%
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("opacity", 0.7)
          .attr("stroke-width", 1);
        
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -80)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("CO₂ Emissions by State (2023)");

    // Add subtitle
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#666666") // Using our text-muted color
      .text("Bubble size = Total emissions, Color = Petroleum percentage");

    // Add legend (scaled down)
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, ${height - 120})`);

    // Size legend
    legend.append("text")
      .attr("x", -20)
      .attr("y", -20)
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text("Total Emissions (MMT CO₂)");

    const sizeLegend = legend.append("g")
      .attr("transform", "translate(0, 8)");

    [50, 200, 400, 600].forEach((value, i) => {
      sizeLegend.append("circle")
        .attr("cx", i * 40-20)
        .attr("cy", 0)
        .attr("r", size(value) * 0.7)
        .attr("fill", "none")
        .attr("stroke", "#333333") // Using our text-secondary color
        .attr("stroke-width", 0.5);

      sizeLegend.append("text")
        .attr("x", i * 40-20)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "8px")
        .text(value);
    });

    // Color legend
    legend.append("text")
      .attr("x", -20)
      .attr("y", 60)
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text("Petroleum Percentage");

    const colorLegend = legend.append("g")
      .attr("transform", "translate(0, 50)");

    [0, 25, 50, 75, 100].forEach((value, i) => {
      colorLegend.append("rect")
        .attr("x", i * 18-20)
        .attr("y", 30)
        .attr("width", 18)
        .attr("height", 12)
        .attr("fill", color(value));

      colorLegend.append("text")
        .attr("x", i * 18 -5)
        .attr("y", 55)
        .attr("text-anchor", "middle")
        .style("font-size", "8px")
        .text(value + "%");
    });

  }).catch(error => {
    console.error("Error loading data:", error);
    // Show error message in container
    d3.select("#co2-map")
      .append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .style("height", "100%")
      .style("background", "#f8f9fa")
      .style("border", "2px dashed #dee2e6")
      .style("border-radius", "8px")
      .style("color", "#6c757d")
      .style("font-family", "Helvetica Neue, sans-serif")
      .style("text-align", "center")
      .style("padding", "20px")
      .html(`
        <div>
          <h4 style="margin: 0 0 10px 0; color: #495057;">CO₂ Emissions Bubble Map</h4>
          <p style="margin: 0; font-size: 14px;">
            Interactive bubble map showing CO₂ emissions by state.<br/>
            Data loading error. Please refresh the page.
          </p>
        </div>
      `);
  });
}

// Helper function for size scale
function sizeScale(value) {
  return Math.sqrt(value) * 2;
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCO2BubbleMap);
} else {
  initCO2BubbleMap();
} 