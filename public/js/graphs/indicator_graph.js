function indicatorGraph(config) {

    var margin = config.margin
    var width = config.width - config.margin.left - config.margin.right
    var height = config.height - config.margin.top - config.margin.bottom

    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
        .range([0, width])
        .domain([parseDate('2012'), parseDate('2015')]);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 100]);

    var data = config.data;

    var selection = config.selection;

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
        console.log(+d[d.type])
        return y(+(d[d.type].replace(/,/g,'')));
      })
      .interpolate('cardinal');

    var svg = selection.append('svg')
      .attr('width', config.width)
      .attr('height', config.height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        .text("Percentage");

    function my() {

      var lines = svg.selectAll('.indicator-line')
        .data(data)

      lines.enter().append('path')

      lines
        .attr('class', function(d) { return 'indicator-line ' + d[0].type })

      lines
        .transition()
        .duration(500)
          .attr('d', lineFn);

      lines.exit().remove();
    }

    my.data = function(_data) {
      if (!arguments) return data;
      data = _data;
      return my;
    }

    return my;

}
