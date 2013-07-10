function budgetGraph(config) {

    var margin = config.margin
    var width = config.width - config.margin.left - config.margin.right
    var height = config.height - config.margin.top - config.margin.bottom

    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
        .range([0, width])
        .domain([parseDate('2012'), parseDate('2015')]);

    var y = d3.scale.linear()
        .range([height, 0])

    var data = config.data;

    var selection = config.selection;

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format('%Y'))
      .ticks(d3.time.years, 1);

    var yAxis = d3.svg.axis()
      .orient("left");

    var getTotalBudget = function(d) {
      var totalBudget = +d.olbudget.replace(/,/g,'') + (+d.aolbudget.replace(/,/g,''));
      return totalBudget;
    }

    var lineFn = d3.svg.line()
      .x(function(d) {
        return x(parseDate(d.year))
      })
      .y(function(d) {
        return y(getTotalBudget(d))
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


    function my() {

      y.domain([0, d3.max(data, function(d) {
        // d is array of data points
        // p is each country datum
        var maxBudget = d3.max(d, function(p) { if (!p) console.log(d); return getTotalBudget(p) });
        console.log(maxBudget)
        return maxBudget;
      })])

      yAxis.scale(y)
      // Redraw y Axis with new scale

      svg.select('g.y.axis').remove()
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");

      var lines = svg.selectAll('.budget-line')
        .data(data)

      lines.enter().append('path')

      lines
        .attr('class', function(d) {
          var clazz = 'budget-line';
          if (window.manager.get('iso') === d.iso)
            clazz += ' selected';
          return clazz;
        })
        .on('click', function(d) {
          window.manager.set('iso', d.iso);
        })

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
