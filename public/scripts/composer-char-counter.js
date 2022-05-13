$(document).ready(function() {
  console.log('Server ready to dynamically generate counter');

  $("#tweet-text").on('input', function() {
    console.log(140 - $(this).val().length);
  })
})
