	var inters=[];			
	var intersJSON =[];	

	var animationLength = 500.0; // Animation length in milliseconds
	var firstInterLoad=true;

	function getIntersFromApi(){
		
		$.getJSON("/activapi.fr/api/actionneurs/inter",function(data){
			$.each(data,function(key,inter){				
				loadInter(inter);
			});			
		});
	}

	function loadInter(interJSON){			
	
		if(firstInterLoad){
			firstInterLoad=false;
			$("#widget-inters-content").html("");
		}		
		generateIntersHtml(interJSON.id);
		var inter = new Inter(interJSON.id);

		inter.apiData=interJSON;
		inter.animtime=animationLength;	
		$("#myInterTitle"+inter.id).html(inter.apiData.nom);		
		inter.init();				
		inters.push(inter);	

	}
	
	function updateInterNode(interUp){	
				
		inters.forEach(function(inter){
			if(inter.id==interUp.id){
				inter.etat=interUp.etat;
				inter.setState(interUp.etat);
				inter.draw();					
				inter.draw();		
				inter.draw();		
				inter.draw();	
			}		

		});
	}	
	
	function generateIntersHtml(idx){
		
		var prepHTML = '<div class="col s4">'+
			'<canvas id="'+idx+'" class="center secondaryTextColor butlp "></canvas>'+
			'<div id="myInterTitle'+idx+'" class="center flow-text textOnBodyColor interTitle"></div>'+
			'</div>';
			
		$("#widget-inters-content").append(prepHTML);		
	}

	
	

		


