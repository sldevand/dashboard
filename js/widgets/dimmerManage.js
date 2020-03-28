
	var dimmers=[];			
	var dimmersJSON =[];
	var dimmersAPI=[];
	var dimmersAPIOrdData=[];
	var nbDimmers=1;
	var firstLoadDimmers=true;

	function getDimmersFromAPI(){
		$.getJSON("/activapi/api/actionneurs/dimmer",function(dataAPI){
			dimmersAPI=dataAPI;		
			$.getJSON('json/dimmers.json', function(dataJSON){			
				dimmersJSON=dataJSON.dimmers;
				$.each(dimmersJSON,function(indexDimmerJSON,dimmerJSON){																		
					$.each(dimmersAPI,function(indexDimmerAPI,dimmerAPI){	
						if(dimmerAPI["nom"].includes(dimmerJSON["name"])){
							if(firstLoadDimmers){$("#widget-dimmers-content").empty();}							
							loadDimmer(dimmerAPI,dimmerJSON);								
						}							
					});
				});							
			});
		});
	}	
	
	function loadDimmer(dimmerAPI,dimmerJSON){
		var dimmer=new Dimmer(dimmerAPI.id);	
		var i=dimmers.length-1;		
		dimmer.apiData=dimmerAPI;

		dimmer.initValues(dimmerAPI.nom,dimmerJSON.minvalue,dimmerJSON.maxvalue,dimmerAPI.etat,dimmerJSON.range);
		dimmer.dataJSON=dimmerJSON;
		$("#widget-dimmers-content").append(dimmer.generateHtml());
		dimmer.init();	
		dimmer.initEventListeners();
		dimmers.push(dimmer);			
	}
	
	function updateDimmer(dim){
	
		for(var i=0;i<nbDimmers;i++){
			
			if(dimmers[i].id==dim.id){				
				dimmers[i].m_value=dim.etat;
				dimmers[i].calculateRatio();
				dimmers[i].draw();		
				dimmers[i].draw();		
				dimmers[i].draw();		
				break;
			}
		}
	}
	
	
