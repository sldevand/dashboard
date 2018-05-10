


	var jsonFiles=[];
	var jsonObj=[];
	
	$('#editContainer').append(generateWidgetCardContainerHtml("cards"));
	browseFolder("../json");	
	
	function browseFolder(folderPath){		
		var params = {};
		params["getTree"] =folderPath;	
		
		$.post("php/widgetsRequests.php", params,function( data ) {				
			browseFolderCallback(data);
		});	
	}
	
	function browseFolderCallback(data){

		jsonFiles=$.parseJSON(data);	
		var index = jsonFiles.indexOf("config.json");
		jsonFiles.splice(index, 1);		
		generateCardsFromJson();
	}	
	
	function generateCardsFromJson(){
		var i;
		for(i=0;i<jsonFiles.length;i++){
			var title = jsonFiles[i].split(".");			
			$('#cards').append(generateWidgetTypeContainerHtml(title[0]));			
			getWidgetFromJson(i,title[0]);		
		}	
	}	
	
	function getWidgetFromJson(i,id){		
		$.getJSON('json/'+jsonFiles[i]+'?'+ new Date().getTime(), function(data){				
			jsonObj.push(data);		
			for(var i=0;i<data[id].length;i++){					
				createCardFromJson(i,data,id);
			}				
		});	
	}
	
	function selectJsonObject(name){
		
		var jsObj;
		
		jsonObj.forEach(function(element) {
			
			if(name === Object.keys(element)[0]){
				jsObj=element;				
			}			
		});
		return jsObj;
	}
	
	function selectArrayElement(name,jsArray){
		
	var jsTab;
	var jsElem;	
	var jsRet;
	var idx=0;		
		jsArray.forEach(function(element) {	
		 jsElem=element;			
			Object.keys(jsElem).forEach(function(element) {			
						
				if(jsElem[element]==name){jsRet=jsElem;}
				idx++;			
			});
		
		});
		return jsRet;
	}	
	
	function createCardFromJson(idx,data,type){			
		var name = data[type][idx].name;
		
		$('#'+type).append(generateWidgetCardHtml(type,name));			
		
		var jsObject = selectJsonObject(type)[type];		
		var jsArray=selectArrayElement(name,jsObject);
	
		addListenersToCard(type,name,jsArray);		
	}
	
	function addListenersToCard(type,name,data){		
		
		var childId = type+name;		
		childId=childId.replace(/ /g,"_");	
				
		generateEditFormHtml(childId,data);		
		
		$('#'+childId+'Edit').parent().append(
			'<a id="'+childId+'Ok" class="waves-effect waves-light primaryTextColor"><i class="material-icons">done</i></a>'+
			'<a id="'+childId+'Cancel" class="waves-effect waves-light secondaryTextColor"><i class="material-icons" >fast_rewind</i></a>'
		);		
		
		$('#'+childId+'Ok').hide();
		$('#'+childId+'Cancel').hide();
		$('#'+childId+"EditForm").hide();
		
		//Listeners		
		$("#"+childId+"Ok").click(function(){
			
			widgetJsonFileManage(data,type,"change",name);			
			
			$("#"+childId+"Cancel").hide();				
			$("#"+childId+"Ok").hide();				
			$('#'+childId+"EditForm").slideUp();				
			$('#'+childId+'Edit').fadeIn();			
			$("#"+childId+"Delete").fadeIn();	
		});
		
		$("#"+childId+"Cancel").click(function(){			
			$("#"+childId+"Cancel").hide();				
			$("#"+childId+"Ok").hide();				
			$('#'+childId+"EditForm").slideUp();				
			$('#'+childId+'Edit').fadeIn();			
			$("#"+childId+"Delete").fadeIn();				
		});
		
		$('#'+childId+'Edit').click(function(){							
			$('#'+childId+'Edit').hide();			
			$('#'+childId+'Delete').hide();			
			$('#'+childId+'Ok').fadeIn();			
			$('#'+childId+'Cancel').fadeIn();	
			$('#'+childId+'EditForm').slideDown();				
		});
		
		$('#'+childId+'Delete').click(function(){	
		
			console.log(data);
			warningDeleteModal(name,type);				
		
		});
		}
	
	function generateEditFormHtml(childId,jsonArray){
		
		//console.log('#'+childId+'Edit');
		
		$('#'+childId+'Edit')
			.parent()
			.siblings(".card-content")
			.append('<div id="'+childId+'EditForm" class="noselect">');
		$('#'+childId+'EditForm').hide();
			
		Object.keys(jsonArray).forEach(function(element){
			$('#'+childId+'EditForm')			
			.append(generateInputTextHtml(element,jsonArray[element]));		
			
			$('#'+childId+'EditForm #'+element+'InputText')		
			.change(function(){
				jsonArray[element]=$(this).val();
				
				console.log(jsonArray);
				
				
				
				
			});		
		
			
		});
			
		$('#'+childId+'Edit')
			.parent()
			.siblings(".card-content")
			.append('</div>');
	
	}
	
	
	function generateInputTextHtml(label,value){
			var prepHtml = 
				'<div class="input-field">'+
					'<input  placeholder="'+label+'" value="'+value+'" id="'+label+'InputText" type="text" class="validate">'+
					'<label class="active" for="'+label+'InputText">'+label+'</label>'+
				'</div>';			
			return prepHtml;			
	}
	
	function warningDeleteModal(name,type){
		
		$('#'+modalIdDelete+'content').html('Confirmation de suppression du widget <b>'+name+'</b>');
			$('#'+modalIdDelete).modal('open');	
					
			$('#'+modalIdDelete+"ok").click(function(){						
				widgetJsonFileManage('',type,'remove',name);
				
				name=name.replace(/ /g,'_');	
				$('#'+type+name).delay(200).fadeOut('slow');
			
				$('#'+modalIdDelete).modal('close');
				$('#'+modalIdDelete+"ok").off('click');								
			});
	}

	
	function generateModalHtml(id){
	
		var prepHtml = 					
			'<div id="'+id+'" class="modal">'+
				'<div id="'+id+'content" class="modal-content row">'+				  
				'</div>'+
				'<div id="'+id+'footer" class="modal-footer">'+
				  '<a id="'+id+'ok" class="modal-action waves-effect waves-green btn-flat">OK</a>'+
				  '<a id="'+id+'cancel" class="modal-action modal-close waves-effect waves-green btn-flat">Annuler</a>'+
				  '<div id="'+id+'errorHolder" class="flow-text"></div>'+
				'</div>'+
			'</div>';
			
		return prepHtml;
	
	}
	
	var modalIdDelete="modalFormDelete";
	
	$('body').append(generateModalHtml(modalIdDelete));	
	$('#'+modalIdDelete).modal();		
		
	function generateWidgetCardContainerHtml(id){
		
		var prepHtml =
			'<div id="'+id+'" class="container"></div>'; 		
		return prepHtml;
	}
	
	function generateWidgetTypeContainerHtml(id){
		
		var prepHtml =		
			'<div id="'+id+'" class="row">'+
				'<h4 class="header col s12 typeTitle textOnBodyColor center">'+id+'</h4>'+			
			'</div>'; 
		
		return prepHtml;
	}
	
	function generateWidgetCardHtml(id,title){	
	
		var titleUnderscored = title.replace(/ /g,"_");		
		id=id+titleUnderscored;
	
		var prepHtml =
        '<div id="'+id+'" class="card textOnBodyColor col s12 m6 l6 hoverable">'+
			'<div class="card-content textOnBodyColor">'+
				'<span class="card-title ">'+title+'</span>'+            
			'</div>'+
			'<div class="card-action">'+
				'<a id="'+id+'Edit" class="waves-effect waves-light primaryTextColor"><i class="material-icons">edit</i></a>'+
				'<a id="'+id+'Delete" class="waves-effect waves-light secondaryTextColor"><i class="material-icons">delete</i></a>'+
			'</div>'+
		'</div>';			
		return prepHtml;
	
	}
	
	
	




