Education.Models.Panel = Backbone.Model.extend({});

Education.Collections.Panel = Backbone.Collection.extend({
  model: Education.Models.Api
});

Education.Views.PanelView = Backbone.View.extend({

  el: '#panel',

  template: window.JST['panel/panel'],

  initialize: function(options) {

  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
})

