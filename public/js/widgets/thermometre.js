function Thermometre(id) {
    var m_id = id;

    var canvas = document.getElementById(m_id);
    var ctx = canvas.getContext("2d");
    var a = 5.0;
    var easingcurve;

    return {
        id: m_id,
        idSensor: "",
        liquidcolor: "red",
        liquidmincolor: "#AAAAff",
        glasscolor: "black",
        textcolor: "black",
        namecolor: "black",
        name: "thermo",
        mintemp: -20.0,
        maxtemp: 50.0,
        prectemp: -20.0,
        curtemp: -20.0,
        temp: -20.0,
        animtime: 2000.0,
        animstep: 1.00,
        type: "mercure",
        animcurve: "linear",
        radius: canvas.height / 10.0,
        posX: canvas.width / 2.0,
        posY: canvas.height / 1.5,
        tubeHeight: canvas.height / 2.0,
        eAngle: -Math.PI / 3.0,
        bAngle: Math.PI + Math.PI / 3.0,
        curHeight: canvas.height,
        curWidth: canvas.width,
        state: 1,

        draw: function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.shadowColor = '#333';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 2;

            switch (this.type) {
                case "circleDigital":
                    this.drawCircleDigital();
                    break;
                default:
                    this.drawDigital();
            }

            if (this.state !== 0) {
                return;
            }

            this.prectemp = this.mintemp;
            this.temp = this.mintemp;

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
            }
            ctx.putImageData(imageData, 0, 0);
        },

        drawCircleDigital: function () {
            ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = this.glasscolor;
            ctx.lineWidth = 30;
            ctx.lineCap = "round";

            //bg fill
            var blendPercent = (parseFloat(this.curtemp) - this.mintemp) / (this.maxtemp - this.mintemp);
            ctx.fillStyle = blendColors(this.liquidcolor, this.liquidmincolor, 1 - blendPercent);
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 5;
            ctx.globalAlpha = 0.5;
            ctx.fill();

            ctx.globalAlpha = 1;
            //Value draw
            ctx.font = '5rem Roboto';
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.textcolor;
            ctx.fillText(parseFloat(this.curtemp).toFixed(1).toString()/* + " °C"*/, canvas.width / 2, canvas.height / 2.4);

            //Name draw
            ctx.font = '3rem Roboto';
            ctx.fillStyle = this.namecolor;
            ctx.fillText(this.name, canvas.width / 2, canvas.height / 1.5);
        },

        drawDigital: function () {
            ctx.shadowColor = '#FFF';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;

            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(canvas.width - 5, 0);
            ctx.arc(canvas.width - 5, 5, 5, Math.PI * 1.5, Math.PI * 2);
            ctx.lineTo(canvas.width, canvas.height - 5);
            ctx.arc(canvas.width - 5, canvas.height - 5, 5, 0, Math.PI * 0.5);
            ctx.lineTo(5, canvas.height);
            ctx.arc(5, canvas.height - 5, 5, Math.PI * 0.5, Math.PI);
            ctx.lineTo(0, 5);
            ctx.arc(5, 5, 5, Math.PI, Math.PI * 1.5);

            ctx.strokeStyle = this.glasscolor;
            ctx.lineWidth = 1;
            ctx.lineCap = "round";

            ctx.stroke();

            //Value draw
            ctx.font = "5rem Roboto";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.textcolor;
            ctx.fillText(parseFloat(this.curtemp).toFixed(1).toString() + " °C", canvas.width / 2, canvas.height / 3);

            //Name draw
            ctx.font = "3rem Roboto";
            ctx.fillStyle = this.namecolor;
            ctx.fillText(this.name, canvas.width / 2, canvas.height / 1.5);
        },

        animate: function () {
            var pTemp = Math.round(parseFloat(this.curtemp), 1);
            var temp = Math.round(parseFloat(this.temp), 1);
            if (Math.abs(temp - pTemp) <= 0.0) {
                this.curtemp = this.temp;
                this.draw();
            } else {
                easingcurve = Easing[this.animcurve](this.animstep / this.animtime);
                a = (this.temp - this.prectemp);
                this.curtemp = a * easingcurve + this.prectemp;
            }
        }
    };
}
