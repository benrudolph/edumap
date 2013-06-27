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
    '<div class="chart myrow mycontainer">Chart</div>',
    '<div class="articles myrow mycontainer">Articles</div>',
  '</div>'
].join(''));

window.JST['panel/leftpanel'] = _.template([
  '<div class="inner-panel">',
    '<div class="indicator-container myrow mycontainer">',
      '<form class="custom">',
        '<label for="indicator" class="left">Indicator</label>',
        '<select id="indicator" class="small left">',
          '<option>Primary</option>',
          '<option>Secondary</option>',
        '</select>',
      '</form>',
    '</div>',
    '<div class="budget-graph myrow mycontainer"></div>',
    '<div class="indicator-graph myrow mycontainer"></div>',
    '</div>',
  '</div>'
].join(''));

