function ScenarioWidget(id) {
    var m_id = id;
    var canvas = document.getElementById(m_id);
    var ctx = canvas.getContext("2d");
    var container = $(canvas);
    var progressScenario = 0;
    var startTimeScenario = -1;
    var drawPendingScenario = false;
    var scenario = {
        //Public Attributes
        id: m_id,
        apiData: [],
        //Private Attributes
        innerStrokecolor: "#FFFFFF",
        innerFillcolor: "#000000",
        namecolor: "#FFFFFF",
        goblend: false,
        strokecolor: "#000000",
        fillcolor: "#AAAAAA",
        oncolor: "#0000FF",
        offcolor: "#FFFFFF",
        startcolor: "#0000FF",
        stopcolor: "#FF0000",
        boldPct: 1.1,
        blend: " ",
        animcurve: "easeOutCubic",
        animtime: 1000.0,
        animstep: 1.00,
        radius: canvas.width / 2.0,
        zoom: 0.9,
        posX: canvas.width / 2.0,
        posY: canvas.height / 2.0,
        shadow: true,
        mousePos: {x: 0, y: 0},
        alphaCanal: 1.0,
        animable: true,

        setState: function (etat) {
            this.apiData.etat = etat;
            if (this.apiData.etat == '1') {
                this.fillcolor = this.oncolor;
                this.startcolor = this.offcolor;
                this.stopcolor = this.oncolor;
            } else {
                this.fillcolor = this.offcolor;
                this.startcolor = this.oncolor;
                this.stopcolor = this.offcolor;
            }
        },

        draw: function () {
            //SHADOW RESET
            this.activateShaders(this.shadow);

            //CLEAR ALL SCENE
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //DRAW BUTTON OUTERSHAPE
            ctx.strokeStyle = this.innerStrokecolor;
            ctx.lineWidth = canvas.width / 50;
            ctx.fillStyle = this.innerFillcolor;

            ctx.beginPath();
            ctx.arc(Math.floor(canvas.width / 2), Math.floor(canvas.width / 2), this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            //DRAW BUTTON INNERSHAPE

            //SHADOW CHANGE
            ctx.shadowColor = blendColors(this.startcolor, this.stopcolor, this.blend);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            if (this.apiData.etat) {
                ctx.shadowBlur = ((canvas.width / 20) * this.blend + 2) * this.zoom;
                this.boldPct = (0.4 * this.blend + 1.0) * this.zoom;
            }
            else {
                ctx.shadowBlur = ((canvas.width / 20) * (1 - this.blend) + 2) * this.zoom;
                this.boldPct = ((1.4 - 0.4 * this.blend)) * this.zoom;
            }

            //INNER TRIANGLE
            ctx.strokeStyle = blendColors(scenario.startcolor, scenario.stopcolor, scenario.blend);
            ctx.fillStyle = blendColors(scenario.startcolor, scenario.stopcolor, scenario.blend);
            ctx.lineCap = 'square';

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2.5, canvas.height / 3);
            ctx.lineTo(canvas.width / 1.5, canvas.height / 2);
            ctx.lineTo(canvas.width / 2.5, canvas.height / 1.5);
            ctx.lineTo(canvas.width / 2.5, canvas.height / 3);
            ctx.fill();

            //OUTER CIRCLE
            ctx.lineWidth = (canvas.width / 18) * this.boldPct;

            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.width / 2, this.radius * 0.95, 0, Math.PI * 2.0);
            ctx.stroke();
            ctx.closePath();
        },

        init: function () {
            this.oncolor = rgb2hex(getColor("primaryTextLightColor"));
            this.offcolor = rgb2hex(getColor("primaryTextLightColor"));
            if (parseInt(this.radioid) >= 99) this.animable = false;
            this.setState(this.apiData.etat);
            this.fitToContainer();
            this.eventListenerInit();
            this.activateShaders(this.shadow);
            window.requestAnimationFrame(drawFrame);
        },

        animate: function () {
            if (this.goblend) {
                this.blend = Easing[this.animcurve](this.animstep / this.animtime);
                if (this.blend > 1.0) {
                    this.blend = 1.0;
                }
                if (this.blend <= 0.0) {
                    blend = 0.0;
                }
            } else {
                this.blend = 1.0;
            }
        },

        onAnimationEnd: function () {
            this.goblend = false;
        },

        onAnimationStart: function () {
            this.goblend = true;
        },

        activateShaders: function (activate) {
            if (activate) {
                ctx.shadowColor = '#333';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 4;
            } else {
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
            }
        },

        setMousePos: function (mousePos) {
            this.mousePos = mousePos;
            if (this.getHitBox(this.mousePos.x, this.mousePos.y, true) <= this.radius) {
                this.setState('1');
                if (this.animable) {
                    progressScenario = 0;
                    startTimeScenario = -1;
                    drawPendingScenario = false;
                    this.onAnimationStart();
                    window.window.requestAnimationFrame(drawFrame);

                }
                this.sendingCallback();
            }
        },

        getMousePos: function (evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        },

        sendingCallback: function () {
            socket.emit("updateScenario", this.apiData);
        },

        eventListenerInit: function () {

            canvas.addEventListener('click', this.eventListenerCallback, false);
        },

        eventListenerCallback: function (evt) {
            var rect = canvas.getBoundingClientRect();
            var mousePos = scenario.getMousePos(evt);
            scenario.setMousePos(mousePos);

        },

        eventListenerRemove: function () {
            canvas.removeEventListener('click', this.eventListenerCallback, false);
        },

        fitToContainer: function () {
            canvas.width = container.width();
            canvas.height = container.width();
            scenario.radius = (canvas.width / 2) * scenario.zoom;

        },

        getHitBox: function (x, y, fromCenter) {
            var hyp = 0;

            if (fromCenter) {
                x -= canvas.width / 2;
                y -= canvas.width / 2;
            }
            hyp = Math.sqrt(x * x + y * y);
            return hyp;
        }
    };

    function drawFrame(timestamp) {
        if (startTimeScenario < 0) {
            startTimeScenario = timestamp;
        } else {
            progressScenario = timestamp - startTimeScenario;
        }
        requestRedrawScenario();
        if (progressScenario < scenario.animtime) {
            window.requestAnimationFrame(drawFrame);
        }
        else {
            scenario.onAnimationEnd();
        }
    }

    function requestRedrawScenario() {
        if (!drawPendingScenario) {
            drawPendingScenario = true;
            window.requestAnimationFrame(redrawScenario);
        }
    }

    function redrawScenario() {
        drawPendingScenario = false;
        scenario.animstep = progressScenario;
        scenario.animate();
        scenario.draw();
    }

    $(window).resize(function () {
        scenario.fitToContainer();
        redrawScenario();
    });

    return scenario;
}







