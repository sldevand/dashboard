function Slider(id){	
			
		
	var slider = {
		
		m_id:id,
		m_label:"",
		m_prefix:"",
		m_min:0,
		m_max:100,
		m_range:1,	
		m_value:0,
		
		init : function(label,min,max,value,range){
			this.m_id=id;
			this.m_label=label;
			this.m_min=min;
			this.m_max=max;
			this.m_value=value;
			this.m_range=range;						
		},
		
		generateHtml : function(){
			
			var prepHtml=			
			'<p class="range-field">'+	 
				'<input id="'+slider.m_id+'" type="range" min="'+slider.m_min+'" max="'+slider.m_max+'" value='+this.m_value+' />'+
				'<label for="'+slider.m_id+'">'+slider.m_label+'</label>'+
			'</p>';		
		
			return prepHtml;
		},
		
		initListeners :function(){
			
			var that=this;
			console.log(that.m_id,"initListeners");
			
			$("#"+this.m_id).on("change",function(){									
					
					that.m_value=$(this)[0].value;											
					that.releaseCallback();
			});
			
			$("#"+this.m_id).on("input",function(){					
					
					that.m_value=$(this)[0].value;											
					that.slideCallback();
			});
		},
		
		slideCallback : function(){
			
			var obj = {id:this.m_id,value:this.m_value};
			
			console.log(this.m_id,"on slide",this.m_value);	
			return obj;
		},
		
		releaseCallback : function(){
		var obj = [this.m_id,this.m_value];		
			console.log(this.m_id,"on release",this.m_value);
		return obj;			
		}
		
	};
		
	return slider;	
}

function Sliders(number){	
			
	var sliders={			
		m_number:number,
		slidersArray:[],
		
		init : function(){				
			for(var i=0;i<this.m_number;i++){
				this.slidersArray.push(new Slider("monSlider"+i));							
			}				
		},

		generateHtml : function(id){
			for(var i=0;i<this.m_number;i++){				
					$(id).append(this.slidersArray[i].generateHtml());					
					this.slidersArray[i].initListeners();					
			}			
		}
		
		
	};		
return sliders;	
}
	
 
