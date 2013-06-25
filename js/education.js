window.Education = {
  Models: {},
  Views: {},
  Routers: {},
  Collections: {}
}

var width = 960,
    height = 580;

var projection = d3.geo.kavrayskiy7()
    .scale(170)
    .translate([width / 2, height / 2])
    .precision(.1);

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

d3.json("world3.json", function(error, world) {
  var countries = world.features

  svg.selectAll(".country")
    .data(countries)
    .call(map())

});

$(document).ready(function() {

  var country = new Education.Models.Panel({ name: 'United States' });

  var view = new Education.Views.PanelView({ model: country });

  view.render();

})


