var run = false;
function show(link) {
  return (function () {
    run = true;
    $$(".pane").set("styles", {display: "none"});    
    $(link).setStyle("display", "block")
    $$(".selected").set("class", "");
    $("nav-"+link).set("class", "selected");
    if (link === 'venue' && !hasmapped) {
      hasmapped = true;
      try {
        var ll = new L.LatLng(33.5083749, -111.9258629);
        map = new L.Map("map", {
          center: ll,
          zoom: 15,
          layers: [
            new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
              maxZoom: 18,
              subdomains: ["otile1", "otile2", "otile3", "otile4"],
              attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
            })
          ]
        });
        map.addLayer(new L.Marker(ll));
      } catch (e) {}
    }
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
router.configure({
  notfound: show("home")
})




var playing = false;
if (Modernizr.audio) {
  var audio = new Audio();
  audio.src = "sounds/"+ (Modernizr.audio.ogg ? 'moo1.ogg' :
                          Modernizr.audio.mp3 ? 'moo1.mp3' :
                                    'moo1.m4a' );
}

window.addEvent('domready', function(){
  if (!run) { 
    show("home")();
  }
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



var hasmapped = false;