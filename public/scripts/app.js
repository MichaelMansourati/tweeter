function loadTweets() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    type: 'GET',
    success: renderTweets
  })
}



function renderTweets(arr) {
  //debugger;
  const tweetsArray = arr;
  console.log(tweetsArray);
  $( '#tweet-zone').empty();
  tweetsArray.forEach(function (tweet) {
    const tweetElement = createTweetElement(tweet);
    $('#tweet-zone').prepend(tweetElement);
  })
  // for (tweet of tweetsArray) {
  //   $( '#tweet-zone' ).prepend(createTweetElement(tweet)[0]);

  //   console.log(createTweetElement(tweet)[0].innerHTML)

    $( '.tweet' ).hover(function() {
    $('.tweet-symbols').fadeToggle('fast');
  })
}   // loops through tweets
      // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container




function createTweetElement(tweets) {

  const tweetShape =
  `<header>
      <img src=${tweets.user.avatars.small} width='55px' height='55px' />
      <span class='username'>${tweets.user.name}</span>
      <span class='handle'>${tweets.user.handle}</span>
    </header>
    <div class="message-border">
    <p class="message">${tweets.content.text}</p>
    </div>
    <footer>
      <span>${new Date(tweets.created_at)}</span>
      <i class="tweet-symbols fa fa-flag"></i>
      <i class="tweet-symbols fa fa-retweet" aria-hidden="true"></i>
      <i class="tweet-symbols fa fa-heart" aria-hidden="true"></i>
    </footer>`;

  let $tweet = $('<article>').addClass('tweet').html(tweetShape);



  return $tweet;
}

$( document ).ready(function() {

  loadTweets()


  $( '#nav-bar .compose' ).click(function() {
    $( '.new-tweet' ).slideToggle("fast");
  })

  $( '#nav-bar .compose' ).hover(function() {
    $('.tweet-symbols').fadeToggle('fast');
  })

  // $( '#tweet-zone .tweet' ).hover(function() {
  //   console.log('hovered');
  // })



  $( '.container .new-tweet form').on("submit", function( event ) {
    event.preventDefault();

    if ($( '.container .new-tweet textarea').val().length > 140) {

      alert("write a shorter tweet");

    } else if ($( '.container .new-tweet textarea').val() === '') {

      alert("write a longer tweet");

    } else {
              //----ajax----\\
      $.ajax({
        url:'http://localhost:8080/tweets',
        type:'POST',
        data: $( 'textarea' ).serialize(),
        success: function(response) {
          loadTweets();
          $( 'textarea' ).val('');
              //----ajax----\\
        }
      })
    }
  })
});

