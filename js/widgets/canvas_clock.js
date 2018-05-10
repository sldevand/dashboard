function CanvasClock(id){

var canvas = document.getElementById(id);
var ctx = canvas.getContext("2d");

var radius = canvas.width / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

var innerCircleColor=rgb2hex(getColor("primaryTextColor"));
var numbersColor=rgb2hex(getColor("textOnPrimaryColor"));
var digitalColor=rgb2hex(getColor("textOnBodyColor"));
var dateColor=rgb2hex(getColor("textOnBodyColor"));

var outerCircleColor=rgb2hex(getColor("secondaryTextColor"));
var secondHandColor=rgb2hex(getColor("secondaryTextColor"));
var minuteHandColor=rgb2hex(getColor("textOnPrimaryColor"));
var hourHandColor=rgb2hex(getColor("textOnPrimaryColor"));

var clockType="digital";

setTypeOfClock();
drawClock();

setInterval(drawClock, 1000);

function drawClock() {

	ctx.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);	
	shadowState("strong");
  
  if(clockType==="analog"){

	drawFace(ctx, radius*0.9);
    shadowState("weak");
  	drawNumbers(ctx, radius*0.9);
  	drawTime(ctx, radius);
	var posX=5;
	var posY=canvas.height/2;
        drawDate(ctx,posX,posY);

  }
  if(clockType==="digital"){
	drawDigitalClock();
	var posX=5;
	var posY=canvas.height/4;
        drawDate(ctx,posX,posY);
  }	

}

function drawDigitalClock() {
    	 shadowState("none");
	var now = new Date();
    	var hour = now.getHours();
    	var minute = now.getMinutes();
    	var second = now.getSeconds();
  	if(hour<10) hour="0"+hour;    
  	if(minute<10) minute="0"+minute;    
  	if(second<10) second="0"+second;    
	
	var font = canvas.width/4;
	
	ctx.font = font+'px "Roboto"';
  	ctx.fillStyle = digitalColor;
	ctx.textBaseline="middle";
	ctx.textAlign="center"; 
	var posX=0;
	var posY=-canvas.height/5;

	ctx.fillText(hour+":"+minute+":"+second,posX, posY);
}

function drawFace(ctx, radius) {
	
  var grad;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = innerCircleColor;
  ctx.fill();
  ctx.beginPath();
  ctx.strokeStyle = outerCircleColor;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = hourHandColor;
  ctx.fill();

}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.012 + "em arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  ctx.fillStyle = numbersColor;

  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();


    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07,hourHandColor);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07,minuteHandColor);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.8, radius*0.03,secondHandColor);
    ctx.beginPath();
    ctx.fillStyle=outerCircleColor;    	
    ctx.arc(0, 0, radius*0.07, 0, 2*Math.PI);
    ctx.fill(); 	

}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;	
    ctx.stroke();
    ctx.rotate(-pos);
}


function drawDate(ctx,posX,posY) {

	var font =canvas.width/8;
	shadowState("none");
	ctx.font = font+"px Roboto";
  	ctx.fillStyle = dateColor;
	ctx.textAlign="center"; 
	ctx.fillText(returnDate(),posX, posY);

}

function shadowState(strength){
	if(strength=="strong"){
		
		ctx.shadowColor   = '#333';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur    = 5;
		
	}else{
		if(strength=="weak"){
			
			ctx.shadowColor   = '#333';
			ctx.shadowOffsetX = 1;
			ctx.shadowOffsetY = 1;
			ctx.shadowBlur    = 3;
			
		}else{
		
			ctx.shadowColor   = '#FFF';
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur    = 0;
			
		}
	}
	
}




function returnDate(){

    var date = new Date();
	
	weekday = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
	month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

	var w = weekday[date.getDay()]; 
	var m = month[date.getMonth()];
	return w+" " +date.getDate()+" "+m;   

}
		$( window ).resize(function() {
			
			setTypeOfClock();
        });

	function setTypeOfClock(){
        	var winWidth = $( window ).width();
                var winHeight = $( window ).height();
		
                        var type;
                        if(winWidth < 350 || winHeight<350) {
                                clockType="digital";
				canvas.height=180;
				canvas.width=210;

				radius = canvas.width / 2;

				ctx.translate(radius, radius);
				radius *=0.9;	

                        }
                        else{
                                clockType="analog";
				canvas.height=250;
				canvas.width=220;
				radius = canvas.width / 2;
				ctx.translate(radius, radius);
				radius *= 0.9;	

			}
       drawClock(); 
	}
	
}

