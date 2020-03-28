$(document).ready(function () {

	var APIAddress = "http://domusbox/activapi/";
    // var APIAddress = "http://localhost/activapi.fr/";
    setTimeout(function () {
        socket.emit("getTherClock", "sync");
    }, 30);

    $("#formThermostatSettings").submit(function (event) {

        event.preventDefault();

        var selectedMode = $("#mode").val()
        var selectedPlan = $("#planning").val();

        createSpinner();

        switch (selectedPlan) {
            case "0":
                thermostat.apiData.planning = 0;
                setTimeout(
                    function () {
                        socket.emit("updateTherMode", selectedMode);
                        displayThermostatInterface();
                    }
                    , 500);

                break;
        }
        socket.emit("updateTherPlan", selectedPlan);
        thermostat.apiData.planning = selectedPlan;
    });

    $("#refreshMode").click(function (event) {
        event.preventDefault();
        createSpinner();
        socket.emit("syncTherModes", "sync");
    });

    //CANCEL FORM
    $("#backFormThermostatSettings").click(function (event) {
        event.preventDefault();
        displayThermostatInterface();
    });

    $("#synClockThermostatSettings").click(function (event) {
        event.preventDefault();
        socket.emit("updateTherClock", "sync");
        console.log("updateTherClock");
    });

    function displayThermostatInterface() {
        thermostat.menu = 0;
        $("#" + thermostat.m_widgetContentId).fadeOut(function () {
            $("#" + thermostat.m_widgetContentId).html(thermostat.draw());
            $("#" + thermostat.m_widgetContentId).fadeIn(function () {
                thermostat.initListeners();
                thermostat.sendData("refreshTher");
            });
        });
    }

    function createSpinner() {
        $("#" + thermostat.m_widgetContentId).html(
            '<div class="valign-wrapper">' +
            spinner(thermostat.m_widgetContentId + "spinner")
            + '</div>'
        );
    }
});
