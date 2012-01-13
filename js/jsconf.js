var run = false;
function show(link) {
  return (function () {
    run = true;
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
  
  map = new OpenLayers.Map("map");
  map.addLayer(new OpenLayers.Layer.OSM());
  var ll = new OpenLayers.LonLat(-111.9258629,33.5083749).transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    map.getProjectionObject() // to Spherical Mercator Projection
  );
  var markers = new OpenLayers.Layer.Markers( "Markers" );
   map.addLayer(markers);
   markers.addMarker(new OpenLayers.Marker(ll));
  
  map.setCenter(ll, 15);
  

});

