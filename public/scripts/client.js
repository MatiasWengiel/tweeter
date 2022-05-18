/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready( function () {

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
            <img src="${avatar}">
            <p>${userName}</p>
          </section>
          <p>${handle}</p>
        </header>

        <p class="tweet-text">${tweetText}</p>

        <footer>
          <ins datetime="...">${timeAgo}</ins>
          <menu>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </menu>
        </footer>
      </article>
    `
    return $tweetArticle;
  }

  let numberOfTweetsAlreadyRendered = 0; 

  const renderTweets = function(tweets) {
    for (let tweet = numberOfTweetsAlreadyRendered; tweet < tweets.length; tweet++) {
      const newTweet = createTweetElement(tweets[tweet]);
      $('.new-tweet').after(newTweet)
      numberOfTweetsAlreadyRendered++
    }

  }

  const loadTweets = function() {
    $.get('/tweets/')
    .then(function(data) {
     renderTweets(data)
     console.log(numberOfTweets)
    })
  }

 loadTweets()

  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    //Tweet validation
    if (!$('textarea').val()) {
      alert('It seems you forgot to write your tweet!');
      return
    }

    if($('.counter').val() < 0) {
      alert('Whoops! Your tweet is too long. The maximum length is 140 characters.')
      return
    }

    //Post tweet after validation
    $.post('/tweets/', data)
      //First reset textarea and counter
      .then($('textarea').val(""))
      .then($('.counter').val(140))
      //Then render the new tweet and any other tweets that had not been rendered yet
      .then(loadTweets())
  }
    
  )
})