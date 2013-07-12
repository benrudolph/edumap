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
    window.manager.set('indicator', this.$el.find('#indicator').val());
  },


  render: function() {
    var indicators = Education.Utils.getIndicators(window.manager.get('indicatorType'));

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
  renderIndicators: function() {
    var indicators = Education.Utils.getIndicators(window.manager.get('indicatorType'));
    var indicator = (_.findWhere(indicators, { name: window.manager.get('indicator') }) || indicators[0]).name;
    console.log(_.findWhere(indicators, { name: window.manager.get('indicator') }))
    console.log(indicator)
    window.manager.set('indicator', indicator);
    this.$el.find('form.indicators').html(window.JST['panel/indicators']({ indicators: indicators }));
  },

  initBudgetGraph: function() {
    this.budgetConfig.selection = d3.select(this.el).select('.budget-graph')
    this.budgetGraph = budgetGraph(this.budgetConfig);

  },

  renderBudgetGraph: function() {
    var countryData = [];
    console.log('Budget Graph Rendering');
    countryData = this.collection.map(function(d) {
      data = d.get('data')
      data = _.filter(data, function(d) {
        return d.indicator_type === window.manager.get('indicatorType') &&
            d.ppg.name === window.manager.get('ppg') &&
            d.indicator.name === window.manager.get('indicator')
      })
      data = data.map(function(p) { p.iso = d.get('iso'); return p })
      data.iso = d.get('iso')
      return data
    }.bind(this))
    countryData = countryData.filter(function(d) { return d.length !== 0 })

    this.budgetGraph.data(countryData)
    this.budgetGraph();
  },

  initIndicatorGraph: function() {
    //Render Indicator graph
    this.indicatorConfig.selection = d3.select(this.el).select('.indicator-graph');
    this.indicatorGraph = indicatorGraph(this.indicatorConfig);
  },

  renderIndicatorGraph: function() {
    console.log('Indicator Graph Rendering');
    var country = this.collection.findWhere({
      'iso': window.manager.get('iso')
    })

    var filteredData = country.get('data').filter(function(d) {
      return d.indicator.name === window.manager.get('indicator') &&
          d.ppg.name === window.manager.get('ppg')
    })


    var types = ['oltarget', 'optarget']

    var countryData = types.map(function(d) {
      var datum = filteredData.clone();
      datum.forEach(function(p) { p.type = d; });
      return datum;
    }).filter(function(d) {
      return d.length > 0;
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

