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
  apiData = apiData.filter((thermoApi) => {
    return String(thermoApi.actif) === "1"
  });

  nbThermos = apiData.length;
  let widgetSpinner = document.getElementById("widget-thermometers-spinner");
  if (widgetSpinner) {
    widgetSpinner.remove();
  }
  for (let thermoIndex = 0; thermoIndex < nbThermos; thermoIndex++) {
    generateThermoHtml(`myThermo${thermoIndex}`, apiData[thermoIndex]["nom"]);
    let thermo = new Thermometre(`myThermo${thermoIndex}`);
    setThermoData(thermo, apiData, thermoIndex);
    setThermoStyle(thermo);
    thermos.push(thermo);
  }

  redraw();
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
  thermo.temp = parseFloat(apiData[thermoIndex]["valeur1"]);
  thermo.state = apiData[thermoIndex]["actif"];
  thermo.idSensor = apiData[thermoIndex]["id"];
  thermo.radioid = apiData[thermoIndex]["radioid"];
}

window.addEventListener("resize", () => {
  redraw();
});

function redraw() {
  for (let thermoIndex = 0; thermoIndex < nbThermos; thermoIndex++) {
    thermos[thermoIndex].animstep = progress;
    thermos[thermoIndex].draw();
  }
}

function updateThermo(thermo) {
  for (let thermoIndex = 0; thermoIndex < nbThermos; thermoIndex++) {
    if (thermos[thermoIndex].radioid.includes(thermo.radioid)) {
      thermos[thermoIndex].temp = thermo.valeur1;
      thermos[thermoIndex].draw();
    }
  }
}

function generateThermoHtml(id, title) {
  var prepHTML = `<div class="widget-wrapper">
  <canvas id="${id}" class="secondaryTextColor" width="300" height="300"></canvas>
  <span id="${id}title" class="textOnBodyColor">${title}</span>
  </div>`;
  var template = document.createElement("template");
  template.innerHTML = prepHTML;
  let widgetContent = document.getElementById("widget-thermometers-content");
  widgetContent.appendChild(template.content);
}
