window.JST = {}

window.JST['panel/rightpanel'] = _.template([
  '<div class="inner-panel">',
    '<div class="header myrow mycontainer">',
      '<div class="f32 left"><div class="flag us" /></div>',
      '<div class="country-name left"><%= name.toTitleCase() %></div>',
    '</div>',
    '<div class="stats myrow mycontainer">',
        '<span class="stat stat-population myrow">Some stat</span>',
        '<span class="stat stat-budget myrow">Some stat</span>',
        '<span class="stat stat-partners myrow">Some stat</span>',
    '</div>',
    '<div class="challenge-container myrow mycontainer">',
      '<span class="challenge-header myrow left">Main Challenges</span>',
      '<div class="challenge-list myrow left">',
        '<span class="myrow challenge">My first challenge</span>',
        '<span class="myrow challenge">My second challenge</span>',
        '<span class="myrow challenge">My third challenge</span>',
      '</div>',
    '</div>',
    '<div class="infographic myrow mycontainer">Infographic</div>',
    '<div class="articles myrow mycontainer">Articles</div>',
  '</div>'
].join(''));

window.JST['panel/ppgs'] = _.template([
  '<label for="ppg" class="left">PPGs</label>',
  '<select id="ppg">',
    '<% for (var i = 0; i < ppgs.length; i++) { %>',
    '<option><%= ppgs[i].name %></option>',
    '<% } %>',
  '</select>',
].join(''));

window.JST['panel/indicators'] = _.template([
  '<label for="indicator" class="left">Indicator</label>',
  '<select id="indicator">',
    '<% for (var i = 0; i < indicators.length; i++) { %>',
    '<option><%= indicators[i].name %></option>',
    '<% } %>',
  '</select>',
].join(''));

window.JST['panel/leftpanel'] = _.template([
  '<div class="inner-panel">',
    '<div class="indicator-container myrow mycontainer">',
      '<div class="indicator-type switch">',
        '<input data-type="<%= Education.Constants.INDICATOR.PERF %>" id="perf-indicators" name="switch-x" type="radio" <% if (window.manager.get("indicatorType") === window.Education.Constants.INDICATOR.PERF) { %> checked<% } %>>',
        '<label for="perf-indicator" >Performance</label>',
        '<input data-type="<%= Education.Constants.INDICATOR.IMPACT %>" id="impact-indicators" name="switch-x" type="radio" <% if (window.manager.get("indicatorType") === window.Education.Constants.INDICATOR.IMPACT) { %> checked<% } %>>',
        '<label for="impact-indicator" >Impact</label>',
        '<span></span>',
      '</div>',
      '<form class="indicators custom">',
        '<%= window.JST["panel/indicators"]({ indicators: indicators }) %>',
      '</form>',
    '</div>',
    '<div class="budget-graph myrow mycontainer"></div>',
    '<div class="indicator-graph myrow mycontainer"></div>',
    '</div>',
  '</div>'
].join(''));

