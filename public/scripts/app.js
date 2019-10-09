/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(document).ready( () => {
//   $('mybutton').click( ()=>{
//     const $text = $('my-input').val();
//     const $listItem =$('<li>').text(text);
//     $('#list-container').prepend($listItem);
//     $('#my-input').val('').focus();
//   });
// });

$(document).ready( () => { 



const loadTweets = () => { // grabs tweet feed via GET
  $.ajax({
    method: 'GET',
    url: '/tweets',
    data: {
      format: 'json'
    }
  })
  .done(function(tweets){
    renderTweets(tweets);
    console.log('SUCCESS', tweets);
  })
};

loadTweets();

const createTweetElement = (data) => { // uses article template to create new tweet with same style
  return `<article class='past-tweet'>
  <header>
    <div class='holder'>
      <img class='avatar' src=${data.user.avatars}>
      <p class='name'>${data.user.name}</p>
    </div>
    <label class='handle'>${data.user.handle}</label>
  </header>

  <p class='tweet-body'>${data.content.text}</p>

  <footer>
    <time class='timeago' datetime=${new Date(data.created_at)}></time>
    <label>Like ♥</label>
  </footer>
</article>`
}

const renderTweets = (tweets) => { // renders 1 or more tweet objects into tweets on the webpage
  for(const tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('.tweet-container').prepend($tweet);
  }
}


$('#new-tweet').submit(function(event) { // actions when form is submitted
  
  event.preventDefault(); // removing default page redirection behaviour

  let $input = $('#tweet-input').val();
  if ($input.length === 0) { // no characters ERROR message
    alert('\n ERROR: \n\n No characters in input');

  } else if ($input.length > 140) { // too many characters ERROR message
    alert('\n ERROR: \n\n Over maximum character limit');

  } else { // AJAX POST request on the new tweet form
    $.ajax({
      method: 'POST',
      url: '/tweets', 
      data: $(this).serialize(),
    })
    .done(function(data) { // 
      $('.tweet-container').empty();
      loadTweets(data);
    });
  }
});





});