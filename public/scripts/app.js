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
  let $form = $('#new-tweet');
  
  $form.submit( (event) => {
  event.preventDefault();
  console.log('serialized: ', $(this).serialize() );

  console.log('Button clicked, performing AJAX call...');
  $.ajax( { method: 'POST' })
  .then( (data) => {
    data: $(this).serialize();
  })
});

createTweetElement = (data) => { // uses article template to create new tweet with same style
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
    <label>Created at: ${data.created_at}</label>
    <label>Like ♥</label>
  </footer>
</article>`
}

const renderTweets = (tweets) => { // renders 1 or more tweet objects into tweets on the webpage
  for(const tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('.tweet-container').append($tweet);
  }
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);


});