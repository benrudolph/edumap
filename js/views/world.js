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

  render: function() {
    this.worldMap = map(this.mapConfig);
    this.worldMap.data(this.collection.toJSON());
    this.worldMap();

    return this;

  }

});
