$(document).ready(function() {
  console.log('Server ready to dynamically generate counter');

  $("#tweet-text").on('input', function() {
    let textLength = $(this).val().length;
    let counter = $(this).siblings('div').children('.counter');

    counter.val(function () {
      const output = 140 - textLength;

      if (output < 0) {
        counter.css('color', 'red')
      } else { //Needed to turn color back to black if user deletes extra characters
        counter.css('color', 'black')
      }
      return output;
    }) 
  })
})
