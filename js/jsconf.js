/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

var run = false;
function show(link) {
  return (function () {
    run = true;
    $(".pane").hide();
    $("#"+link).show();
    $(".selected").removeClass("selected");
    $("#nav-"+link).addClass("selected");
    if (arguments[0]) {
      var target = "#"+arguments[0];
      $.scrollTo("#"+arguments[0], 800);
    }
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
  
  '/speakers/:key': show("speakers"),
  '/sponsors': show("sponsors"),
  '/sponsors/:key': show("sponsors"),
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

$(function(){

  if (!run) { 
    show("home")();
  }
  if (audio) {
    $('#nav-moo').on('mouseover', function (e) {
      if (!playing) {
        playing = true
        audio.play();
        setTimeout(function() {
          playing = false;
        }, 2000);
      }
    });
  }
  $("#moo-link").on('click', function (e) { e.preventDefault(); e.stopPropagation(); })
  
  
  
  // $(".trackb").html("<div class='top'>Register For This Slot</div><div class='bottom'>Register For This Slot</div>")

});



var hasmapped = false;