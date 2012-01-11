function show(link) {
  return (function () {
    $(".pane").hide();    
    $("#"+link).show();
    $(".selected").removeClass("selected");
    $("#nav-"+link).addClass("selected");
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



$(function () {
});