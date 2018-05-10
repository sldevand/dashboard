$(document).ready(function(){
	

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	function generateModalHtml(id){
	
		var prepHtml = 
			' <div class="fixed-action-btn">'+
					'<a class="btn-floating btn-large waves-effect waves-light secondaryColor"id="'+id+'btn">'+
						'<i class="material-icons">add</i>'+
					'</a></div>'+		
			  '<div id="'+id+'" class="modal">'+
				'<div id="'+id+'content" class="modal-content row">'+
					
				'</div>'+
				'<div id="'+id+'footer" class="modal-footer">'+
				  '<a id="helpBtn" class="waves-effect waves-green btn-flat left">Aide</a>'+
				  '<div id="helpDiv"></div>'+
				  '<a id="'+id+'ok" class="modal-action waves-effect waves-green btn-flat">OK</a>'+
				  '<a id="'+id+'cancel" class="modal-action modal-close waves-effect waves-green btn-flat">Annuler</a>'+
				  '<div id="'+id+'errorHolder" class="flow-text"></div>'+
				'</div>'+
			'</div>';
			
		return prepHtml;
	
	}
	
	var modalId="modalForm";
	
	$('body').append(generateModalHtml(modalId));

	
	var wWindow = new WidgetWindow("factory");	
	wWindow.generateHtml();
		
	
	
	$('#'+modalId+'btn').click(function(){	
		wWindow.resetAll();
		$('#'+modalId).modal('open');
		$('select').material_select();	
		
	});
	
	$('#'+modalId+'ok').click(function(){	
		var type=wWindow.okButtonCallback();		
		if(type==="error"){
			$('#'+modalId+'errorHolder').text("Veuillez remplir tous les champs").fadeIn('slow').delay(1000).fadeOut('slow');
		}else{
			
						
			widgetJsonFileManage(wWindow.dataTemp,type,"add","");
			
			$('#'+modalId).modal('close');

			var name = wWindow["dataTemp"]["name"];
			var data = wWindow["dataTemp"];
			
			$('#'+type).append(generateWidgetCardHtml(type,name));	
			
			addListenersToCard(type,name,data);	
			
			wWindow.resetAll();	
		}			
	});
	
	$('#'+modalId+'cancel').click(function(){	
		wWindow.cancelButtonCallback();
		
	});	
	
	
		
	
	
	
	$('select').material_select();
    $('.modal').modal();				
	$('#'+modalId).css("width","90%");
});



