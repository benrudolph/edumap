Education.Models.Panel = Backbone.Model.extend({});

Education.Collections.Panel = Backbone.Collection.extend({
  model: Education.Models.Panel
});

Education.Views.PanelLeftView = Backbone.View.extend({

  template: window.JST['panel/leftpanel'],

  events: {
    'change #indicator': 'onIndicatorChange'
  },

  initialize: function(options) {

    this.budgetConfig = {
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      width: 270,
      height: 150
    };

    this.indicatorConfig = {
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      width: 270,
      height: 150
    };
    this.render();
  },

  onIndicatorChange: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.manager.set('indicator', this.$el.find('#indicator').val().toLowerCase());
  },

  extractSeries: function(model, type) {
    var series = _.find(model.get('indicators'), function(indicator) {
      return indicator.name === window.manager.get('indicator');
    })[type];


    //Add country iso to data
    series.countryISO = model.get('iso');
    return series;
  },

  render: function() {
    this.$el.html(this.template());


    this.initBudgetGraph();
    this.renderBudgetGraph();

    this.initIndicatorGraph();
    this.renderIndicatorGraph();


    return this;
  },

  initBudgetGraph: function() {
    this.budgetConfig.selection = d3.select(this.el).select('.budget-graph')
    this.budgetGraph = budgetGraph(this.budgetConfig);

  },

  renderBudgetGraph: function() {
    this.budgetGraph.data(this.collection.map(function(d) {
      return this.extractSeries(d, 'budgetseries');
    }.bind(this)))
    this.budgetGraph();
  },

  initIndicatorGraph: function() {
    //Render Indicator graph
    this.indicatorConfig.selection = d3.select(this.el).select('.indicator-graph');
    this.indicatorGraph = indicatorGraph(this.indicatorConfig);
  },

  renderIndicatorGraph: function() {
    // Extracts indicator series that matches selected country
    this.indicatorGraph.data( _.find(this.collection.map(function(d) {
      return this.extractSeries(d, 'indicatorseries');
    }.bind(this)), function(series) { return series.countryISO === window.manager.get('countryISO') }));

    this.indicatorGraph();
  }

})

Education.Views.PanelRightView = Backbone.View.extend({

  template: window.JST['panel/rightpanel'],

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.collection.findWhere({
      iso: window.manager.get('countryISO')
    }).toJSON()));
    return this;
  }
})

