window.Education = {
  Models: {},
  Views: {},
  Routers: {},
  Collections: {},
  Manager: {}
}



Education.Routers.MainRouter = Backbone.Router.extend({
  initialize: function() {
    window.manager = new Education.Models.Manager();

    // Change country selected
    window.manager.on('change:iso', function() {
      console.log('change:iso');
      this.leftpanel.renderIndicatorGraph();
      this.leftpanel.renderBudgetGraph();
      this.rightpanel.render();
      this.world.renderWorld();
    }.bind(this));

    // Change the indicator value
    window.manager.on('change:indicator', function() {
      console.log('change:indicator');
      this.leftpanel.renderBudgetGraph();
      this.leftpanel.renderIndicatorGraph();
    }.bind(this), this);

    queue()
      .defer(d3.json, 'data/world.json')
      .defer(d3.json, '/bootstrap')
      .await(function(error, world, bootstrap) {
        this.countries = world.features;
        this.operations = bootstrap.operations;
        this.impactIndicators = bootstrap.impact_indicators
        this.perfIndicators = bootstrap.perf_indicators


        this.world = new Education.Views.WorldView({
          collection: new Education.Collections.World(this.countries)
        });

        this.rightpanel = new Education.Views.PanelRightView({
          collection: new Education.Collections.Panel(this.operations),
          el: '#rightpanel',
        });

        this.leftpanel = new Education.Views.PanelLeftView({
          collection: new Education.Collections.Panel(this.operations),
          el: '#leftpanel',
          impactIndicators: this.impactIndicators,
          perfIndicators: this.perfIndicators
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

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
