$(document).ready(function() {
  $(document).foundation();

  $('#country-name').autocomplete({
    lookup: [
    { value: 'abc' },
    { value: 'def' },
    { value: 'adf' }
    ]
  })
})
