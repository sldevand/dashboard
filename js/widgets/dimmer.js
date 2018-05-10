//Dimmer Widget
//Dependency : widget.js
function Dimmer(id){	

	var dimmer=new Widget(id);
	
	dimmer.animTime=250;
	dimmer.sizeRatio=0.15;
	dimmer.dataJSON={};
	dimmer.scaleX=0.90;
	dimmer.offsetX=0.0;
	dimmer.pos=0.0;
	
	dimmer.m_label=null;
	dimmer.m_min=0.0;
	dimmer.m_max=0.0;
	dimmer.m_value=0.0;
	dimmer.m_range=0.0;	
	dimmer.temporize=null;	
	dimmer.apiData=[];		
	
	dimmer.generateHtml = function(){
		
		return '<canvas id="'+this.id+'" class="valign dimmer" />';
	}	
	
	dimmer.initValues = function(label,min,max,value,range){
			
		this.m_label=label;
		this.m_min=min;
		this.m_max=max;
		this.m_value=value;
		this.m_range=range;	
		this.textColor=rgb2hex(getColor("textOnBodyColor"));
		this.backgroundColor=rgb2hex(getColor("secondaryTextDarkColor"));	

	}
	
	dimmer.draw = function(){
		this.ctx.clearRect(0, 0, this.canvas.width,this.canvas.height);	
		this.activateShaders(true);	
		this.ctx.fillStyle="lightgray"; 
		this.ctx.strokeStyle=this.textColor;
		this.activateShaders(false);
			
		//BAR
		
		this.ctx.rect(dimmer.offsetX,this.canvas.height/2.5,this.canvas.width*this.valueRatio*this.scaleX,this.canvas.height/5);		
		this.ctx.fill();
		
		this.ctx.fillStyle=this.backgroundColor; 
		this.activateShaders(true);	
		
		//DOT
		this.ctx.beginPath();		
		this.ctx.arc((this.canvas.width*this.valueRatio*this.scaleX)+dimmer.offsetX,this.canvas.height/2,this.canvas.height/5,0,2*Math.PI);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
		
		this.activateShaders(false);
		
		//TEXT		
		this.ctx.textBaseline="middle";
		this.ctx.textAlign="center";
		var text_height=Math.floor(this.canvas.height/4);			
		this.ctx.font = text_height+"px Roboto";	

			//Value
			this.ctx.fillText(this.m_value, this.canvas.width*this.valueRatio*this.scaleX+dimmer.offsetX, this.canvas.height/7);	
			
			//Name
			this.ctx.fillText(dimmer.m_label, this.canvas.width/2, this.canvas.height/1.1);	
	}
	
	dimmer.animate = function(){		
		dimmer.offsetX=((1.0-dimmer.scaleX)*dimmer.canvas.width)/2;
		
		if(!this.animationEnded){
			this.progressRatio=(this.progress/this.animTime);
		}else{
			this.progressRatio=1.0;
		}		
		
		this.valueRatio = this.progressRatio*(dimmer.m_value/(dimmer.m_max-dimmer.m_min));
		
		
	}
	
	dimmer.calculateRatio=function(){
		
		this.valueRatio=dimmer.m_value/(dimmer.m_max-dimmer.m_min);
	}
	
	dimmer.sendData = function(){
	
		clearTimeout(dimmer.temporize);
	
		dimmer.temporize = setTimeout(function(){			
			socket.emit("updateDimmer",dimmer.apiData);
		},20);	
		
	}
	
	dimmer.sendDataPersist = function(){		
	
		clearTimeout(dimmer.temporize);
	
		dimmer.temporize = setTimeout(function(){			
			socket.emit("updateDimmerPersist",dimmer.apiData);

		},30);	


	}
	
	dimmer.onClickCallback = function(evt){
				
		evt.preventDefault();		
		var pos = dimmer.getMousePos(evt);	
		dimmer.calculate(pos);
		dimmer.apiData.etat=dimmer.m_value;	

		dimmer.sendDataPersist();
		
		
		
	}
	
	dimmer.onTouchEndCallback = function(evt){
		evt.preventDefault();		
		var pos = dimmer.getTouchPos(dimmer.lastMove);	
		dimmer.calculate(pos);
		dimmer.apiData.etat=dimmer.m_value;	

		dimmer.sendDataPersist();		
		

	}
	
	dimmer.onTouchMoveCallback = function(evt){
		evt.preventDefault();		
		dimmer.lastMove=evt;
		var pos = dimmer.getTouchPos(evt);		
		dimmer.calculate(pos);	
		dimmer.apiData.etat=dimmer.m_value;	
		dimmer.sendData();
	}
	
	
	
	dimmer.onMousemoveCallback = function(evt){
		evt.preventDefault();		
		if(dimmer.mouse.down){
			var pos = dimmer.getMousePos(evt);
			dimmer.calculate(pos);
			dimmer.apiData.etat=dimmer.m_value;	
			dimmer.sendData();
		}
	}

	dimmer.onMouseOutListener = function(){

		dimmer.canvas.addEventListener ("mouseout", dimmer.onMouseOutCallback, false);
	}

	dimmer.onMouseOutCallback = function(evt){

		dimmer.mouse.down=false;
		dimmer.mouse.up=true;


	}


	
	dimmer.calculate = function(pos){	
		dimmer.pos=pos;
		dimmer.offsetX=((1.0-dimmer.scaleX)*dimmer.canvas.width)/2;
		
		dimmer.m_value=Math.floor(((pos.x-dimmer.offsetX)/dimmer.canvas.width/this.scaleX)*(dimmer.m_max-dimmer.m_min));
		if(dimmer.m_value<dimmer.m_min)dimmer.m_value=dimmer.m_min;
		if(dimmer.m_value>dimmer.m_max)dimmer.m_value=dimmer.m_max;

		dimmer.animate();
		dimmer.resizeUpdate();
	}	
	
	dimmer.roundRect = function(x, y, w, h, r){
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.ctx.beginPath();
		this.ctx.moveTo(x+r, y);
		this.ctx.arcTo(x+w, y,   x+w, y+h, r);
		this.ctx.arcTo(x+w, y+h, x,   y+h, r);
		this.ctx.arcTo(x,   y+h, x,   y,   r);
		this.ctx.arcTo(x,   y,   x+w, y,   r);

		//this.activateShaders(false);	
		this.ctx.fill();		
		//this.activateShaders(true);	
		this.ctx.stroke();
	
		this.ctx.closePath();
		
	}	
	

	return dimmer;
}

