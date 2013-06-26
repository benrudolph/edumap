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
    window.manager.on('change:countryISO', function() {
      console.log('change:countryISO');
      this.leftpanel.renderIndicatorGraph();
    }.bind(this));

    // Change the indicator value
    window.manager.on('change:indicator', function() {
      console.log('change:indicator');
      this.leftpanel.renderBudgetGraph();
      this.leftpanel.renderIndicatorGraph();
    }.bind(this), this);

    queue()
      .defer(d3.json, 'data/world.json')
      .defer(d3.json, 'data/fake.json')
      .await(function(error, world, countryData) {
        this.countries = world.features;
        this.countryData = countryData.countries;

        /*svg.selectAll(".country")
          .data(this.countries)
          .call(map())*/

        this.rightpanel = new Education.Views.PanelRightView({
          model: new Education.Models.Panel(this.countryData[0]),
          el: '#rightpanel'
        });

        this.leftpanel = new Education.Views.PanelLeftView({
          model: new Education.Models.Panel(this.countryData[0]),
          collection: new Education.Collections.Panel(this.countryData),
          el: '#leftpanel'
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


