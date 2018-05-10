 
	var clipboard = new ClipBoard("clipboard");
	
	var clipboards;
	var clipboardsJSON;
	var nbClipboards;
	
	function getClipboardsFromJSON(){	
		clipboards=[];	
		clipboardsJSON =[];	
		nbClipboards=1;

		
		$.getJSON('json/clipboards.json?'+new Date().getTime(), function(data){	
			$("#widget-clipboard-content").html("");	
			clipboardsJSON=data.clipboards;			
			nbClipboards=clipboardsJSON.length;	

			generateClipBoardHtml("clipboard");
			clipboard.content=clipboardsJSON[0].content;
			clipboard.name=clipboardsJSON[0].name;
			clipboard.init();			
			$('.materialize-textarea').trigger('autoresize');
			Materialize.updateTextFields();		

		});	
	}
  
		
  
	function generateClipBoardHtml(id){			  
			  
			$("#widget-clipboard-content")
				.append('<form class="col s12">'+
							'<div class="row">'+
								'<div class="input-field col s12">'+
									'<textarea id="'+id+'" class="materialize-textarea"></textarea>'+
									'<label class="active" for="'+id+'">Liste de courses</label>'+
								'</div>'+
							'</div>'+
							'<div id="'+id+'butrow" class="row">'+
								'<a id="'+id+'cancel" class="waves-effect waves-light btn-flat col s6 center  secondaryTextColor"><i class="material-icons">cancel</i></a>'+
								'<a id="'+id+'ok" class="waves-effect waves-light btn-flat large col s6 center primaryTextColor"><i class="material-icons">done</i></a>'+
												
							'</div>'+
								
						'</form>'
								
								);					
								
								
			$("#"+id+"butrow").hide();
			initClipBoardListeners(id);
	}
	
	function initClipBoardListeners(id){
			$("#"+id+"ok").click(function(){
				
				clipboard.content= $("#"+id).val();
				
				var jsonToSend={"name":clipboard.name,"content":clipboard.content};
				
				
				
				widgetJsonFileManage(jsonToSend,"clipboards","change","courses");	
				
				$("#"+id+"butrow").fadeOut();
			});

			$("#"+id+"cancel").click(function(){
				
				$("#"+id+"butrow").fadeOut();
			});
				
			
			$("#"+id).keypress(function(){
				
				
				$("#"+id+"butrow").fadeIn();
				
				
				
			});			
	}
 
	
	
	
