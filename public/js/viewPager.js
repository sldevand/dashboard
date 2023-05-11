document.addEventListener("DOMContentLoaded", function() {
  let widgets = {
    scenarios: "Scénarios",
    inters: "Interrupteurs",
    thermometers: "Températures"
  };

  let cards = [];
  for (let widget in widgets) {
    let cardTemplate = document.getElementById("card-template").cloneNode(true);

    cards.push(cardTemplate.innerHTML);
  }

  document.getElementById("maincontent").innerHTML = cards;
  // getScenariosFromApi();
  // getIntersFromApi();
  // parseThermosFromJSON();
});
