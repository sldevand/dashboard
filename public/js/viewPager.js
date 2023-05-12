document.addEventListener("DOMContentLoaded", function () {
  let widgets = {
    scenarios: "Scénarios",
    inters: "Interrupteurs",
    thermometers: "Températures",
  };

  let cards = [];
  for (let widgetId in widgets) {
    let cardTemplate = document.getElementById("card-template").cloneNode(true);
    document.getElementById("maincontent").appendChild(cardTemplate.content);
    changeId('widget-id', `widget-${widgetId}`);
    changeId('widget-id-title', `widget-${widgetId}-title`);
    changeId('widget-id-content', `widget-${widgetId}-content`);
    changeId('id-Spinner', `${widgetId}-Spinner`);
  }

  //document.getElementById("maincontent").innerHTML = cards;
  // getScenariosFromApi();
  getIntersFromApi();
  // parseThermosFromJSON();

  function changeId(previousId, newId) {
    let element = document.getElementById(previousId);
    element.id = newId;
  }
});
