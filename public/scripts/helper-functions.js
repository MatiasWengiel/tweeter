
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
    for (let tweet = numberOfTweetsAlreadyRendered; tweet < tweets.length; tweet++) { //Only renders new tweets
      const newTweet = createTweetElement(tweets[tweet]);
      $('.tweet-list').append(newTweet);
      numberOfTweetsAlreadyRendered++;
    }

  };