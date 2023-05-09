$(document).ready(function () {
  $.get("php/controleurs/widgetController.php", function (data) {
    $("#maincontent").html(data);
    loadMain();
  });

  function loadMain() {
    $("#titlebar").append("Accueil");
    getScenariosFromApi();
    getIntersFromApi();
    parseThermosFromJSON();
  }
});
