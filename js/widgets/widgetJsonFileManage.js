function widgetJsonFileManage(jsonWidget, type, action, name) {
    let params = {};

    params["action"] = action;
    params["widget"] = type;
    params["json"] = JSON.stringify(jsonWidget);
    params["name"] = name;

    $.post("php/widgetsRequests.php", params, (data) => {
        var childId = type + name;
        childId = childId.replace(/ /g, "_");
        if (data.includes("namechange")) {
            var dataSplit = data.split(";");
            $("#" + childId + " .card-content .card-title").html(dataSplit[1]);
            Materialize.toast("Widget renommé en " + dataSplit[1], 1000);
        }
    });
}
