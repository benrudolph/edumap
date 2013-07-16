function map(config) {
  var width = config.width || 580,
      height = config.height || 580;

  var rotation = [98.7, -40.4]

  var projection = d3.geo.orthographic()
      .scale(170)
      .translate([width / 2, height / 2])
      .precision(.1)
      .clipAngle(90);

  projection.rotate(rotation);

  var path = d3.geo.path()
      .projection(projection);

  var selection = config.selection;

  var data = config.data;

  var svg = selection.append("svg")
      .attr("width", width)
      .attr("height", height)
      .on("mousedown", mousedown)
      .on("mousemove", mousemove)
      .on("mouseup", mouseup)
      .on("mouseleave", mouseleave)

  var m0;

  var world;
  var down;

  function my() {
    console.log('callin')

    world = svg.selectAll('.country')
      .data(data)

    world.enter().append("path")

    world
      .attr("class", function(d) {
        return 'country' + (window.manager.get('iso') === d.id ? ' selected' : '');
      })
      .attr("d", path)
      .on('click', function(d) {
        window.manager.set('iso', d.id);
      })
  };

  function mousedown() {
    down = true
    m0 = [d3.event.pageX, d3.event.pageY];
    d3.event.preventDefault();
  }

  function mousemove() {
    if (down) {
      var m1 = [d3.event.pageX, d3.event.pageY];

      var deltax = -((m0[0] - m1[0]) / 2)
      var deltay = ((m0[1] - m1[1]) / 2)
      var current = projection.rotate();
      var n = [current[0] + deltax, current[1] + deltay]

      projection.rotate(n);
      my();

      // Set previous position
      m0 = m1;
    }
  }

  function mouseup() {
    down = false;
  }

  function mouseleave() {
    down = false;
  }

  my.data = function(_data) {
    if (!arguments) return data;
    data = _data;
    return my;
  }

  return my;
}

