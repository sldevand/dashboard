Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

Date.prototype.getWeekNumber = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

function monToSun() {
    var today = new Date();
    var mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    var sundayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);

    return {'monday': mondayOfWeek, 'sunday': sundayOfWeek};
}

function monthFL(decal = 0) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth() - decal;
    var fd = new Date(y, m, 1);
    var ld = new Date(y, m + 1, 0);

    var diff = Math.floor((((ld / 1000 - fd / 1000) / 3600) / 24) + 1);

    return {'first': fd, 'last': ld, 'nbDays': diff};
}

function nowDatetime() {
    var d = new Date;
    return [d.getHours().padLeft(), d.getMinutes().padLeft()].join(':') + ' ' +
        [d.getDate().padLeft(), (d.getMonth() + 1).padLeft(), d.getYear() - 100].join('-');
}

function dFormat(d) {
    return [d.getDate().padLeft(), (d.getMonth() + 1).padLeft(), d.getYear() - 100].join('-');
}

function dFormatAPI(d) {
    return [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-');
}

function nowDate() {
    var d = new Date;
    return [d.getDate().padLeft(), (d.getMonth() + 1).padLeft(), d.getYear() - 100].join('-');
}

function yesterdayDate() {
    var d = new Date;
    return [(d.getDate() - 1).padLeft(), (d.getMonth() + 1).padLeft(), d.getYear() - 100].join('-');
}

function nowDateAPI() {
    var d = new Date;
    return [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-');
}

function yesterdayDateAPI() {
    var d = new Date(Date.now() - 86400000);
    return [d.getFullYear(), (d.getMonth() + 1).padLeft(), (d.getDate()).padLeft()].join('-');
}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function toTimestamp(dateString) {
    var dateTime = new Date(dateString);
    return dateTime.getTime() / 1000;
}

function splitDT(strDateTime = 'd t') {
    return strDateTime.split(' ');
}

function getDate(strDateTime = 'd t') {
    return splitDT(strDateTime)[0];
}

function getTime(strDateTime = 'd t') {
    return splitDT(strDateTime)[1];
}
