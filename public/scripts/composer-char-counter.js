$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    let textLength = $(this).val().length;
    let counter = $(this).siblings('div').children('.counter');

    counter.val(function() {
      const output = 140 - textLength;

      output < 0 ? counter.css('color', 'red') : counter.css('color', 'black');
      
      return output;
    });

  });
});
