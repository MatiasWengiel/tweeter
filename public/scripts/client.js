/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $('button.newTweet').click(function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus()
    
    if ($('.error-bar').css('display') !== 'none') {
      $('.error-bar').slideUp()
    }

  })


  $(window).scroll(function() {
    if ($(window).scrollTop() !== 0) {
      $('.scroll-to-top').show()
    } else {
      $('.scroll-to-top').hide()
    }
  })

  $('.scroll-to-top').click(function() {
    $(window).scrollTop(0)
    $('.new-tweet').show();
    $('#tweet-text').focus();
  })

  const loadTweets = function() {
    $.get('/tweets/')
      .then(function(tweetsData) {
        renderTweets(tweetsData); //From helper-functions
      });
  };

  loadTweets(); //Initial loading of tweets
 

  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    //Clears any existing error bars upon submission of the form
    $('.error-bar').slideUp();

    //Tweet validation
    if (!$('#tweet-text').val()) {
      $(".empty-tweet").slideDown("slow");
      return;
    }

    if ($('.counter').val() < 0) {
      $('.too-many-chars').slideDown('slow');
      return;
    }
    
    //Post tweet after validation
    $.post('/tweets/', data)

      .then(function() {
        //First reset textarea and counter
        $('textarea').val("");
        $('.counter').val(140);
        //Then render the new tweet and any other tweets that had not been rendered yet
        loadTweets();
      });
  });
});