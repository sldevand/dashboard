function WidgetWindow(id){
	
	var m_id=id;
	
	var widgetWindow = {		
	
		options : {
			"type":{
				
				"graphs":{
					"name":"Salle de Bain",
					"folder":"data",
					"type":"sensor",
					"rf":"24",
					"probe":"ctn10",
					"id":"id2",
					"date":"06-04-17",
					"suffix":"log",					
					"unitname":"degC",
					"graphcolor":"#8e24aa",
					"miniY":-10.0,
					"maxiY":30.0,
					"gradX":5.0,
					"gradY":1.0			
				},		
				
				"interrupteurs":{
					"name": "Inter",
					"state": 0,
					"radioId":0,
					"anim": 1,					
					"dataInter":""				
				},
				
				"thermometers":{
					"name":"Exterieur",
					"id":"sensor24",					
					"liquidColor":"#ff6666",
					"textColor":"#F0F0F0",
					"nameColor":"#F0F0F0",
					"miniTemp":-20,
					"maxiTemp":40,
					"temp":"15",
					"precTemp":-20,
					"anim":1				
				}				
			}		
		},
		id:m_id,		
		
		dataTemp:{},			
		
		generateHtml : function(){	
			var prepHtml = this.generateTitleHtml();
			var titles;
			
		
			$("#modalFormcontent").append(prepHtml);			
	
			
			for(var i in this.options){				
				$("#modalFormcontent").append(this.generateSpinnerHtml(i,this.options[i]));
				this.initListener(i,"Spinner select");
		
			}	
			
		},
		
		generateTitleHtml : function(){
			var prepHtml = '<h5 id="newWidget">Nouveau Widget</h5>';
			return prepHtml;
		},
		
		generateSpinnerHtml : function(label,options){
			var prepHtml = '<div id="'+label+'Spinner" class="input-field col s12">'+
				'<select>'+
				 '<option value="'+label+'" disabled selected></option>';
				 
				for(var i=0;i<Object.keys(options).length;i++){					
					 prepHtml+='<option value="'+Object.keys(options)[i]+'">'+Object.keys(options)[i]+'</option>';
				}
				
			prepHtml+='</select>'+
				'<label for="'+label+'Spinner">'+label+'</label>'+
				'<div id="'+label+'subContainer" class="input-field col s12"></div>'+
			'</div>';		
			
			
		
			
			return prepHtml;
		},
		generateSubSpinnerHtml : function(label,value,options){
		
			var prepHtml = '<div id="'+label+'subSpinner" class="input-field col s12">'+
				'<select>'+
				 '<option value="'+value+'" disabled selected></option>';
				 
				for(var i=0;i<Object.keys(options).length;i++){					
					 prepHtml+='<option value="'+Object.keys(options)[i]+'">'+Object.keys(options)[i]+'</option>';
				}
				
			prepHtml+='</select>'+
				'<label for="'+label+'subSpinner">'+value+'</label>'+
			'</div>';		
		
			
			return prepHtml;
		},
		
		generateInputTextHtml : function(label){
			var prepHtml = '<div class="input-field col s12">'+
				'<input  placeholder="'+label+'" value="" id="'+label+'InputText" type="text" class="validate">'+
				'<label class="active" for="'+label+'InputText">'+label+'</label>'+
			'</div>';
			
			return prepHtml;			
		},
		
		generateSubInputTextHtml : function(label,value){
			
			
			
			var prepHtml = '<div class="input-field col s12">'+
				'<input placeholder="'+label+'" value="'+value+'" id="'+label+'subInputText" type="text" class="validate">'+
				'<label class="active" for="'+label+'subInputText">'+label+'</label>'+
			'</div>';
			
			return prepHtml;			
		},
		
		generateJSON:function(){
			
			return JSON.stringify(this.dataTemp); 			
			
		},
		
		
		
		cancelButtonCallback:function(){
			
			this.resetAll();
			
			
		},
		
		okButtonCallback:function(){
			
			if(Object.getOwnPropertyNames(this.dataTemp).length == 0) return "error";
		
			for(var i in this.dataTemp){
			
				if(this.dataTemp[i]===""){
					

					return "error";
				}
				
			}
			
			
	
			return $("#typeSpinner option:selected").val();
		},
		
		
		
		
		initListener : function(label,type){	
		
		var that=this;
			$("#"+label+type).change(function(){
			
				$("#typesubContainer").empty();		
								
				that.traverse(that.options.type[$(this).val()]);
				
			});
			
				
		},
		traverse:function (o){	
			
			for (i in o) {					
					$("#typesubContainer").append(this.generateSubInputTextHtml(i,o[i]));	
					this.initSubListener(i,"subInputText");	
					this.dataTemp[i]=o[i];			
			}
		},  
		

		initSubListener : function(label,type){
			
			$("#"+label+type).off("change");
			var that=this;
		
			$("#"+label+type).change(function(){		
						
				var tmpId=$(this).parent().parent().parent()[0].id;
				
				var parentValue=$('#'+tmpId+" option:selected").val();	
				var childName=$(this).prop('placeholder');
				var childValue=$(this).val();		
				that.dataTemp[childName]=childValue;				
						
			});			
		},
		
		dataReset : function(){
			
			this.dataTemp={};
		},
		
		resetAll : function(){
			
			this.dataReset();

			$("#helpDiv").empty();	
			$("#helpBtn").off("click");
			$("#helpBtn").click(function(){
				$("#helpDiv").html(
				'<img class="materialboxed responsive-img" src="docs/bufferSerialHelp.png" alt="bufferSerialHelp"/>'
				);
			});			
	
			$('#typeSpinner option[value="type"]').prop('selected',true);
			$('#typesubContainer').empty();				
		}
		
			
	};	
	
	
	function isObject(value) { /* Requires ECMAScript 3 or later */
		return Object(value) === value;
	}
	return widgetWindow;
}  
