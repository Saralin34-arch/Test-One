// Environmental Relations Map Script

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Module 4: Environmental Relations initialized');
  console.log('DOM fully loaded, starting visualizations...');
  
  // Initialize both visualizations
  initAirQualityContours();
  initEnvironmentalRelationsMap();
});

function initAirQualityContours() {
  console.log('=== Starting Air Quality Contours ===');
  
  // Debug: Check if container exists
  const container = d3.select("#air-quality-contours");
  console.log('Container element:', container.node());
  
  if (container.empty()) {
    console.error("Container #air-quality-contours not found!");
    return;
  }
  
  console.log("Container #air-quality-contours found, proceeding with visualization");
  
  // Using Helvetica font for D3 text elements
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  // Set up the map dimensions and projection
  const width = 1200, height = 1000;
  console.log('Creating SVG with dimensions:', width, 'x', height);
  
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("background", "#f8f8f8");
    
  console.log('SVG created:', svg.node());
  
  // Add immediate visual feedback
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#e0e0e0")
    .attr("stroke", "#999")
    .attr("stroke-width", 2);
    
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("font-family", fontFamily)
    .attr("font-size", "24px")
    .attr("font-weight", "600")
    .attr("fill", "#333")
    .text("Loading Air Quality Data...");
  
  const projection = d3.geoMercator()
    .center([-73.94, 40.70])
    .scale(60000)
    .translate([width / 2, height / 2]);
  const path = d3.geoPath().projection(projection);

  console.log("Setting up air quality contours map...");
  console.log("SVG dimensions:", width, "x", height);

  // Load air quality data
  console.log('Loading air quality data...');
  d3.csv("../data/nyc_air_quality_full_coords.csv").then(function(data) {
    console.log("Air quality data loaded:", data.length, "points");
    console.log("Sample data:", data.slice(0, 3));
    
    // Clear the loading message
    svg.selectAll("text").remove();
    svg.selectAll("rect").remove();
    
    // Filter and process the data - using correct column names
    const validData = data.filter(d => d.lat && d.lon && d["Data Value"]);
    console.log("Valid data points:", validData.length);
    console.log("Sample valid data:", validData.slice(0, 3));

    // Create contour data - using correct column names
    const contourData = validData.map(d => [
      projection([+d.lon, +d.lat])[0],
      projection([+d.lon, +d.lat])[1],
      +d["Data Value"]
    ]).filter(d => !isNaN(d[0]) && !isNaN(d[1]) && !isNaN(d[2]));

    console.log("Contour data points:", contourData.length);
    console.log("Sample contour data:", contourData.slice(0, 3));

    if (contourData.length === 0) {
      console.error("No valid contour data points!");
      // Create a fallback visualization
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("font-family", fontFamily)
        .attr("font-size", "18px")
        .attr("fill", "#666")
        .text("No valid air quality data found");
      return;
    }

    // Create contours
    const contours = d3.contourDensity()
      .x(d => d[0])
      .y(d => d[1])
      .weight(d => d[2])
      .size([width, height])
      .bandwidth(30)
      .thresholds(10)(contourData);

    console.log("Contours created:", contours.length);

    // Create color scale
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(contours, d => d.value)]);

    // Draw contours
    svg.append("g")
      .selectAll("path")
      .data(contours)
      .join("path")
      .attr("d", d3.geoPath())
      .attr("fill", d => colorScale(d.value))
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.7);

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", "20px")
      .attr("font-weight", "600")
      .attr("fill", "#333")
      .text("NYC Air Quality Contours");

    // Add subtitle
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", "14px")
      .attr("fill", "#666")
      .text("Air Quality Data by Neighborhood");

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, ${height - 100})`);

    legend.append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("font-family", fontFamily)
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .attr("fill", "#333")
      .text("Air Quality Index");

    const legendData = [0, 0.25, 0.5, 0.75, 1];
    legendData.forEach((value, i) => {
      legend.append("rect")
        .attr("x", i * 25)
        .attr("y", 0)
        .attr("width", 25)
        .attr("height", 15)
        .attr("fill", colorScale(value * d3.max(contours, d => d.value)));

      legend.append("text")
        .attr("x", i * 25 + 12.5)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("font-family", fontFamily)
        .attr("font-size", "10px")
        .attr("fill", "#666")
        .text(Math.round(value * 100) + "%");
    });

    console.log("Air quality contours visualization completed");

  }).catch(error => {
    console.error("Error loading air quality data:", error);
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", "16px")
      .attr("fill", "#666")
      .text("Error loading air quality data");
  });
}

function initEnvironmentalRelationsMap() {
  console.log('=== Starting Environmental Relations Map ===');
  
  // Debug: Check if container exists
  const container = d3.select("#environmental-relations-map");
  console.log('Container element:', container.node());
  
  if (container.empty()) {
    console.error("Container #environmental-relations-map not found!");
    return;
  }
  
  console.log("Container #environmental-relations-map found, proceeding with visualization");
  
  // Using Helvetica font for D3 text elements
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  // Set up the map dimensions and projection
  const width = 1200, height = 1000;
  console.log('Creating SVG with dimensions:', width, 'x', height);
  
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("background", "#f8f8f8");
    
  console.log('SVG created:', svg.node());
  
  // Add immediate visual feedback
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#e0e0e0")
    .attr("stroke", "#999")
    .attr("stroke-width", 2);
    
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("font-family", fontFamily)
    .attr("font-size", "24px")
    .attr("font-weight", "600")
    .attr("fill", "#333")
    .text("Loading Environmental Data...");
  
  const projection = d3.geoMercator()
    .center([-73.94, 40.70])
    .scale(60000)
    .translate([width / 2, height / 2]);
  const path = d3.geoPath().projection(projection);

  console.log("Setting up environmental relations map...");
  console.log("SVG dimensions:", width, "x", height);

  // Load both datasets
  Promise.all([
    d3.csv("../data/nyc_trees_sample.csv"),
    d3.csv("../data/nyc_air_quality_full_coords.csv")
  ]).then(function([treesData, airQualityData]) {
    console.log("Trees data loaded:", treesData.length, "points");
    console.log("Air quality data loaded:", airQualityData.length, "points");
    
    // Clear the loading message
    svg.selectAll("text").remove();
    svg.selectAll("rect").remove();
    
    // Process trees data
    const validTrees = treesData.filter(d => d.latitude && d.longitude && d.spc_common);
    console.log("Valid trees:", validTrees.length);

    // Process air quality data
    const validAirQuality = airQualityData.filter(d => d.lat && d.lon && d["Data Value"]);
    console.log("Valid air quality points:", validAirQuality.length);

    // Create tree circles
    const treeCircles = svg.append("g")
      .selectAll("circle")
      .data(validTrees)
      .join("circle")
      .attr("cx", d => projection([+d.longitude, +d.latitude])[0])
      .attr("cy", d => projection([+d.longitude, +d.latitude])[1])
      .attr("r", 3)
      .attr("fill", "#228B22")
      .attr("opacity", 0.6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);

    // Create air quality points
    const airQualityCircles = svg.append("g")
      .selectAll("circle")
      .data(validAirQuality)
      .join("circle")
      .attr("cx", d => projection([+d.lon, +d.lat])[0])
      .attr("cy", d => projection([+d.lon, +d.lat])[1])
      .attr("r", 4)
      .attr("fill", d => d3.scaleSequential(d3.interpolateReds)(d["Data Value"] / 30))
      .attr("opacity", 0.8)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", "20px")
      .attr("font-weight", "600")
      .attr("fill", "#333")
      .text("Environmental Relations Map");

    // Add subtitle
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", "14px")
      .attr("fill", "#666")
      .text("Trees (Green) and Air Quality (Red) Data");

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 200}, ${height - 120})`);

    // Tree legend
    legend.append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 3)
      .attr("fill", "#228B22")
      .attr("opacity", 0.6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 15)
      .attr("font-family", fontFamily)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text("Urban Trees");

    // Air quality legend
    legend.append("circle")
      .attr("cx", 10)
      .attr("cy", 35)
      .attr("r", 4)
      .attr("fill", "#ff0000")
      .attr("opacity", 0.8)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 40)
      .attr("font-family", fontFamily)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text("Air Quality Measurements");

    // Add data summary
    const summary = svg.append("g")
      .attr("transform", `translate(20, ${height - 80})`);

    summary.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("font-family", fontFamily)
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .attr("fill", "#333")
      .text("Data Summary:");

    summary.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("font-family", fontFamily)
      .attr("font-size", "11px")
      .attr("fill", "#666")
      .text(`Trees: ${validTrees.length} points`);

    summary.append("text")
      .attr("x", 0)
      .attr("y", 35)
      .attr("font-family", fontFamily)
      .attr("font-size", "11px")
      .attr("fill", "#666")
      .text(`Air Quality: ${validAirQuality.length} measurements`);

    console.log("Environmental relations map completed");

  }).catch(error => {
    console.error("Error loading environmental data:", error);
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", "16px")
      .attr("fill", "#666")
      .text("Error loading environmental data");
  });
} 