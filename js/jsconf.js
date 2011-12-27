var mySound = new buzz.sound( "sounds/moo", {
    formats: [  "mp3", "ogg", "acc" ]
});

playing = false;
$(function () {
  $(".horns").hover(function () {
    console.log("firing");
    if (!playing) {
      playing = true
      mySound.play();
      setTimeout(function () { playing = false; }, 2000);
    }
  });
})
