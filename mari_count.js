class bars_m {

    constructor(state, setGlobalState,grade, fill_color) {

      this.width = window.innerWidth * 0.3;
      this.height = window.innerHeight * 0.6;
      this.margins = { top: 60, bottom: 60, left: 60, right: 60 };
      this.duration = 1000;
      this.format = d3.format(",." + d3.precisionFixed(1) + "f");

    const data =  state.mari_race.filter(d => d.GRADE === grade)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.n)])
      .range([this.height - this.margins.bottom,this.margins.top]);
      
  
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.PERP_RACE))
      .range([this.margins.left, this.width])
      .paddingInner(.2);
  
    //const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(data.length)
    const xAxis = d3.axisBottom(xScale).ticks(data.length)

    var colorScale = d3.scaleOrdinal().range([ '#51d43a','#237b80','#cb1010','#eae0d6','#f7b67d','#6de7ee','#45239a']);

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

  
    this.svg = d3.select("#bars_m")
      .append("svg")
      .attr("width", 1.5*this.width)
      .attr("height", 1.5*this.height);

    // append rects
    const rect = this.svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", d => yScale(d.n))
      .attr("x", d => xScale(d.PERP_RACE) + this.margins.left)
      .attr("height", d => this.height - this.margins.top - yScale(d.n))
      .attr("width", xScale.bandwidth())
      .attr("fill", d =>  colorScale(d.n))
      .attr("opacity", "1")
      .on("mousemove", function(d){
        d3.select(this).style("transform", "scale(1.1,1.1)")
        .style("transform-origin", "50% 50%");
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html(d.n)
    })
    .on("mouseout", function(d){ 
      d3.select(this).style("transform", "scale(1,1)")
      .style("transform-origin", "100% 100%");
      tooltip.style("display", "none")})
    .on("click", d => {
      console.log(d)
      setGlobalState({ rating_selected: d })
  });

  var text = this.svg
  .selectAll("text")
  .data(data)
  .join("text")
  .attr("class", "label")
  // this allows us to position the text in the center of the bar
  .attr("x", d => xScale(d.PERP_RACE) + (xScale.bandwidth()/2))
  .attr("y", d => yScale(d.n))
  .text(d => d.n)
  .attr("dy", "1.25em")
  .attr("transform", "rotate(-90)");
  


    this.svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${2*this.margins.left}, 0)`)
      .call(yAxis);


    this.svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${this.margins.left}, ${this.height - this.margins.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

}
  
    draw(state, setGlobalState) {
  }
  }
  
  export { bars_m };
  