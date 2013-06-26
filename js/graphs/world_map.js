function map(config) {
  var width = config.width || 580,
      height = config.height || 580;

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

