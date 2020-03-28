
$('#message').html(connectIcon("red"));
var socket = io.connect(config.nodeUrl);

//EVENTS FROM SERVER
socket.on('message', message => {
    $('#message').html(message);
});

socket.on('connect', message => {
    $('#message').html(connectIcon("teal"));
});

socket.on('disconnect',message =>  {
    $('#message').html(connectIcon("red"));
});

socket.on('dimmer',message =>  {
    updateDimmer(message);
});

socket.on('dimmerload',message =>  {
    getdimmersFromJSON(message);
});

socket.on('inter',message =>  {
    updateInterNode(message);
});
socket.on('interload',message =>  {
    if (!$("#" + message.id).length) loadInter(message);
});

socket.on('thermo',message =>  {
    updateThermo(message);
});

socket.on('teleinfo',message =>  {
    updateTeleinfo(message);
});

socket.on('thermostat',message =>  {
    updateThermostat(message);
    setTimeout(function () {
        updateThermostat(message);
    }, 300);
});

socket.on("therplansave", id =>  {
    refreshThermostat();
});

socket.on("thermodesave", id =>  {
    refreshThermostat();
});

socket.on('therclock',message =>  {
    $("#heureLue").html(message);
});

socket.on('chaudiere',message =>  {
    updateSensorThermostat(message);
});

function connectIcon(color) {
    return '<i class="valign material-icons z-depth-2 circle ' + color + ' lighten-3 ' + color + '-text">fiber_manual_record</i>';
}

function refreshThermostat() {
    thermostat.menu = 0;
    $("#" + thermostat.m_widgetContentId).fadeOut(() =>  {
        $("#" + thermostat.m_widgetContentId).html(thermostat.draw());
        $("#" + thermostat.m_widgetContentId).fadeIn(() =>  {
            thermostat.initListeners();
            thermostat.sendData("refreshTher");
        });
    });
}
