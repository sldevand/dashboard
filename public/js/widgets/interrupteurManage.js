var inters = [];
var animationLength = 500.0;
var firstInterLoad = true;

function getIntersFromApi() {
  fetch(config.apiUrl + "actionneurs/inter")
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      json.forEach((inter) => {
        loadInter(inter);
      });
    });
}

function loadInter(interJSON) {
  if (firstInterLoad) {
    firstInterLoad = false;
    let widgetIntersContent = document.getElementById("widget-inters-content");
    widgetIntersContent.innerHTML = "";
  }
  generateIntersHtml(interJSON.id);
  var inter = new Inter(interJSON.id);
  inter.apiData = interJSON;
  inter.animtime = animationLength;
  inter.init();
  let interTitle = document.getElementById(`myInterTitle${inter.id}`);
  interTitle.innerHTML = inter.apiData.nom;
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
  var prepHTML = `<div class="widget-wrapper">
    <canvas id="${idx}" class="secondaryTextColor"></canvas>
    <span id="myInterTitle${idx}" class="textOnBodyColor"></span>
    </div>`;
  var template = document.createElement("template");
  template.innerHTML = prepHTML;
  let widgetIntersContent = document.getElementById("widget-inters-content");
  widgetIntersContent.appendChild(template.content);
}
