const animationThermoLength = 1500.0;
const thermosStyle = {
  liquidColor: "#ff6666",
  miniTemp: "-5",
  maxiTemp: "30",
  precTemp: "-5",
};

var thermoJSON = [];
var thermos = [];
var raf;
var nbThermos = 0;
var startTime = -1;
var firstThermoLoad = true;
var localPrecTemp = [];
var progress = 0;
var drawPending = false;

function parseThermosFromJSON() {
  progress = 0;
  drawPending = false;
  startTime = -1;
  thermos = [];

  fetch(config.apiUrl + "mesures/get-sensors")
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      loadAllThermos(json);
    });
}

function loadAllThermos(apiData) {
  nbThermos = apiData.length;
  let widgetSpinner = document.getElementById("widget-thermometers-spinner");
  if (widgetSpinner) {
    widgetSpinner.remove();
  }
  for (let thermoIndex = 0; thermoIndex < nbThermos; thermoIndex++) {
    if (firstThermoLoad) {
      generateThermoHtml(`myThermo${thermoIndex}`);
    }
    let thermo = new Thermometre(`myThermo${thermoIndex}`);
    setThermoData(thermo, apiData, thermoIndex);
    setThermoStyle(thermo);
    thermos.push(thermo);
  }

  firstThermoLoad = false;

  setTypeOfThermo();
  raf = window.requestAnimationFrame(drawAll);
}

function setThermoStyle(thermo) {
  thermo.liquidcolor = thermosStyle.liquidColor;
  thermo.namecolor = rgb2hex(getColor("textOnBodyColor"));
  thermo.textcolor = rgb2hex(getColor("textOnBodyColor"));
  thermo.mintemp = parseFloat(thermosStyle.miniTemp);
  thermo.maxtemp = parseFloat(thermosStyle.maxiTemp);
  thermo.animtime = animationThermoLength;
  thermo.animcurve = "easeOutCubic";
}

function setThermoData(thermo, apiData, thermoIndex) {
  thermo.name = apiData[thermoIndex]["nom"];
  thermo.temp = parseFloat(apiData[thermoIndex]["valeur1"]);
  thermo.state = apiData[thermoIndex]["actif"];
  thermo.idSensor = apiData[thermoIndex]["id"];
  thermo.prectemp = firstThermoLoad
    ? parseFloat(thermosStyle.precTemp)
    : localPrecTemp[thermoIndex];
  localPrecTemp[thermoIndex] = thermo.temp;
}

window.addEventListener("resize", () => {
  setTypeOfThermo();
});

function setTypeOfThermo() {
  var winWidth = window.innerWidth;
  var winHeight = window.innerHeight;
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
    let myThermoElement = document.getElementById(`myThermo${i}`);
    myThermoElement.setAttribute("width", canvasWidth);
    myThermoElement.setAttribute("height", canvasHeight);
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
  for (let thermoIndex = 0; thermoIndex < nbThermos; thermoIndex++) {
    thermos[thermoIndex].animstep = progress;
    thermos[thermoIndex].animate();
    thermos[thermoIndex].draw();
  }
}

function requestRedraw() {
  if (drawPending) {
    return;
  }
  drawPending = true;
  window.requestAnimationFrame(redraw);
}

function updateThermo(thermo) {
  for (let thermoIndex = 0; thermoIndex < nbThermos; thermoIndex++) {
    if (thermos[thermoIndex].idSensor.includes(thermo.radioid)) {
      thermos[thermoIndex].temp = thermo.valeur1;
      thermos[thermoIndex].state = 1;
      thermos[thermoIndex].animstep = progress;
      thermos[thermoIndex].animate();
      thermos[thermoIndex].draw();
      return;
    }
  }
}

function generateThermoHtml(id) {
  var prepHTML = `<div><canvas class="thermo" id="${id}" width=100px height=150px></canvas></div>`;
  var template = document.createElement("template");
  template.innerHTML = prepHTML;
  let widgetContent = document.getElementById("widget-thermometers-content");
  widgetContent.appendChild(template.content);
}
