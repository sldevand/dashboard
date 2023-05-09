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
                case "mercure":
                    this.drawMercure();
                    break;
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

        drawMercure: function () {
            ratio = this.tubeHeight / (this.maxtemp - this.mintemp);
            var lastPosX = this.posX + Math.cos(this.eAngle) * this.radius;
            var lastPosY = this.posY + Math.sin(this.eAngle) * this.radius;
            var lastPosXEnd = this.posX + Math.cos(this.bAngle) * this.radius;
            var lastPosYEnd = this.posY + Math.sin(this.bAngle) * this.radius;
            ctx.shadowColor = '#333';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.shadowBlur = 2;


            //Liquid draw
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.radius, this.eAngle, this.bAngle);
            ctx.lineTo(lastPosXEnd, lastPosYEnd - ratio * this.curtemp + ratio * this.mintemp);
            ctx.lineTo(lastPosX, lastPosYEnd - ratio * this.curtemp + ratio * this.mintemp);
            ctx.lineTo(lastPosX, lastPosYEnd);
            var blendPercent = (parseFloat(this.curtemp) - this.mintemp) / (this.maxtemp - this.mintemp);
            ctx.fillStyle = blendColors(this.liquidcolor, this.liquidmincolor, 1 - blendPercent);
            ctx.fill();

            //Value draw
            ctx.font = this.radius * 1.3 + "px Roboto";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.textcolor;
            ctx.fillText(parseFloat(this.curtemp).toFixed(1).toString() + " °C", this.posX, this.posY + this.radius * 1.9);

            //Name draw
            ctx.font = this.radius * 1.0 + "px Roboto";
            ctx.fillStyle = this.namecolor;
            ctx.fillText(this.name, this.posX, this.posY + this.radius * 3);

            //Glass draw
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.radius, this.eAngle, this.bAngle);
            ctx.lineTo(lastPosXEnd, lastPosYEnd - this.tubeHeight);
            ctx.arc(lastPosXEnd + 5, lastPosYEnd - this.tubeHeight, 5, Math.PI, Math.PI * 1.5);
            ctx.lineTo(lastPosX - 5, lastPosYEnd - this.tubeHeight - 5);
            ctx.arc(lastPosX - 5, lastPosYEnd - this.tubeHeight, 5, Math.PI * 1.5, Math.PI * 2);
            ctx.lineTo(lastPosX, lastPosYEnd);
            ctx.strokeStyle = this.glasscolor;
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.stroke();

            ctx.shadowColor = 'transparent';
            //Graduations draw

            //minTemp Grad+txt
            ctx.beginPath();
            ctx.moveTo(lastPosX + 5, lastPosYEnd);
            ctx.lineTo(lastPosX + 12, lastPosYEnd);
            ctx.font = this.radius * 0.7 + "px Roboto";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.namecolor;
            ctx.fillText((Math.round(this.mintemp)).toString(), lastPosX + 25, lastPosYEnd);
            if (this.mintemp < -5) {
                //0° Grad+txt
                ctx.moveTo(lastPosX + 5, lastPosYEnd + ratio * this.mintemp);
                ctx.lineTo(lastPosX + 12, lastPosYEnd + ratio * this.mintemp);
                ctx.font = this.radius * 0.7 + "px Roboto";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = this.namecolor;
                ctx.fillText((Math.round(0)).toString(), lastPosX + 25, lastPosYEnd + ratio * this.mintemp);
            }

            ctx.moveTo(lastPosX + 5, lastPosYEnd - ratio * this.maxtemp + ratio * this.mintemp);
            ctx.lineTo(lastPosX + 12, lastPosYEnd - ratio * this.maxtemp + ratio * this.mintemp);
            ctx.font = this.radius * 0.7 + "px Roboto";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.namecolor;
            ctx.fillText((Math.round(this.maxtemp)).toString(), lastPosX + 25, lastPosYEnd - ratio * this.maxtemp + ratio * this.mintemp);
            ctx.stroke();
        },

        drawCircleDigital: function () {
            ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = this.glasscolor;
            ctx.lineWidth = 1;
            ctx.lineCap = "round";

            //bg fill
            var blendPercent = (parseFloat(this.curtemp) - this.mintemp) / (this.maxtemp - this.mintemp);
            ctx.fillStyle = blendColors(this.liquidcolor, this.liquidmincolor, 1 - blendPercent);
            ctx.shadowColor = '#FFF';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 0.5;
            ctx.fill();

            ctx.globalAlpha = 1;
            //Value draw
            ctx.font = canvas.height / 3.8 + "px Roboto";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.textcolor;
            ctx.fillText(parseFloat(this.curtemp).toFixed(1).toString()/* + " °C"*/, canvas.width / 2, canvas.height / 2.4);

            //Name draw
            ctx.font = canvas.height / 6 + "px Roboto";
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
            ctx.font = canvas.height / 2.4 + "px Roboto";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = this.textcolor;
            ctx.fillText(parseFloat(this.curtemp).toFixed(1).toString() + " °C", canvas.width / 2, canvas.height / 3);

            //Name draw
            ctx.font = canvas.height / 3.6 + "px Roboto";
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
