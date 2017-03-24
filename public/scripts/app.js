

function loadTweets() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    type: 'GET',
    success: renderTweets
  })
}



function renderTweets(arr) {
  const tweetsArray = arr;
  console.log(tweetsArray);
  $( '#tweet-zone').empty();
  tweetsArray.forEach(function (tweet) {
    const tweetElement = createTweetElement(tweet);
    $('#tweet-zone').prepend(tweetElement);
  })


  //the fun stuff

  $( '.tweet' ).hover(function() {
    $(this).find('.tweet-symbols').fadeToggle('fast');
  });

  let hearts = 0;
  $( '.fa-heart').click(function() {
    hearts++;
    $(this).closest( 'footer' ).find( '.hearts' ).html(hearts);
  });

  let retweets = 0;
  $( '.fa-retweet').click(function() {
    retweets++;
    $(this).closest( 'footer' ).find( '.retweets' ).html(retweets);
  });

  //end of the fun stuff

}




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
      <span class="tweet-date">${new Date(tweets.created_at)}</span>
      <i class="tweet-symbols fa fa-flag"></i>
      <i class="tweet-symbols fa fa-retweet" aria-hidden="true" >
      <span class="retweets"></span></i>
      <i class="tweet-symbols fa fa-heart" aria-hidden="true" >
      <span class="hearts"></span></i>
    </footer>`;

  let $tweet = $('<article>').addClass('tweet').html(tweetShape);

  return $tweet;
}

//////ON///////////
//////DOCUMENT/////
//////READY////////


$( document ).ready(function() {

  $( '#nav-bar .compose' ).click(function() {
    $( '.new-tweet' ).slideToggle("fast");
    $( '.new-tweet textarea').focus();
  })

  loadTweets()


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

