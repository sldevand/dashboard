function Graph(id){
	var m_id=id;
	var canvas;
 	var	ctx;
	var container;	
	
	generateGraphHtml(m_id);
	
	canvasSelect(m_id);
	
	function canvasSelect(id){		
		canvas = document.getElementById(id);
 		ctx = canvas.getContext("2d");	
		container = $(canvas).parent();	
	}
	
	var graph = {
		id:m_id,	
		name:"graph1",
		date:'0000-00-00',
		dateEnd:'0000-00-00',
		dateScale:1.0,
		textcolor:"#000000",
		textdicolor:"#000000",
		namecolor:"black",
		graphcolor:"#FF0000",
		axiscolor:"black",
		unitcolor:"black",	
		bgcolor:"white",
		unitname:"°C",
		timeLabel:"Heure",
		graphthickness:5,		
		miniX:0.0,
		maxiX:500.0,
		miniY:-20.0,
		maxiY:50.0,	
		zoomY:0.95,
		cursorX:0,	
		animtime:5000.0,
		animstep:1.00,		
		animEnded:false,
		axisDone:false,
		posX : canvas.width/2.0,
		posY : canvas.height/1.5,
		xpos :0,
		ypos :0,
		rightOffsetX:canvas.width-canvas.width/16,
		offsetX:canvas.width/8,
		offsetY:0.0,
		gradX:1.0,
		gradY:1.0,
		samplesnb:1,
		cursorXprec:0,
		curHeight : canvas.height,
		curWidth : canvas.width,
		ratioX:0.0,
		ratioY:0.0,	
		shadow:false,
		graphData:[],
		mousePos:{x:0,y:0},
		dataDots:[],
		dotRadius:4.0,
		alphaCanal:1.0,
		saved_rect:new Image(),
		pending_timeOut:null,	
		pending_Interval:null,
		dataDot:function(x, y, radius, name,val,time,date){

			var dataDotObj = {
				m_left:x-radius,
				m_top:y-radius,
				m_right:x+radius,
				m_bottom:y+radius,
				m_name:name,
				m_val:val,
				m_time:time,
				m_date:date,
				m_opacity:0.5			
			};
	
		return dataDotObj;
	},
	
	init : function(){
			this.eventListenerRemove();	
	
		//this.sampleGraphData();	
		this.initDrawConf();
		
		
		
		
	},
	
	initDrawConf : function(){
		canvasSelect(this.id);	
		this.fitToContainer();	
		this.dotRadius = canvas.width/200.0;
		this.graphthickness=this.dotRadius/2.0;
		this.miniX=0.0;
		this.maxiX=24.0*this.dateScale;
		this.gradX=((this.maxiX-this.miniX)/this.maxiX)*this.dateScale;
		this.offsetX=canvas.width/16.0;
		this.rightOffsetX=canvas.width/16.0;
		this.posX=0;
		this.ratioX=((canvas.width-this.rightOffsetX)-(this.offsetX+this.posX))/(this.maxiX-this.miniX);	
		
		this.ratioY = (canvas.height*this.zoomY)/(this.maxiY-this.miniY);		
		this.posY=Math.floor(this.curHeight-(1-this.zoomY)/2*this.curHeight+(this.miniY*this.ratioY));
		this.cursorX=0;
		this.animEnded=false;
		this.axisDone=false;		
		this.dataDots=[];	
		this.activateShaders(this.shadow);
		this.axiscolor=rgb2hex(getColor("textOnBodyColor"));
		this.namecolor=rgb2hex(getColor("textOnBodyColor"));
		this.textcolor=rgb2hex(getColor("textOnBodyColor"));
		this.unitcolor=rgb2hex(getColor("textOnBodyColor"));	
		this.drawAxis();		
		this.drawGraph();
	},
	
	sampleGraphData: function(){
		
		var dataTemp =[];
		var count = 0;
		var sampleCount=0;
		var samplesnb = this.samplesnb;
		
		this.graphData.forEach(function(element) {
			if(count<samplesnb) {count++;}
			else {			
				dataTemp.push(element);				
				count=0;						
			}
		});	
		
		this.graphData=dataTemp;	
		
	},
	
	drawAxis : function(){	
		/*-------------DRAW AXISES-------------------*/
		canvasSelect("axis"+graph.id);	
		this.fitToContainer();
		ctx.beginPath();
		ctx.strokeStyle=this.axiscolor;		
	
		//X AXIS
		var endXAxis = canvas.width-this.rightOffsetX/2;
		
		ctx.moveTo(this.posX+this.offsetX,this.posY);
		ctx.lineTo(endXAxis,this.posY);	
		ctx.moveTo(endXAxis-canvas.width/64.0,this.posY-canvas.height/64.0);
		ctx.lineTo(endXAxis,this.posY);	
		ctx.moveTo(endXAxis-canvas.width/64.0,this.posY+canvas.height/64.0);
		ctx.lineTo(endXAxis,this.posY);	
		
		
		ctx.font = Math.floor((canvas.width/50))+"px Roboto";
		//X AXIS GRAD+TEXT
		var x;		

		var time=0;	
		
		for(x=this.miniX+this.gradX;x<=this.maxiX;x+=this.gradX){			
			
			//X AXIS GRAD		
			var xpos = Math.floor(this.posX+x*this.ratioX);					
			ctx.moveTo(this.offsetX+xpos,this.posY-canvas.width/160);
			ctx.lineTo(this.offsetX+xpos,this.posY+canvas.width/160);
			
			//X AXIS TEXT			
			ctx.textBaseline="middle";
			ctx.textAlign="center";
			ctx.fillStyle=this.textcolor;			
			time++;			
			ctx.fillText(time, this.offsetX+xpos, this.posY+canvas.width/(800/15.0));
		}			
		
		//Y AXIS
		ctx.moveTo(this.posX+this.offsetX,(this.curHeight-this.offsetY)*this.ratioY);
		ctx.lineTo(this.posX+this.offsetX,this.offsetY);		
		
		//Y AXIS GRAD+TEXT
		var y;
		for(y=this.miniY;y<=this.maxiY;y+=this.gradY){	
		
			//Y AXIS GRAD		
			var ypos = Math.floor(this.posY-y*this.ratioY);				
			ctx.moveTo(this.posX+this.offsetX-canvas.width/160.0,ypos);
			ctx.lineTo(this.posX+this.offsetX+canvas.width/160.0,ypos);	

			//Y AXIS TEXT			
			ctx.textBaseline="middle";
			ctx.textAlign="left";
			ctx.fillStyle=this.textcolor;
			ctx.fillText( y, this.offsetX-canvas.width/(800.0/30.0), ypos);			
		}	

		//Y UNIT LABEL
		ctx.font = Math.floor(canvas.width/25)+"px Roboto";
		ctx.fillStyle=this.unitcolor;
		if(this.unitname=="degC"){this.unitname="°C";}
		ctx.fillText(this.unitname, Math.floor(this.offsetX*1.15)+this.posX, Math.floor(canvas.height/25));
		ctx.closePath();		
		ctx.stroke();
		
		
		//TITLE
		ctx.textAlign="center";
		ctx.font = Math.floor(canvas.width/25)+"px Roboto";
		ctx.fillStyle=this.unitcolor;
		ctx.fillText(this.name, canvas.width/2+this.offsetX, Math.floor(canvas.height/25));
		ctx.fillText(this.date, canvas.width/2+this.offsetX, Math.floor(canvas.height/10));
		ctx.fillText("<", canvas.width/2-this.offsetX, Math.floor(canvas.height/10));	
		ctx.fillText(">", canvas.width/2+3*this.offsetX, Math.floor(canvas.height/10));
		this.axisDone=true;	


		
	},
	
	drawGraph : function() {
		//DRAW GRAPH
		canvasSelect("axis"+graph.id);	
		ctx.strokeStyle=this.graphcolor;
		ctx.lineWidth=this.graphthickness;
	
		ctx.moveTo(this.offsetX+this.xpos,this.ypos);	
		ctx.beginPath();
		
		for(this.cursorX=0;this.cursorX<this.graphData.length;this.cursorX++){
		
			this.calculate();		
			ctx.lineTo(this.offsetX+this.xpos,this.ypos);
			this.drawDot(this.offsetX+this.xpos,this.ypos);				
		}
		
		ctx.stroke();
		ctx.closePath();
		
	
		this.onAnimationEnd();		
		
	},	
	
	calculate : function(){			
	
		var currentTs=toTimestamp(this.graphData[this.cursorX].horodatage);	
		var timeStampStart=toTimestamp(this.date+' 00:00:00');
		
	
		
		//Calculate Xpos
		var timeRatio = (currentTs-timeStampStart)/(3600.0);	
		var xOrigin = this.posX + this.offsetX;
	
		
		this.xpos = Math.floor(   timeRatio *this.ratioX);	

		//Calculate Ypos
		var y=this.graphData[this.cursorX].temperature;		
		this.ypos = Math.floor(this.posY-y*this.ratioY);
	},	
	
	timeToSec : function(strTime){		
		var time=this.timeToArray(strTime);
		return parseInt(time.hour)*3600+parseInt(time.minute)*60.0+parseInt(time.second);		
	},
	
	
	
	onAnimationEnd : function(){
		this.animEnded=true;		
		this.eventListenerInit();	
		this.removeSpinner();
		
		graph.fitToContainer();
		canvasSelect(graph.id);
		graph.fitToContainer();
		$("#"+graph.id+"cont").css("height",canvas.height+5);

		graph.fitToContainer();
	},	
	
	drawDot : function(x,y){		
		var dot = this.dataDot(x,y,3,"dot"+this.cursorX,this.graphData[this.cursorX].temperature,getTime(this.graphData[this.cursorX].horodatage),getDate(this.graphData[this.cursorX].horodatage));	
		this.dataDots.push(dot);		
	},	
	
	fadeOutDotInfo : function(dot){
						
		var that = this;
		
		this.pending_Interval = setInterval(function(){			
			if(that.alphaCanal>0){
				that.alphaCanal-=0.05;			
				that.drawDotInfoText(dot);					
			}
			else{
				that.alphaCanal=1.0;	
				ctx.fillStyle = hexToRgbA(that.textcolor,that.alphaCanal);		
				clearTimeout(that.pending_timeOut);										
				clearInterval(that.pending_Interval);						
			}			
			
		},16);			
	},
	
	drawDotInfo : function(dot){
						
			ctx.clearRect(0,0,canvas.width,canvas.height);
			clearTimeout(this.pending_timeOut);							
			clearInterval(this.pending_Interval);
			ctx.fillStyle=this.textcolor;
		
			this.alphaCanal=1.0;	
			ctx.fillStyle = hexToRgbA(this.textcolor,this.alphaCanal);	
		
			var that=this;
			this.drawDotInfoText(dot);
	
			this.pending_timeOut = setTimeout(function() {
				that.fadeOutDotInfo(dot);				
			},2000);							
	},
	
	drawDotInfoText : function(dot,alphaCanal){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		var text_height=Math.floor(canvas.height/25);	
		
		ctx.font = text_height+"px Roboto";		
		ctx.textBaseline="middle";
		ctx.textAlign="center";	
	
		var text0="Jour : "+dot.m_date;
		var text1="Heure : "+dot.m_time;
		var text2="Valeur : "+dot.m_val;		
		
		var text_width = ctx.measureText(text0).width;		
		
		this.activateShaders(true);	
		
		//Back rectangle
		ctx.fillStyle = hexToRgbA("#FFFFFF",this.alphaCanal-0.2);	
		ctx.strokeStyle = hexToRgbA(this.graphcolor,this.alphaCanal);	
		
		
		//Inner Text Positions
		var textPosX = dot.m_right;
		var text0PosY = dot.m_top-text_height*4;
		var text1PosY = dot.m_top-text_height*3;
		var text2PosY = dot.m_top-text_height*2;
		
		//Back rectangle positions
		var rectPosX = textPosX - text_width/1.2;		
		var rectPosY = dot.m_top-text_height*4.7;		
		var rectWidth = text_width*1.6;
		var rectHeight = dot.m_bottom-dot.m_top+text_height*3;
		
		
		//offsets
		var offsetX = 0;
		var offsetY = 0;
		
		//Limits	
		if(rectPosX<this.offsetX) {
			rectPosX=this.offsetX;
			textPosX=this.offsetX+text_width/1.2;
		}
		
		if(rectPosX>canvas.width-text_width*1.6) {
			rectPosX=canvas.width-text_width*1.6;
			textPosX=canvas.width-text_width/1.2;
		}		
		
		if(rectPosY<0) offsetY = text_height*6;
		else offsetY = 0;
		
		
		
		
				
		this.roundRect(rectPosX+offsetX, rectPosY+offsetY,rectWidth,rectHeight ,3);
		
		this.activateShaders(false);	
		
		//Text Contents	
		ctx.fillStyle = hexToRgbA(this.textdicolor,this.alphaCanal);
		ctx.fillText(text0 , textPosX+offsetX, text0PosY+offsetY);
		ctx.fillText(text1 , textPosX+offsetX, text1PosY+offsetY);		
		ctx.fillText(text2 , textPosX+offsetX, text2PosY+offsetY);
		
		this.activateShaders(true);		
		
		//Dot Highlight	
		ctx.beginPath();
		ctx.strokeStyle = hexToRgbA(this.graphcolor,this.alphaCanal);	
		ctx.fillStyle = hexToRgbA(this.graphcolor,this.alphaCanal-0.2);
		ctx.arc(dot.m_left+ this.dotRadius, dot.m_top +this.dotRadius, this.dotRadius*2, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		
		this.activateShaders(false);	
		
	},
	
	activateShaders : function(activate){
		
		if(activate){			
			ctx.shadowColor   = '#333';
			ctx.shadowOffsetX = 1;
			ctx.shadowOffsetY = 1;
			ctx.shadowBlur    = 2;			
		} else {			
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur    = 0;
		}		
	},
	
	setMousePos : function(){		
		
		for(var i=0; i<this.dataDots.length;i++){					
			if (this.mousePos.x > this.dataDots[i].m_left && this.mousePos.x < this.dataDots[i].m_right){					
				this.drawDotInfo(this.dataDots[i]);		
				break;
			}				
		}		
	},	

	eventListenerInit : function(){	
		
		canvasSelect(graph.id);	
		canvas.addEventListener('mousemove', this.eventMouseMoveListenerCallback, false);	
		canvas.addEventListener('touchmove', this.eventTouchMoveListenerCallback, false);	
		canvas.addEventListener('click', this.eventClickListenerCallback, false);	
		
	},	
	
	eventMouseMoveListenerCallback : function(evt){
		evt.preventDefault();			
		graph.mousePos=graph.getMousePos(evt);	
		graph.setMousePos();		
	},	
	
	getMousePos : function(evt){		
		var rect = canvas.getBoundingClientRect();		
        return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top	  
        };		
	},
	
	eventTouchMoveListenerCallback : function(evt){
		evt.preventDefault();		
		graph.mousePos=graph.getTouchPos(evt);	
		graph.setMousePos();		
	},	
	
	eventClickListenerCallback : function(evt){		
		evt.preventDefault();		
		graph.mousePos=graph.getMousePos(evt);		
		graph.changeDateCallback();		
	},
	
	changeDateCallback:function(){
		
		var choice=null;
		
		if(graph.mousePos.x>(canvas.width/2-this.offsetX-15) && graph.mousePos.x<(canvas.width/2-this.offsetX+15)
			&& graph.mousePos.y>Math.floor(canvas.height/10-15) && graph.mousePos.y<Math.floor(canvas.height/10+15)
		) {choice="minus";}
			
		
		if(graph.mousePos.x>(canvas.width/2+3*this.offsetX-15) && graph.mousePos.x<(canvas.width/2+3*this.offsetX+15)
			&& graph.mousePos.y>Math.floor(canvas.height/10-15) && graph.mousePos.y<Math.floor(canvas.height/10+15)
		) {choice="plus";}	
	
		return choice;
	},
	
	getTouchPos : function(evt){		
		var rect = canvas.getBoundingClientRect();		
        return {
			x: evt.touches[0].pageX - rect.left,
			y: evt.touches[0].pageY - rect.top	  
        };		
	},
	
	eventListenerRemove : function(){
		
		canvasSelect(graph.id);	
		canvas.removeEventListener('mousemove', this.eventMouseMoveListenerCallback, false);
		canvas.removeEventListener('touchmove', this.eventTouchMoveListenerCallback, false);
		canvas.removeEventListener('click', this.eventTouchMoveListenerCallback, false);
	},
	
	
	
	timeToArray : function(time){
		
		 var splitTime = time.split(":");

		var timeStruct = {
			hour:splitTime[0],
			minute:splitTime[1],
			second:splitTime[2]
		};
	
		return timeStruct;
	},

	roundRect : function(x, y, w, h, r) {
		
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		ctx.beginPath();
		ctx.moveTo(x+r, y);
		ctx.arcTo(x+w, y,   x+w, y+h, r);
		ctx.arcTo(x+w, y+h, x,   y+h, r);
		ctx.arcTo(x,   y+h, x,   y,   r);
		ctx.arcTo(x,   y,   x+w, y,   r);

		this.activateShaders(false);	
		ctx.fill();		
		this.activateShaders(true);	
		ctx.stroke();
	
		ctx.closePath();
		
	},
	
	fitToContainer : function(){			
		canvas.width  = container[0].clientWidth;		
		canvas.height =container[0].clientWidth*0.75;	
		this.curHeight = canvas.height;
		this.curWidth = canvas.width;	
		
	},
	
	resizeUpdate : function(){		
	
		graph.eventListenerRemove();	
		clearTimeout(graph.pending_timeOut);							
		clearInterval(graph.pending_Interval);	
		$("#"+graph.id+"cont").css("height",canvas.height+5);
		
		var toto = $("#"+graph.id).css("height");	
	
		graph.initDrawConf();		
		graph.drawAxis();	
		graph.drawGraph();			
	},
		
	
	removeSpinner : function(){
		
		$("#spinner"+this.id).remove();
		
	}
	
	};	
	
	 $(window).resize(function() {		
		window.requestAnimFrame( graph.resizeUpdate);
	});
	
	$( window ).on( "orientationchange",function(){
		
		console.log('orientation changed');
	});

	function generateGraphHtml(idx){	
		
		var prepHtml = '<div class="graphcont card-panel no-select" id="'+idx+'cont">'+	
			'<div class="center">'+spinner("spinner"+idx)+'</div>'+	
			'<canvas id="axis'+idx+'" class="axisgraph"  ></canvas>'+
			'<canvas id="'+idx+'" class="graph" ></canvas>'+
		'	</div>';	
		
		$("#graphcontainer").append(prepHtml);	
		
	}
	return graph;
}







