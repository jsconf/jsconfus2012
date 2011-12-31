
function initPage() {
  $('#parallax').jparallax();
}
$(function () {
  $(window).resize(initPage)
  initPage();
});