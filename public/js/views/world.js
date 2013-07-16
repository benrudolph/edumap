Education.Models.Country = Backbone.Model.extend({});

Education.Collections.World = Backbone.Collection.extend({
  model: Education.Models.Country
});

Education.Views.WorldView = Backbone.View.extend({

  el: '#map',

  initialize: function(options) {
    this.mapConfig = {
      width: 580,
      height: 580,
      selection: d3.select(this.el)
    }
    this.render();

  },

  renderWorld: function() {
    var datum;

    var selected = d3.select('.country.' + window.manager.get('iso'));

    if (!selected.empty()) {
      datum = selected.datum();
      console.log(datum.properties);
    }
    this.worldMap.rotation([-datum.properties.lng, -datum.properties.lat]);
    this.worldMap();
  },

  render: function() {
    this.worldMap = map(this.mapConfig);
    this.worldMap.data(this.collection.toJSON());
    this.worldMap();

    return this;

  }

});
