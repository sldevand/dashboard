var scenarios = [];

var animationLength = 500.0; // Animation length in milliseconds
var firstLoadScenarios = true;

function getScenariosFromApi() {
    $.getJSON("/activapi.fr/api/scenarios/", function (data) {
        $.each(data, function (key, scenario) {
            loadScenarioWidget(scenario);
        });
    });
}

function loadScenarioWidget(scenarioJSON) {
    if (firstLoadScenarios) {
        firstLoadScenarios = false;
        $("#widget-scenarios-content").html("");
    }
    generateScenarioWidgetHtml("scenario" + scenarioJSON.scenarioid);
    var scenarioObj = new ScenarioWidget("scenario" + scenarioJSON.scenarioid);

    scenarioObj.apiData = scenarioJSON;
    scenarioObj.animtime = animationLength;
    $("#" + scenarioObj.id + "title").html(scenarioObj.apiData.nom);
    scenarioObj.init();

    scenarios.push(scenarioObj);
}


function generateScenarioWidgetHtml(id) {
    var prepHTML = '<div class="col s4">' +
        '<canvas id="' + id + '" class="center secondaryTextColor butlp " />' +
        '<div id="' + id + 'title" class="center flow-text textOnBodyColor interTitle"></div>' +
        '</div>';
    $("#widget-scenarios-content").append(prepHTML);
}
