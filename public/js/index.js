document.addEventListener("DOMContentLoaded", function () {
  let widgets = {
    inters: "Interrupteurs",
    thermometers: "Capteurs",
    scenarios: "Scénarios",
  };

  for (let widgetId in widgets) {
    let cardTemplate = document.getElementById("card-template").cloneNode(true);
    document.getElementById("maincontent").appendChild(cardTemplate.content);
    changeId('widget-id', `widget-${widgetId}`);
    changeId('widget-id-title', `widget-${widgetId}-title`);
    let widgetTitle = document.getElementById(`widget-${widgetId}-title`);
    widgetTitle.innerHTML = widgets[widgetId];
    changeId('widget-id-content', `widget-${widgetId}-content`);
    changeId('widget-id-spinner', `widget-${widgetId}-spinner`);
  }

  getIntersFromApi();
  parseThermosFromJSON();
  getScenariosFromApi();

  function changeId(previousId, newId) {
    let element = document.getElementById(previousId);
    element.id = newId;
  }
});
