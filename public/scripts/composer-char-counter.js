$( document ).ready(function() {

  $( ".new-tweet form textarea" ).keyup(function() {
    const textareaVal = $( this ).val().length;
    const counterVal = 140;
    const charRemaining = counterVal - textareaVal;
    const $relevantCounter = $( this ).siblings( ".counter" );

    $relevantCounter.text(charRemaining);

    $relevantCounter.css("color", "black");
    if (charRemaining < 0) {
      $relevantCounter.css("color", "red");
    }
  });
});
