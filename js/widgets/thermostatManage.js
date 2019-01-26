var thermostat = new Thermostat('myThermostat1', 'widget-thermostat-content');

function parseThermostatFromAPI() {
    $.getJSON('/activapi.fr/api/thermostat', function (data) {
        $.each(data, function (index, value) {
            thermostat.apiData = value;
            thermostat.modeid = value.modeid;
            if (value.mode !== null) {
                thermostat.modeName = value.mode.nom;
            } else {
                thermostat.modeName = "Aucun";
            }

            thermostat.internalMode = value.interne;

            $.getJSON('/activapi.fr/api/mesures/get-sensors/thermostat', function (data) {
                $.each(data, function (index, ther) {
                    thermostat.internalTemp = ther.valeur1;

                    thermostat.actif = ther.actif;
                    generateThermostatHtml();
                });
            });

        });
    });
}

function generateThermostatHtml() {
    $("#" + thermostat.m_widgetContentId).html(thermostat.draw());
    thermostat.initListeners();
}

function updateThermostat(thermostatTab) {
    thermostat.apiData = thermostatTab;
    thermostat.modeid = thermostatTab.modeid;
    if (thermostatTab.mode !== null) {
        thermostat.modeName = thermostatTab.mode.nom;
    } else {
        thermostat.modeName = "Aucun";
    }
    thermostat.boilerState = thermostatTab.etat;
    thermostat.internalMode = thermostatTab.interne;

    if (thermostat.menu === 0) generateThermostatHtml();
}

function updateSensorThermostat(sensor) {

    thermostat.internalTemp = sensor.valeur1;
    thermostat.actif = 1;

    if (thermostat.menu === 0) generateThermostatHtml();
}
