$("#timewidgetparent,table").animatecssjs({
  // animation type
  type: "fadeIn",
  // infinite loop
  infinite: false,
  // reset the element when the animation ends
  reset: true,
});

$("#tempwidgetparent,#minmaxpanel").animatecssjs({
  type: "fadeIn",
  infinite: false,
  reset: true,
});

$("#dashlamps,.page-footer").animatecssjs({
  type: "fadeIn",
  infinite: false,
  reset: true,
});

$("#navbar").animatecssjs({
  type: "fadeIn",
  infinite: false,
  reset: true,
});

$(document).ready(function () {
  hideAndShowFooter();
});

function hideAndShowFooter() {
  if ($(window).height() < 800) {
    $("footer").hide();
  } else {
    $("footer").show();
  }
}

$(window).resize(function () {
  hideAndShowFooter();
});
