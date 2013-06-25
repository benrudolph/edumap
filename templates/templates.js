window.JST = {}

window.JST['panel/panel'] = _.template([
  '<div class="inner-panel">',
    '<div class="header row"><%= name %></div>',
    '<div class="demographic-info row">',
      '<div class="flag-container"><img src="img/<%= name %>.jpg" /></div>',
      '<div class="stats">',
        '<span class="stat row">Some stat</span>',
        '<span class="stat row">Some stat</span>',
        '<span class="stat row">Some stat</span>',
      '</div>',
    '</div>',
    '<div class="challenges row">',
      '<span class="challenge-header row">Main Challenges</span>',
      '<ul class="challenge-list row">',
        '<li>My first challenge</li>',
        '<li>My second challenge</li>',
        '<li>My third challenge</li>',
      '</ul>',
    '</div>',
    '<div class="numbers row"></div>',
    '<div class="chart row"></div>',
    '<div class="articles row"></div>',
  '</div>'
].join(''));

