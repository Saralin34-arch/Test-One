// Import Breite Grotesk font for D3 text elements
const fontFamily = "'Breite Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Set up the map dimensions and projection
const width = 960, height = 800;
const svg = d3.select("#relation-map");
const projection = d3.geoMercator()
  .center([-73.94, 40.70])
  .scale(60000)
  .translate([width / 2, height / 2]);
const path = d3.geoPath().projection(projection);

// Sample air quality data (NO₂ levels by neighborhood)
const airData = [
  {"Geo Place Name": "Bay Ridge and Dyker Heights (CD10)", "Average_NO2": 18.4826550213},
  {"Geo Place Name": "Bayside - Little Neck", "Average_NO2": 15.1905142685},
  {"Geo Place Name": "Bayside Little Neck-Fresh Meadows", "Average_NO2": 15.6108484213},
  {"Geo Place Name": "Bayside and Little Neck (CD11)", "Average_NO2": 17.680154603},
  {"Geo Place Name": "Bedford Stuyvesant (CD3)", "Average_NO2": 19.1329976977},
  {"Geo Place Name": "Bedford Stuyvesant - Crown Heights", "Average_NO2": 26.5715444782},
  {"Geo Place Name": "Belmont and East Tremont (CD6)", "Average_NO2": 20.3671684901},
  {"Geo Place Name": "Bensonhurst (CD11)", "Average_NO2": 17.0314930692},
  {"Geo Place Name": "Bensonhurst - Bay Ridge", "Average_NO2": 16.1966225205},
  {"Geo Place Name": "Borough Park", "Average_NO2": 16.7045221445}
];

// Sample complaints data (indoor air quality complaints)
const complaints = [
  {"Latitude": 40.707786, "Longitude": -73.756125},
  {"Latitude": 40.80921, "Longitude": -73.944449},
  {"Latitude": 40.728603, "Longitude": -73.978651},
  {"Latitude": 40.728603, "Longitude": -73.978651},
  {"Latitude": 40.80086, "Longitude": -73.954233},
  {"Latitude": 40.776544, "Longitude": -73.954662},
  {"Latitude": 40.764429, "Longitude": -73.988275},
  {"Latitude": 40.730823, "Longitude": -74.005192},
  {"Latitude": 40.638941, "Longitude": -73.943002},
  {"Latitude": 40.755111, "Longitude": -73.881506},
  {"Latitude": 40.74035, "Longitude": -74.003962},
  {"Latitude": 40.691515, "Longitude": -73.937194},
  {"Latitude": 40.833672, "Longitude": -73.94011},
  {"Latitude": 40.64242, "Longitude": -73.979356},
  {"Latitude": 40.714812, "Longitude": -74.016153},
  {"Latitude": 40.609933, "Longitude": -73.910126},
  {"Latitude": 40.720275, "Longitude": -74.003135},
  {"Latitude": 40.865043, "Longitude": -73.90626},
  {"Latitude": 40.720275, "Longitude": -74.003135},
  {"Latitude": 40.701152, "Longitude": -73.909401},
  {"Latitude": 40.760912, "Longitude": -73.807477},
  {"Latitude": 40.760682, "Longitude": -73.936046},
  {"Latitude": 40.615636, "Longitude": -73.974286},
  {"Latitude": 40.889691, "Longitude": -73.858535},
  {"Latitude": 40.818483, "Longitude": -73.953289},
  {"Latitude": 40.738323, "Longitude": -73.868372},
  {"Latitude": 40.781925, "Longitude": -73.955915},
  {"Latitude": 40.747698, "Longitude": -74.002122},
  {"Latitude": 40.802156, "Longitude": -73.957032},
  {"Latitude": 40.690954, "Longitude": -73.959541},
  {"Latitude": 40.784795, "Longitude": -73.948369},
  {"Latitude": 40.717101, "Longitude": -73.838494},
  {"Latitude": 40.676428, "Longitude": -73.880434},
  {"Latitude": 40.766382, "Longitude": -73.909666},
  {"Latitude": 40.700676, "Longitude": -73.919272},
  {"Latitude": 40.822238, "Longitude": -73.940471},
  {"Latitude": 40.644554, "Longitude": -73.901654},
  {"Latitude": 40.840746, "Longitude": -73.942854},
  {"Latitude": 40.656896, "Longitude": -73.917927},
  {"Latitude": 40.592717, "Longitude": -73.994253},
  {"Latitude": 40.737168, "Longitude": -73.858999},
  {"Latitude": 40.711307, "Longitude": -73.983761},
  {"Latitude": 40.800453, "Longitude": -73.969823},
  {"Latitude": 40.762382, "Longitude": -73.98977},
  {"Latitude": 40.768519, "Longitude": -73.987162},
  {"Latitude": 40.803027, "Longitude": -73.965827},
  {"Latitude": 40.773195, "Longitude": -73.946028},
  {"Latitude": 40.724827, "Longitude": -73.980601},
  {"Latitude": 40.623297, "Longitude": -74.000195},
  {"Latitude": 40.775496, "Longitude": -73.962306}
];

// Tree data will be loaded from CSV
let trees = [];

// Load tree data first, then map data
Promise.all([
  d3.csv("data/nyc_trees_sample.csv"),
  d3.json("https://raw.githubusercontent.com/dwillis/nyc-maps/master/community-districts.geojson")
]).then(([treeData, geoData]) => {
  trees = treeData;
  // Create color scale for NO₂ levels
  const no2Map = new Map(airData.map(d => [d["Geo Place Name"], +d.Average_NO2]));
  const color = d3.scaleSequential(d3.interpolateReds)
    .domain([0, d3.max(airData, d => d.Average_NO2)]);

  // Draw base map (community district boundaries)
  svg.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => color(no2Map.get(d.properties.ntaname) || 0))
    .attr("stroke", "#555")
    .attr("stroke-width", 0.2)
    .append("title")
    .text(d => d.properties.ntaname + " - NO₂: " + (no2Map.get(d.properties.ntaname) || "N/A"));

  // Add tree dots (green)
  svg.selectAll("circle.tree")
    .data(trees)
    .enter()
    .append("circle")
    .attr("class", "tree")
    .attr("cx", d => projection([d.longitude, d.latitude])[0])
    .attr("cy", d => projection([d.longitude, d.latitude])[1])
    .attr("r", 3)
    .attr("fill", "#2d5a27")
    .attr("opacity", 0.7)
    .append("title")
    .text(d => d.spc_common);

  // Add complaint dots (blue)
  svg.selectAll("circle.complaint")
    .data(complaints)
    .enter()
    .append("circle")
    .attr("class", "complaint")
    .attr("cx", d => projection([d.Longitude, d.Latitude])[0])
    .attr("cy", d => projection([d.Longitude, d.Latitude])[1])
    .attr("r", 2)
    .attr("fill", "#1f4e79")
    .attr("opacity", 0.5)
    .append("title")
    .text("Indoor Air Quality Complaint");

  // Add legend
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(20, 20)");

  // Legend title
  legend.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("font-family", fontFamily)
    .attr("font-size", "14px")
    .attr("font-weight", "700")
    .attr("fill", "#000")
    .text("NYC Environmental Relations");

  // Air quality legend
  legend.append("text")
    .attr("x", 0)
    .attr("y", 25)
    .attr("font-family", fontFamily)
    .attr("font-size", "12px")
    .attr("font-weight", "600")
    .attr("fill", "#000")
    .text("Air Quality (NO₂)");

  // Color scale legend
  const legendWidth = 200;
  const legendHeight = 20;
  const legendScale = d3.scaleLinear()
    .domain([0, d3.max(airData, d => d.Average_NO2)])
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .tickSize(6)
    .tickFormat(d3.format(".1f"));

  legend.append("g")
    .attr("transform", `translate(0, 45)`)
    .call(legendAxis);

  // Color gradient for legend
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "legendGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#fee5d9");

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#a50f15");

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 30)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legendGradient)");

  // Point symbols legend
  legend.append("text")
    .attr("x", 0)
    .attr("y", 85)
    .attr("font-family", fontFamily)
    .attr("font-size", "12px")
    .attr("font-weight", "600")
    .attr("fill", "#000")
    .text("Data Points:");

  // Tree legend
  legend.append("circle")
    .attr("cx", 10)
    .attr("cy", 100)
    .attr("r", 3)
    .attr("fill", "#2d5a27")
    .attr("opacity", 0.7);

  legend.append("text")
    .attr("x", 20)
    .attr("y", 105)
    .attr("font-family", fontFamily)
    .attr("font-size", "11px")
    .attr("font-weight", "500")
    .attr("fill", "#000")
    .text("Street Trees");

  // Complaint legend
  legend.append("circle")
    .attr("cx", 10)
    .attr("cy", 115)
    .attr("r", 2)
    .attr("fill", "#1f4e79")
    .attr("opacity", 0.5);

  legend.append("text")
    .attr("x", 20)
    .attr("y", 120)
    .attr("font-family", fontFamily)
    .attr("font-size", "11px")
    .attr("font-weight", "500")
    .attr("fill", "#000")
    .text("Air Quality Complaints");

}).catch(error => {
  console.error("Error loading map data:", error);
  // Fallback: create a simple placeholder
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("font-family", fontFamily)
    .attr("font-size", "16px")
    .attr("font-weight", "600")
    .attr("fill", "#666")
    .text("Map data loading...");
}); 