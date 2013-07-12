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
      this.leftpanel.renderIndicators();

    }.bind(this))

    // Change country selected
    window.manager.on('change:iso', function() {
      console.log('change:iso ' + window.manager.get('iso'));
      this.leftpanel.renderIndicatorGraph();
      this.leftpanel.renderBudgetGraph();
      this.leftpanel.renderIndicators();
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

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

Array.prototype.clone = function() {
	return this.slice(0);
};
