window.Education = {
  Models: {},
  Views: {},
  Routers: {},
  Collections: {},
  Manager: {},
  Constants: {
    INDICATOR: {
      IMPACT: 'ImpactIndicator',
      PERF: 'PerfIndicator'
    }

  },
  Utils: {}
}



Education.Routers.MainRouter = Backbone.Router.extend({
  initialize: function() {
    window.manager = new Education.Models.Manager();

    // Change indicator Type
    window.manager.on('change:indicatorType', function() {
      // Change to first indicator in list
      var indicators = window.manager.get('indicatorType') === Education.Constants.INDICATOR.IMPACT ? this.impactIndicators : this.perfIndicators
      window.manager.set('indicator', indicators[0]);
      this.leftpanel.renderIndicators(indicators);

    }.bind(this))

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
        this.impactIndicators = Education.Utils.getIndicators(Education.Constants.INDICATOR.IMPACT);
        this.perfIndicators = Education.Utils.getIndicators(Education.Constants.INDICATOR.PERF);

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

Array.prototype.clone = function() {
	return this.slice(0);
};
