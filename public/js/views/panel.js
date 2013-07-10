Education.Models.Panel = Backbone.Model.extend({});

Education.Collections.Panel = Backbone.Collection.extend({
  model: Education.Models.Panel
});

Education.Views.PanelLeftView = Backbone.View.extend({

  template: window.JST['panel/leftpanel'],

  events: {
    'change #indicator': 'onIndicatorChange',
    'change .indicator-type input': 'onIndicatorTypeChange'
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

    this.impactIndicators = options.impactIndicators
    this.perfIndicators = options.perfIndicators
    this.render();
  },

  onIndicatorTypeChange: function(e) {
    e.preventDefault();
    e.stopPropagation();

    window.manager.set('indicatorType', $(e.target).attr('data-type'));
  },

  onIndicatorChange: function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.manager.set('indicator', this.$el.find('#indicator').val().toLowerCase());
  },


  render: function() {
    var indicators = window.manager.get('indicatorType') === 'impact_indicators' ? this.impactIndicators : this.perfIndicators

    this.$el.html(this.template({
      indicators: indicators
    }));



    this.initBudgetGraph();
    this.renderBudgetGraph();

    this.initIndicatorGraph();
    this.renderIndicatorGraph();


    return this;
  },

  // Just rerenders the indicator select
  renderIndicators: function(indicators) {
    this.$el.find('form.indicators').html(window.JST['panel/indicators']({ indicators: indicators }));
  },

  initBudgetGraph: function() {
    this.budgetConfig.selection = d3.select(this.el).select('.budget-graph')
    this.budgetGraph = budgetGraph(this.budgetConfig);

  },

  renderBudgetGraph: function() {
    var countryData = [];
    countryData = this.collection.map(function(d) {
      data = d.get('data')
      data = _.filter(data, function(d) {
        return d.indicator_type === window.manager.get('indicatorType') &&
            d.ppg.name === window.manager.get('ppg') &&
            d.indicator.name === window.manager.get('indicator')
      })
      data.iso = d.get('iso')
      return data
    }.bind(this))
    console.log(countryData)

    this.budgetGraph.data(countryData)
    this.budgetGraph();
  },

  initIndicatorGraph: function() {
    //Render Indicator graph
    this.indicatorConfig.selection = d3.select(this.el).select('.indicator-graph');
    this.indicatorGraph = indicatorGraph(this.indicatorConfig);
  },

  renderIndicatorGraph: function() {
    var c = this.collection.filter(function (d) {
      return d.get('iso') === window.manager.get('iso')
    }).map(function(d) { return d.toJSON() })

    var types = ['oltarget', 'optarget']

    var countryData = types.map(function(d) {
      var datum = c.clone();
      datum.forEach(function(p) { p.type = d; });
      return datum;
    })

    this.indicatorGraph.data(countryData);

    this.indicatorGraph();
  }

})

Education.Views.PanelRightView = Backbone.View.extend({

  template: window.JST['panel/rightpanel'],

  initialize: function(options) {
    this.render();
  },

  render: function() {
    //this.$el.html(this.template(this.collection.findWhere({
    //  iso: window.manager.get('countryISO')
    //}).toJSON()));
    return this;
  }
})

