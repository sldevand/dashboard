//Basic Widget
//Dependency : colorTools
function WidgetAbstract(p_id){
	
	var widget = {
		id:p_id,		
		name:"widget",		
		animTime:300.0,
		animstep:1.00,		
		sizeRatio:1.0,
		progressRatio:0.1,
		canvas : null,
		ctx : null,
		container : null,
		posX : 0.0,
		posY : 0.0,
		progress:0.0,
		startTime:-1,
		drawPending:false,
		animationEnded:false,
		backgroundColor:"teal",
		textColor:"lightgray",
		mouse:{up:false,down:false},
		lastMove:null,		
		apiData:[],	
		
		init : function(){		
			
			widget.canvas=document.getElementById(widget.id);
			widget.ctx = widget.canvas.getContext("2d");
			widget.container = $("#"+widget.id).parent();
							
			widget.fitToContainer();		
			requestAnimationFrame(widget.drawFrame);
		},
		
		initEventListeners : function(){
			widget.onTouchStartListener();
			widget.onTouchMoveListener();
			widget.onTouchEndListener();
			widget.onClickListener();
			widget.onMousedownListener();
			widget.onMouseupListener();
			widget.onMousemoveListener();				
			
		},
		
		draw: function() {  
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
			this.ctx.rect(0,0,this.canvas.width*this.progressRatio,this.canvas.height);
			this.ctx.fill();
			
		},
			
		animate	: function() { 	
		
			this.progressRatio=this.progress/this.animTime;
			
		 
		},

		fitToContainer : function(){			
			this.canvas.width  = this.container[0].clientWidth;		
			this.canvas.height = this.container[0].clientWidth*widget.sizeRatio;	
			console.log(this.container);		
		
		},
		
		onAnimationEnd : function(){
			this.animationEnded=true;		
		},
		
		resizeUpdate : function(){	
			widget.fitToContainer();
			widget.draw();			
		},
		
		onClickListener : function(){
			widget.canvas.addEventListener("click",widget.onClickCallback,false);
		},
		
		onClickCallback : function(evt){			
			evt.preventDefault();		
			var pos = widget.getMousePos(evt);
			
		},

		onTouchStartListener : function(){
			widget.canvas.addEventListener("touchstart",widget.onTouchStartCallback,false);
			
		},
		
		onTouchStartCallback : function(evt){
			evt.preventDefault();		
			var pos = widget.getTouchPos(evt);
			widget.lastMove=evt;	
			console.log(pos);
			
		},

		onTouchMoveListener : function(){
			widget.canvas.addEventListener("touchmove",widget.onTouchMoveCallback,false);
			
		},
		
		onTouchMoveCallback : function(evt){
			evt.preventDefault();		
			var pos = widget.getTouchPos(evt);
			widget.lastMove=evt;
			console.log(pos);
			
		},
		
		onTouchEndListener : function(){
			widget.canvas.addEventListener("touchend",widget.onTouchEndCallback,false);
			
		},
		
		onTouchEndCallback : function(evt){
			evt.preventDefault();		
			var pos = widget.getTouchPos(widget.lastMove);
			console.log(pos);
			
		},
		
		getMousePos : function(evt){		
			var rect = widget.canvas.getBoundingClientRect();		
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top	  
			};		
		},
		
		getTouchPos : function(evt){		
			var rect = widget.canvas.getBoundingClientRect();		
			return {
				x: evt.touches[0].pageX - rect.left,
				y: evt.touches[0].pageY - rect.top	  
			};		
		},
		
		
		onMousedownListener : function(){
			widget.canvas.addEventListener("mousedown",widget.onMousedownCallback,false);
		},
		
		onMousedownCallback : function(evt){
			evt.preventDefault();		
			var pos = widget.getMousePos(evt);			
			widget.mouse.down=true;
			widget.mouse.up=false;			
			
		},
		
		onMousemoveListener : function(){
			widget.canvas.addEventListener("mousemove",widget.onMousemoveCallback,false);
		},
		
		onMousemoveCallback : function(evt){
			evt.preventDefault();		
			var pos = widget.getMousePos(evt);			
			
		},
		
		onMouseupListener : function(){
			widget.canvas.addEventListener("mouseup",widget.onMouseupCallback,false);
		},
		
		onMouseupCallback : function(evt){
			evt.preventDefault();		
			var pos = widget.getMousePos(evt);
			widget.mouse.down=false;
			widget.mouse.up=true;
			
		},	
		
		getHitBox : function(x,y,fromCenter){
			var hyp=0;	
			
			if(fromCenter){		
				x-=widget.canvas.width/2;
				y-=widget.canvas.width/2;			
			}		
			hyp=Math.sqrt(x*x+y*y);		
			return hyp;
		},
		
		drawFrame : function(timestamp){
			
			if (widget.startTime < 0) {
			  widget.startTime = timestamp;
		  } else {
			  widget.progress = timestamp - widget.startTime;		 
		  }	 
			widget.requestRedraw();
				if (widget.progress < widget.animTime) { 			
					window.requestAnimationFrame(widget.drawFrame);
					
				}
				else{				
					widget.onAnimationEnd();						
				}			
		},
		
		requestRedraw : function(){
	
			if (!widget.drawPending) {
				widget.drawPending = true;
				window.requestAnimationFrame(widget.redraw);
			}
		},
	
		redraw : function(){
			  widget.drawPending = false;
			  var i; 			
				widget.animstep=widget.progress;				
				widget.animate();
				widget.draw();						 
		},

		activateShaders : function(activate){
			
			if(activate){			
				this.ctx.shadowColor   = '#333';
				this.ctx.shadowOffsetX = 1;
				this.ctx.shadowOffsetY = 1;
				this.ctx.shadowBlur    = 2;			
			} else {			
				this.ctx.shadowOffsetX = 0;
				this.ctx.shadowOffsetY = 0;
				this.ctx.shadowBlur    = 0;
			}		
		}	
	};
	
	$(window).resize(function() {		
		window.requestAnimationFrame( widget.resizeUpdate);
	});

	
	
	
	return widget;

}


