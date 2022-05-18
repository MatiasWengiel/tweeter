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
          <ins datetime="...">${tweetTime}</ins>
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

  const tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1652722226829
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1652808626829
    }
  ]

  renderTweets(tweets);
  
  $('form').submit(function(event) {
    event.preventDefault();
    alert('Ha! Stopped you from submitting')
  }
    
  )
})