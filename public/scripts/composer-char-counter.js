$(document).ready( () => {
  console.log('I am ready!');
  
  let maxCharLength = 140;
  $('#tweet-input').keyup(function() { // WORD COUNTER
    let charLength = $(this).val().length;
    let newLength = maxCharLength - charLength; // subtract current length from max

    if (newLength < 0) { // Red highlight if below 0
      $('#word-counter').addClass('redCounter');
    } else {
      $('#word-counter').removeClass('redCounter');
    }

    $(this).parent().children('#tweet-footer').children('#word-counter').text(newLength); // update word counter (traversing practice)
  });
});