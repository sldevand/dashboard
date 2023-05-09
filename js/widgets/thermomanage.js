var thermoJSON = [];
var thermos = [];
var raf;
var nbThermos = 0;
var startTime = -1;
var firstThermoLoad = true;
var localPrecTemp = [];

var animationThermoLength = 1500.0; // Animation length in milliseconds
var progress = 0;
var drawPending = false;

function parseThermosFromJSON() {
  progress = 0;
  drawPending = false;
  startTime = -1;
  thermos = [];
  $.getJSON(config.apiUrl + "mesures/get-sensors", function (apiData) {
    loadAllThermos(apiData);
    document.getElementById('thermometers-Spinner').remove();
  });
}

function loadAllThermos(apiData) {
  nbThermos = apiData.length;

  let thermosStyle = {
    liquidColor: "#ff6666",
    miniTemp: "-5",
    maxiTemp: "30",
    precTemp: "-5",
  };

  var i;
  for (i = 0; i < nbThermos; i++) {
    if (firstThermoLoad) {
      $("#widget-thermometers-content").append(
        generateThermoHtml("myThermo" + i)
      );
    }

    thermos.push(new Thermometre("myThermo" + i));
    thermos[i].name = apiData[i]["nom"];
    thermos[i].temp = parseFloat(apiData[i]["valeur1"]);
    thermos[i].state = apiData[i]["actif"];
    thermos[i].idSensor = apiData[i]["id"];
    thermos[i].liquidcolor = thermosStyle.liquidColor;
    thermos[i].namecolor = rgb2hex(getColor("textOnBodyColor"));
    thermos[i].textcolor = rgb2hex(getColor("textOnBodyColor"));

    if (firstThermoLoad) {
      thermos[i].prectemp = parseFloat(thermosStyle.precTemp);
      localPrecTemp[i] = thermos[i].temp;
    } else {
      thermos[i].prectemp = localPrecTemp[i];
      localPrecTemp[i] = thermos[i].temp;
    }
    thermos[i].mintemp = parseFloat(thermosStyle.miniTemp);
    thermos[i].maxtemp = parseFloat(thermosStyle.maxiTemp);
    thermos[i].animtime = animationThermoLength;
    thermos[i].animcurve = "easeOutCubic";
  }
  firstThermoLoad = false;

  setTypeOfThermo();
  raf = window.requestAnimationFrame(drawAll);
}

$(window).resize(function () {
  setTypeOfThermo();
});

function setTypeOfThermo() {
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var canvasWidth;
  var canvasHeight;

  var type;
  if (winWidth < 350 || winHeight < 400) {
    type = "circleDigital";
    canvasHeight = 90;
    canvasWidth = 90;
  } else {
    type = "mercure";
    canvasWidth = 100;
    canvasHeight = 150;
  }
  for (i = 0; i < nbThermos; i++) {
    thermos[i].type = type;
    $("#myThermo" + i).attr("width", canvasWidth);
    $("#myThermo" + i).attr("height", canvasHeight);
  }
  progress = 0;
  drawPending = false;
  startTime = -1;

  redraw();
}

function drawAll(timestamp) {
  // Calculate animation progress
  if (startTime < 0) {
    startTime = timestamp;
  } else {
    progress = timestamp - startTime;
  }
  requestRedraw();
  if (progress <= animationThermoLength) {
    raf = window.requestAnimationFrame(drawAll);
  } else {
    window.cancelAnimationFrame(raf);
  }
}

function redraw() {
  drawPending = false;
  var i;
  for (i = 0; i < nbThermos; i++) {
    thermos[i].animstep = progress;
    thermos[i].animate();
    thermos[i].draw();
  }
}

function requestRedraw() {
  if (!drawPending) {
    drawPending = true;
    window.requestAnimationFrame(redraw);
  }
}

function updateThermo(thermo) {
  for (let i = 0; i < nbThermos; i++) {
    if (thermos[i].idSensor.includes(thermo.radioid)) {
      thermos[i].temp = thermo.valeur1;
      thermos[i].state = 1;
      thermos[i].animstep = progress;
      thermos[i].animate();
      thermos[i].draw();
      break;
    }
  }
}

function generateThermoHtml(id) {
  var prepHtml =
    '<div class="col s4 m4 l4 center thermoWrapper">' +
    '<canvas class="thermo" id="' +
    id +
    '" width=100px height=150px></canvas>' +
    "</div>";

  return prepHtml;
}
