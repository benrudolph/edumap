window.Education = {
  Models: {},
  Views: {},
  Routers: {},
  Collections: {},
  Manager: {}
}

var width = 580,
    height = 580;

var projection = d3.geo.orthographic()
    .scale(170)
    .translate([width / 2, height / 2])
    .precision(.1)
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scale.category10();

function map() {

  function my(selection) {
    selection.enter().append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", function(d, i) {
        return color(Math.floor(Math.random() * 5));
      });
  };

  return my;
}


Education.Routers.MainRouter = Backbone.Router.extend({
  initialize: function() {
    this.manager = new Education.Models.Manager();

    queue()
      .defer(d3.json, 'data/world.json')
      .defer(d3.json, 'data/fake.json')
      .await(function(error, world, countryData) {
        this.countries = world.features;
        this.countryData = countryData.countries;

        svg.selectAll(".country")
          .data(this.countries)
          .call(map())

        this.rightpanel = new Education.Views.PanelRightView({
          model: new Education.Models.Panel(this.countryData[0]),
          el: '#rightpanel'
        });

        this.leftpanel = new Education.Views.PanelLeftView({
          model: new Education.Models.Panel(this.countryData[0]),
          collection: new Education.Collections.Panel(this.countryData),
          manager: this.manager,
          el: '#leftpanel'
        });

        $(document).foundation();
      }.bind(this))

  },

  routes: {
    '': 'index'
  },

  index: function() {

  }
});


$(document).ready(function() {

  window.router = new Education.Routers.MainRouter();
  Backbone.history.start();


})


