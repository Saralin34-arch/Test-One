const svg = d3.select("#nyc-map").append("svg");
const width = 800;
const height = 600;

svg.attr("width", width)
   .attr("height", height)
   .style("font-family", "Breite Grotesk, sans-serif");

// Mercator projection centered on NYC
const projection = d3.geoMercator()
  .center([-73.94, 40.70])
  .scale(40000)
  .translate([width / 2, height / 2]);

d3.csv("../data/nyc_air_quality_full_coords.csv").then(data => {
  // Clean and parse data
  data = data.filter(d => d.lat && d.lon && d["Data Value"]);
  data.forEach(d => {
    d.lat = +d.lat;
    d.lon = +d.lon;
    d.value = +d["Data Value"];
  });

  // Map lat/lon to screen coordinates
  const points = data.map(d => projection([d.lon, d.lat]));

  // Generate density contours
  const contours = d3.contourDensity()
    .x(d => d[0])
    .y(d => d[1])
    .size([width, height])
    .bandwidth(30)
    .thresholds(15)
    (points);

  // Draw contours with single color styling
  svg.append("g")
    .selectAll("path")
    .data(contours)
    .join("path")
      .attr("d", d3.geoPath())
      .attr("fill", "#e63946")
      .attr("stroke", "#000000")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.8);

  // Draw points with refined styling
  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => projection([d.lon, d.lat])[0])
      .attr("cy", d => projection([d.lon, d.lat])[1])
      .attr("r", 2)
      .attr("fill", "#000000")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .attr("opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("r", 4)
          .attr("fill", "#525252");
        
        // Add tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "#ffffff")
          .style("border", "1px solid #e5e5e5")
          .style("padding", "8px 12px")
          .style("border-radius", "0")
          .style("font-family", "Breite Grotesk, sans-serif")
          .style("font-size", "14px")
          .style("font-weight", "500")
          .style("pointer-events", "none")
          .style("z-index", "1000")
          .style("box-shadow", "none");

        tooltip.html(`
          <strong>${d["Geo Place Name"]}</strong><br/>
          NO₂ Level: ${d.value} ppb
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("r", 2)
          .attr("fill", "#000000");
        
        d3.selectAll(".tooltip").remove();
      })
      .append("title")
      .text(d => `${d["Geo Place Name"]}: ${d.value} ppb`);

  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .style("font-family", "Breite Grotesk, sans-serif")
    .style("font-size", "20px")
    .style("font-weight", "700")
    .style("fill", "#000000")
    .text("NYC Air Quality – NO₂ Density Contours");

  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 150}, 60)`);

  const legendData = [
    { color: "#e63946", label: "NO₂ Levels" }
  ];

  legend.selectAll("rect")
    .data(legendData)
    .join("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 15)
      .attr("fill", d => d.color)
      .attr("stroke", "#000000")
      .attr("stroke-width", 0.5);

  legend.selectAll("text")
    .data(legendData)
    .join("text")
      .attr("x", 30)
      .attr("y", 12)
      .style("font-family", "Breite Grotesk, sans-serif")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#000000")
      .text(d => d.label);

  // Add legend title
  legend.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .style("font-family", "Breite Grotesk, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "700")
    .style("fill", "#000000")
    .text("NO₂ Levels");

}).catch(error => {
  console.error("Error loading the data:", error);
  
  // Display error message
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .style("font-family", "Breite Grotesk, sans-serif")
    .style("font-size", "18px")
    .style("font-weight", "600")
    .style("fill", "#525252")
    .text("Data visualization will appear here");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2 + 25)
    .attr("text-anchor", "middle")
    .style("font-family", "Breite Grotesk, sans-serif")
    .style("font-size", "16px")
    .style("font-weight", "500")
    .style("fill", "#525252")
    .text("Please ensure nyc_air_quality_full_coords.csv is available");
}); 