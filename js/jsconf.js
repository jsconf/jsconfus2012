function show(link) {
  return (function () {
    $$(".pane").set("styles", {display: "none"});    
    $(link).setStyle("display", "block")
    $$(".selected").set("class", "");
    $("nav-"+link).set("class", "selected");
  });
}

var routes = {
  '/': show("home"),
  '/schedule': show("schedule"),
  '/venue': show("venue"),
  '/speakers': show("speakers"),
  '/sponsors': show("sponsors"),
  '/about': show("about")
};

var router = Router(routes);
router.init();




var playing = false;
if (Modernizr.audio) {
  var audio = new Audio();
  audio.src = "sounds/"+ (Modernizr.audio.ogg ? 'moo1.ogg' :
                          Modernizr.audio.mp3 ? 'moo1.mp3' :
                                    'moo1.m4a' );
}

window.addEvent('domready', function(){
  if (audio) {
    document.id('nav-moo').addEvent('mouseover', function (e) {
      if (!playing) {
        playing = true
        audio.play();
        setTimeout(function() {
          playing = false;
        }, 2000);
      }
    });
  }
  document.id("moo-link").addEvent('click', function (e) { e.stop(); })
});

