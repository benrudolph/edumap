function budgetGraph(config) {

    var margin = config.margin
    var width = config.width - config.margin.left - config.margin.right
    var height = config.height - config.margin.top - config.margin.bottom

    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
        .range([0, width])
        .domain([parseDate('2012'), parseDate('2016')]);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 30000000]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format('%Y'))
      .ticks(d3.time.years, 1);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var lineFn = d3.svg.line()
      .x(function(d) {
        return x(parseDate(d.year))
      })
      .y(function(d) {
        return y(+d.budget)
      })
      .interpolate('cardinal');


    function my() {

       var svg = config.selection.append('svg')
          .attr('width', this.budgetConfig.width)
          .attr('height', this.budgetConfig.height)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       svg.selectAll('.budget-line')
         .data(config.data)
         .enter().append('path')
         .style('fill', 'none')
         .style('stroke', 'black')
         .style('stroke-width', 1)
         .attr('class', 'budget-line')
         .attr('d', lineFn);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");


    }

    return my;
}
