
	function widgetJsonFileManage(jsonWidget,type,action,name){
	
	
		var params = {};
		
		params["action"] = action;
		params["widget"] = type;	
		params["json"]=	JSON.stringify(jsonWidget);
		params["name"]=name;	

			//console.log(params);
	
			
		$.post( "php/widgetsRequests.php", params,function( data ) {	
				var childId = type+name;		
				childId=childId.replace(/ /g,"_");	
			if(data.includes("namechange")){
				
				var dataSplit=data.split(";");
			
				
				$("#"+childId+" .card-content .card-title").html(dataSplit[1]);
				
				Materialize.toast("Widget renommé en "+dataSplit[1], 1000);
			}else{
		
				//Materialize.toast(data, 700);
			}
			
		});		
	}

	
	
	
	
	
	




