/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $('button.newTweet').click(function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus()

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

  $(window).off('scroll', function() {
    $('.scroll-to-top').hide();
  })

  const escapeUserInputText = function(text) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const userName = tweet.user.name;
    const avatar = tweet.user.avatars;
    const handle = tweet.user.handle;
    const tweetText = tweet.content.text;
    const tweetTime = tweet.created_at;
    const timeAgo = timeago.format(tweetTime);

    const $tweetArticle =  `
      <article class="tweet">
        <header>
          <section class="img-username">
            <img src="${escapeUserInputText(avatar)}">
            <p>${escapeUserInputText(userName)}</p>
          </section>
          <p>${escapeUserInputText(handle)}</p>
        </header>

        <p class="tweet-content">${escapeUserInputText(tweetText)}</p>

        <footer>
          <ins datetime="...">${timeAgo}</ins>
          <menu>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </menu>
        </footer>
      </article>
    `;
    return $tweetArticle;
  };

  let numberOfTweetsAlreadyRendered = 0;

  const renderTweets = function(tweets) {
    for (let tweet = numberOfTweetsAlreadyRendered; tweet < tweets.length; tweet++) {
      const newTweet = createTweetElement(tweets[tweet]);
      $('.new-tweet').after(newTweet);
      numberOfTweetsAlreadyRendered++;
    }

  };

  const loadTweets = function() {
    $.get('/tweets/')
      .then(function(tweetsData) {
        renderTweets(tweetsData);
      });
  };

  loadTweets();
 

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