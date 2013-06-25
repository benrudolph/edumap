Education.Models.Panel = Backbone.Model.extend({});

Education.Collections.Panel = Backbone.Collection.extend({
  model: Education.Models.Panel
});

Education.Views.PanelLeftView = Backbone.View.extend({

  template: window.JST['panel/leftpanel'],

  initialize: function(options) {
    this.render();
  },

  budgetGraph: function() {

    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    var width = 270 - margin.right - margin.left;
    var height = 150 - margin.top - margin.bottom;

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
        .range([0, width])
        .domain([parseDate('2012'), parseDate('2016')]);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 30000000]);

    var lineFn = d3.svg.line()
      .x(function(d) {
        return x(parseDate(d.year))
      })
      .y(function(d) {
        return y(+d.budget)
      })
      .interpolate('cardinal');

    function my(selection) {
      selection.enter().append('path')
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .attr('class', 'budget-line')
        .attr('d', lineFn);

    }

    return my;
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    if (!this.svg) {
      this.svg = d3.select(this.el).select('.budget-graph').append("svg")
        .attr("width", 270)
        .attr("height", 150)
    }

    this.svg.selectAll('.budget-line')
      .data(this.collection.map(function(d) { return d.get('indicators')[0].series }))
      .call(this.budgetGraph())

    return this;
  }
})

Education.Views.PanelRightView = Backbone.View.extend({

  template: window.JST['panel/rightpanel'],

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
})

