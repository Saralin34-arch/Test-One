// CO2 Emissions Bubble Map Visualization
// Based on D3 Observable Bubble Map: https://observablehq.com/@d3/bubble-map/2

// Set up the visualization
const width = 1300;
const height = 1000;

// Create SVG container
const svg = d3.select("#bubble-map-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height]);

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
  .scale(width)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Color scale for per capita emissions
const color = d3.scaleSequential(d3.interpolateReds)
  .domain([0, 100]); // Domain based on per capita emissions

// Size scale for total emissions
const size = d3.scaleSqrt()
  .domain([0, 700]) // Domain based on total emissions
  .range([4, 30]);

// Load data and create visualization
Promise.all([
  d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),
  d3.json("co2_emissions_by_state_2023_accurate.json")
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
    .attr("transform", "translate(-80, -80)")
    .selectAll("path")
    .data(states.features)
    .join("path")
    .attr("d", path)
    .attr("fill", "#e0e0e0")
    .attr("stroke", "#999")
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

  // Draw bubbles
  svg.append("g")
    .attr("transform", "translate(-80, -80)")
    .selectAll("circle")
    .data(bubbleData)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => size(d.total))
    .attr("fill", d => color(d.petroleumPercent))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .attr("opacity", 0.8)
    .on("mouseover", function(event, d) {
      d3.select(this)
        .attr("opacity", 1)
        .attr("stroke-width", 2);
      
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      
      tooltip.html(`
        <strong>${d.state}</strong><br/>
        Total: ${d.total.toFixed(1)} MMT<br/>
        Coal: ${d.coal.toFixed(1)} MMT (${d.coalPercent.toFixed(1)}%)<br/>
        Natural Gas: ${d.natural_gas.toFixed(1)} MMT (${d.naturalGasPercent.toFixed(1)}%)<br/>
        Petroleum: ${d.petroleum.toFixed(1)} MMT (${d.petroleumPercent.toFixed(1)}%)
      `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("opacity", 0.8)
        .attr("stroke-width", 1);
      
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 200}, ${height - 350})`);

  // Size legend
  const sizeLegend = legend.append("g");
  sizeLegend.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .text("Total CO2 Emissions (MMT)");

  // Add more spacing between overlapping circles
  const sizeValues = [50, 200, 350, 500, 650];
  const maxRadius = Math.max(...sizeValues.map(v => size(v)));
  const centerX = maxRadius;
  const startY = 30;
  
  sizeValues.forEach((value, i) => {
    const radius = size(value);
    const y = startY + maxRadius - radius + (i * 20); // Add extra vertical spacing
    
    sizeLegend.append("circle")
      .attr("cx", centerX)
      .attr("cy", y)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);
    
    // Position text with more spacing
    const textX = centerX + maxRadius + 35;
    const textY = y + 4;
    
    sizeLegend.append("text")
      .attr("x", textX)
      .attr("y", textY)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text(value + " MMT");
  });

  // Color legend
  const colorLegend = legend.append("g")
    .attr("transform", "translate(0, 180)");
  
  colorLegend.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .text("Petroleum % of Total");

  const colorValues = [0, 25, 50, 75, 100];
  const colorWidth = 20;
  const colorHeight = 15;
  
  colorValues.forEach((value, i) => {
    colorLegend.append("rect")
      .attr("x", 0)
      .attr("y", 15 + i * 20)
      .attr("width", colorWidth)
      .attr("height", colorHeight)
      .attr("fill", color(value));
    
    colorLegend.append("text")
      .attr("x", colorWidth + 5)
      .attr("y", 15 + i * 20 + 10)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text(value + "%");
  });

}).catch(error => {
  console.error("Error loading data:", error);
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Error loading data. Please check the console for details.");
}); 