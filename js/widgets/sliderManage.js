
	var sliders=[];			
	var slidersJSON =[];	
	var nbSliders=1;

	function getslidersFromJSON(){
		
		
		sliders=[];
		nbSliders=1;
		slidersJSON =[];	
			$.getJSON('json/sliders.json?'+new Date().getTime(), function(data){		
				slidersJSON=data.sliders;			
				nbSliders=slidersJSON.length;			
				loadSliders();
				
			});	
	}
	
	
	function loadSliders(){	
		var timeout=null;
				
		$("#dashsliderscontent").empty();	
		
		for(var i=0;i<nbSliders;i++){
			sliders.push(new Slider(slidersJSON[i].name));			
			sliders[i].init(slidersJSON[i].name,slidersJSON[i].minvalue,slidersJSON[i].maxvalue,slidersJSON[i].value,slidersJSON[i].range);
			sliders[i].m_prefix=slidersJSON[i].prefix;
			$("#dashsliderscontent").append(sliders[i].generateHtml());		
			
			
			var index=i;
			//Override slidersArray[0] Methods
			sliders[i].slideCallback=function(){	
				
				var dataSlider="bt/val/"+this.m_value+"/";
				
				clearTimeout(timeout);
				
				
				timeout=setTimeout(function(){
					console.log("sending",dataSlider);
					socket.emit("piassist",dataSlider);
				},20);
				
				
			};	
			
			sliders[i].releaseCallback=function(){
			
				slidersJSON[index].value=this.m_value;
				var that=this;		
		
				widgetJsonFileManage(slidersJSON[index],"sliders","change",slidersJSON[index].name);
				
			};
		
			
			
			sliders[i].initListeners();
	
		
		
	
			
		
		}
		
		
			
		
		

	}