const margin = {top: 40, right: 40, bottom: 60, left: 80},
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Add chart title
svg.append("text")
  .attr("x", width / 2)
  .attr("y", -10)
  .attr("text-anchor", "middle")
  .style("font-family", "Inter, sans-serif")
  .style("font-size", "16px")
  .style("font-weight", "500")
  .style("fill", "#000000")
  .text("Temperature Over Time");

d3.csv("../data/geodata.csv").then(data => {
  const parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

  data.forEach(d => {
    d.time = parseTime(d.timestamp);
    d.temp = +d.S_TMP;
  });

  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.time))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.temp) - 1, d3.max(data, d => d.temp) + 1])
    .range([height, 0]);

  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x)
      .tickFormat(d3.timeFormat("%b %d"))
      .tickSize(5)
      .tickPadding(8))
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "12px")
    .style("color", "#525252");

  // Add Y axis
  svg.append("g")
    .call(d3.axisLeft(y)
      .tickSize(5)
      .tickPadding(8))
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "12px")
    .style("color", "#525252");

  // Add axis labels
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "14px")
    .style("font-weight", "500")
    .style("fill", "#000000")
    .text("Temperature (°C)");

  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
    .style("text-anchor", "middle")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "14px")
    .style("font-weight", "500")
    .style("fill", "#000000")
    .text("Date");

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#000000")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(d => x(d.time))
      .y(d => y(d.temp))
    );

  // Add the dots
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.time))
    .attr("cy", d => y(d.temp))
    .attr("r", 3)
    .attr("fill", "#000000")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 1)
    .style("cursor", "pointer")
    .on("mouseover", function(event, d) {
      d3.select(this)
        .attr("r", 5)
        .attr("fill", "#525252");
      
      // Add tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#ffffff")
        .style("border", "1px solid #e5e5e5")
        .style("padding", "8px 12px")
        .style("border-radius", "0")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "1000")
        .style("box-shadow", "none");

      tooltip.html(`
        <strong>${d3.timeFormat("%B %d, %Y %H:%M")(d.time)}</strong><br/>
        Temperature: ${d.temp}°C
      `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("r", 3)
        .attr("fill", "#000000");
      
      d3.selectAll(".tooltip").remove();
    })
    .append("title")
    .text(d => `${d3.timeFormat("%B %d, %Y %H:%M")(d.time)} — ${d.temp}°C`);

}).catch(error => {
  console.error("Error loading the data:", error);
  
  // Display error message
  d3.select("#chart")
    .append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("height", "100%")
    .style("font-family", "Inter, sans-serif")
    .style("color", "#525252")
    .html(`
      <div style="text-align: center;">
        <p style="margin: 0; font-size: 16px;">Data visualization will appear here</p>
        <p style="margin: 8px 0 0 0; font-size: 14px;">Please ensure geodata.csv is available</p>
      </div>
    `);
}); 