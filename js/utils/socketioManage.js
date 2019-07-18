// var address = '192.168.1.52';
var address = 'localhost';
var port = 5901;

$('#message').html(connectIcon("red"));

var fulladdress = 'http://' + address + ':' + port;
var socket = io.connect(fulladdress);

//EVENTS FROM SERVER
socket.on('message', function (message) {
    $('#message').html(message);
});

socket.on('connect', function (message) {
    $('#message').html(connectIcon("teal"));
});

socket.on('disconnect', function (message) {
    $('#message').html(connectIcon("red"));
});

socket.on('dimmer', function (message) {
    updateDimmer(message);
});

socket.on('dimmerload', function (message) {
    getdimmersFromJSON(message);
});

socket.on('inter', function (message) {
    updateInterNode(message);
});
socket.on('interload', function (message) {
    if (!$("#" + message.id).length) loadInter(message);
});

socket.on('thermo', function (message) {
    updateThermo(message);
});

socket.on('teleinfo', function (message) {
    updateTeleinfo(message);
});

socket.on('thermostat', function (message) {
    updateThermostat(message);
    setTimeout(function () {
        updateThermostat(message);
    }, 300);
});

socket.on("therplansave", function (id) {
    refreshThermostat();
});

socket.on("thermodesave", function (id) {
    refreshThermostat();
});

socket.on('therclock', function (message) {
    $("#heureLue").html(message);
});

socket.on('chaudiere', function (message) {
    updateSensorThermostat(message);
});

function connectIcon(color) {
    return '<i class="valign material-icons z-depth-2 circle ' + color + ' lighten-3 ' + color + '-text">fiber_manual_record</i>';
}

function refreshThermostat() {
    thermostat.menu = 0;
    $("#" + thermostat.m_widgetContentId).fadeOut(function () {

        $("#" + thermostat.m_widgetContentId).html(thermostat.draw());
        $("#" + thermostat.m_widgetContentId).fadeIn(function () {
            thermostat.initListeners();
            thermostat.sendData("refreshTher");
        });
    });
}
