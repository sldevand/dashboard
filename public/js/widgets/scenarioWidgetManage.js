var scenarios = [];
var animationLength = 500.0;
var firstLoadScenarios = true;

function getScenariosFromApi() {
  fetch(config.apiUrl + "scenarios/")
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      json.forEach((scenario) => {
        loadScenarioWidget(scenario);
      });
    });
}

function loadScenarioWidget(scenarioJSON) {
  if (firstLoadScenarios) {
    firstLoadScenarios = false;
    let scenarioContent = document.getElementById("widget-scenarios-content");
    scenarioContent.innerHTML = "";
  }
  generateScenarioWidgetHtml("scenario" + scenarioJSON.id);
  var scenarioObj = new ScenarioWidget("scenario" + scenarioJSON.id);

  scenarioObj.apiData = scenarioJSON;
  scenarioObj.animtime = animationLength;
  let scenarioTitle = document.getElementById(`${scenarioObj.id}title`);
  scenarioTitle.innerHTML = scenarioObj.apiData.nom;
  scenarioObj.init();
  scenarios.push(scenarioObj);
}

function generateScenarioWidgetHtml(id) {
  var prepHTML = `<div class="widget-wrapper">
    <canvas id="${id}" class="secondaryTextColor"></canvas>
    <span id="${id}title" class="textOnBodyColor"></span>
    </div>`;
  var template = document.createElement("template");
  template.innerHTML = prepHTML;
  let widgetContent = document.getElementById("widget-scenarios-content");
  widgetContent.appendChild(template.content);
}
