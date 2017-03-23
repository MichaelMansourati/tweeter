
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


function loadTweets() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    type: 'GET',
    success: renderTweets
  })
}



function renderTweets(arr) {
  //debugger;
  $( '#tweet-zone').empty();
  for (tweet of arr) {
    $( '#tweet-zone' ).prepend(createTweetElement(tweet)[0]);

    console.log(createTweetElement(tweet)[0].innerHTML)
  }
    $( '.tweet' ).hover(function() {
    $('.tweet-symbols').fadeToggle('fast');
  })
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
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

