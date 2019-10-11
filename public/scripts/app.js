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
  })
};

loadTweets();

const escape =  function(str) { // creates text node to prevent malicious attacks
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (data) => { // uses article template to create new tweet with same style
  return `<article class='past-tweet'>
  <header>
    <div class='holder'>
      <img class='avatar' src=${data.user.avatars}>
      <p class='name'>${data.user.name}</p>
    </div>
    <label class='handle'>${data.user.handle}</label>
  </header>

  <p class='tweet-body'>${escape(data.content.text)}</p>

  <footer>
    <time class='timeago' datetime=${new Date(data.created_at).toISOString()}></time>
    <label>🇨🇦♻️❤️</label>
  </footer>
</article>`
}

const renderTweets = (tweets) => { // renders 1 or more tweet objects into tweets on the webpage
  for(const tweetData of tweets) {
    let $tweet = createTweetElement(tweetData);
    $('.tweet-container').prepend($tweet);
  }
  $(function() {
    // Initialize timeago on all the <time> elements with the timeago class
    $("time.timeago").timeago();
});
}

$('#new-tweet').submit(function(event) { // actions when form is submitted
  
  event.preventDefault(); // removing default page redirection behaviour

  let $input = $('#tweet-input').val();
  if ($input.length === 0) { // no characters ERROR message
    $('#tweet-error').text('Does a 0 character tweet make sense? 🤔');
    $('#tweet-error').slideDown('slow').addClass('error-display');

  } else if ($input.length > 140) { // too many characters ERROR message
    $('#tweet-error').text("Let's not be negative. Stay below 140 characters. 🤓");
    $('#tweet-error').slideDown('slow').addClass('error-display');

  } else { // AJAX POST request on the new tweet form
    $('#tweet-error').slideUp('fast').removeClass('error-display') // remove errors

    $.ajax({
      method: 'POST',
      url: '/tweets', 
      data: $(this).serialize(),
    })
    .done(function(data) { // 
      $('.tweet-container').empty();
      
      loadTweets(data);
      $('#tweet-input').val('');
      $('#word-counter').text('140');
    });
  }
});

$('#new-tweet-toggle img').click(function() { // toggles slide phase of current tweet
  $('#current-tweet').slideToggle('slow');
  $('#tweet-input').focus()
});

});