function highlight(field, error) {
    if (error) {
        $("#" + field.id).css("backgroundColor", "#fba");
        setTimeout(function () {
            $("#" + field.id).css("backgroundColor", "");

        }, 1500);
    }
    else {
        $("#" + field.id).css("backgroundColor", "");
    }
}

function checkField(field) {
    var regex = /^[a-zA-Z0-9._-]{8,32}$/;
    var isOk = regex.test(field.value);
    highlight(field, !isOk);

    return isOk;
}

function checkForm(f) {
    return checkField(f.con_password);
}
