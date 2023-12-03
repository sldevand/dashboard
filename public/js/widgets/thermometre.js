function Thermometre(id) {
    var m_id = id;

    var canvas = document.getElementById(m_id);
    var ctx = canvas.getContext("2d");

    return {
        id: m_id,
        idSensor: "",
        textcolor: "black",
        temp: '--',

        draw: function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //Outer circle
            ctx.strokeStyle = this.textcolor;
            ctx.lineWidth = 40;
            ctx.lineCap = "round";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = this.textcolor;
            ctx.shadowBlur = 20;
            ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2.6, 0, Math.PI * 2);
            ctx.stroke();

            //Inner circle
            ctx.fillStyle = "black";
            ctx.fill();

            //Value draw
            ctx.font = '6rem Roboto';
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.textcolor;
            let parsedTemp = parseFloat(this.temp);
            let tempToDisplay = !isNaN(parsedTemp)
                ? parsedTemp.toFixed(1).toString()
                : '--';
            ctx.fillText(tempToDisplay, canvas.width / 2, canvas.height / 2 + 10);
        }
    };
}
