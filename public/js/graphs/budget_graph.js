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

      var totalBudget = +(d.olbudget || '0').replace(/,/g,'') + (+(d.aolbudget || '0').replace(/,/g,''));
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

    var areaOL = d3.svg.area()
      .x(function(d) { return x(parseDate(d.year)); })
      .y0(function(d) { return y(0); })
      .y1(function(d) { return y(+(d.olbudget || '0').replace(/,/g,'')); })

    var areaAOL = d3.svg.area()
      .x(function(d) { return x(parseDate(d.year)); })
      .y0(function(d) { return y(+(d.olbudget || '0').replace(/,/g,'')); })
      .y1(function(d) { return y(getTotalBudget(d)); })

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
        var maxBudget = d3.max(d, function(p) { return getTotalBudget(p) });
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

      // Need to figure out join!
      var lines = svg.selectAll('.budget-line')
        .data(data)

      lines.sort(function(a,b) {
        if (a.iso !== window.manager.get('iso')) return -1
        else return 1
      })

      lines.enter().append('path')

      lines
        .attr('class', function(d) {
          var clazz = 'budget-line';
          if (window.manager.get('iso') === d.iso)
            clazz += ' selected';
          return clazz;
        })
        .attr('original-title', function(d) {
          return d.iso
        })
        .on('click', function(d) {
          window.manager.set('iso', d.iso);
        })
        .on('mouseover', function(d) {
          d3.select('.aolbudget-area-' + d.iso).classed('hidden', false);
          d3.select('.olbudget-area-' + d.iso).classed('hidden', false);
        })
        .on('mouseout', function(d) {
          d3.select('.aolbudget-area-' + d.iso).classed('hidden', true);
          d3.select('.olbudget-area-' + d.iso).classed('hidden', true);
        })

      lines
        .transition()
        .duration(500)
          .attr('d', lineFn);

      lines.exit().remove();

      $('.budget-line').tipsy({
        html: true,
        gravity: 's'
      })

      var areasOL = svg.selectAll('.olbudget-area')
          .data(data)

      areasOL.enter().append("path")

      areasOL
          .attr('class', function(d) { return 'olbudget-area hidden olbudget-area-' + d.iso })
          .attr('d', areaOL)

      areasOL.exit().remove();

      var areasAOL = svg.selectAll('.aolbudget-area')
          .data(data)

      areasAOL.enter().append("path")

      areasAOL
          .attr('class', function(d) { return 'aolbudget-area hidden aolbudget-area-' + d.iso })
          .attr('d', areaAOL)

      areasAOL.exit().remove();

      var points = svg.selectAll('.budget-point')
        .data(_.flatten(data))

      points.enter().append('circle');

      points
        .attr('class', function(d) {
          var clazz = 'budget-point budget-point-' + d.iso;
          if (window.manager.get('iso') === d.iso)
            clazz += ' selected';
          return clazz;
        })
        .attr('r', 2)
        .attr('cx', function(d) { return x(parseDate(d.year)) })
        .attr('cy', function(d) { return y(getTotalBudget(d)) })

      points.exit().remove();


    }

    my.data = function(_data) {
      if (!arguments) return data;
      data = _data;
      return my;
    }

    return my;
}
