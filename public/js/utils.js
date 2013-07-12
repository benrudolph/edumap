/*
 * Gets indicators for currently selected country
 */
Education.Utils.getIndicators = function(type) {
  var indicators = [];

  var operations = window.router.operations

  var country = _.findWhere(operations, { 'iso': window.manager.get('iso') });

  country.data.forEach(function(d) {
    if (d.indicator_type === type) {
      indicators.push(d.indicator);
    }
  })

  // Return only unique indicators and make clone
  return _.uniq(indicators, false, function(d) { return d.name })
}


