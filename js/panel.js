Education.Models.Panel = Backbone.Model.extend({});

Education.Collections.Panel = Backbone.Collection.extend({
  model: Education.Models.Panel
});

Education.Views.PanelLeftView = Backbone.View.extend({

  template: window.JST['panel/leftpanel'],

  initialize: function(options) {
    this.budgetConfig = {
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      width: 270,
      height: 150
    };
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.budgetConfig.selection = d3.select(this.el).select('.budget-graph')
    this.budgetConfig.data = this.collection.map(function(d) { return d.get('indicators')[0].series })

    this.budgetGraph = budgetGraph(this.budgetConfig);
    this.budgetGraph();

    return this;
  }
})

Education.Views.PanelRightView = Backbone.View.extend({

  template: window.JST['panel/rightpanel'],

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
})

