var inters = [];
var animationLength = 500.0; // Animation length in milliseconds
var firstInterLoad = true;

function getIntersFromApi() {
  $.getJSON(config.apiUrl + "actionneurs/inter", (data) => {
    $.each(data, (key, inter) => {
      loadInter(inter);
    });
  });
}

function loadInter(interJSON) {
  if (firstInterLoad) {
    firstInterLoad = false;
    $("#widget-inters-content").html("");
  }
  generateIntersHtml(interJSON.id);
  var inter = new Inter(interJSON.id);

  inter.apiData = interJSON;
  inter.animtime = animationLength;
  $("#myInterTitle" + inter.id).html(inter.apiData.nom);
  inter.init();
  inters.push(inter);
}

function updateInterNode(interUp) {
  inters.forEach((inter) => {
    if (inter.id != interUp.id) {
      return;
    }
    inter.etat = interUp.etat;
    inter.setState(interUp.etat);
    inter.draw();
    inter.draw();
    inter.draw();
    inter.draw();
  });
}

function generateIntersHtml(idx) {
  var prepHTML =
    '<div class="col s4">' +
    '<canvas id="' +
    idx +
    '" class="center secondaryTextColor butlp "></canvas>' +
    '<div id="myInterTitle' +
    idx +
    '" class="center flow-text textOnBodyColor interTitle"></div>' +
    "</div>";

  $("#widget-inters-content").append(prepHTML);
}
