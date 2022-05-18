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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('main').append(newTweet)
    }

  }

  // const clearTweets = function() {
  //   $('article').remove();
  // }

  const loadTweets = function() {
    $.get('/tweets/')
    .then(function(data) {
     renderTweets(data)
    })
  }

 loadTweets()

  // renderTweets(tweets);

  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post('/tweets/', data)
      //First reset textarea and counter
      .then($('textarea').val(""))
      .then($('.counter').val(140))
      //Then render the new tweet (TODO)
      // .then(clearTweets())
      // .then(loadTweets())
  }
    
  )
})