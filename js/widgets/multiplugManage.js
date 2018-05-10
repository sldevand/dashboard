
	var multiplugs=[];			
	

	var animationMultiplugsLength = 500.0; // Animation length in milliseconds
	var firstLoadMultiplugs=true;

function loadPlugs(plugs){
	var colsize = Math.floor(12/(plugs.length));
	plugs.forEach(function(plug){

 		loadPlug(plug,colsize);

	});
}


function loadPlug(multiplugJSON,colsize){			


		if(firstLoadMultiplugs){
			firstLoadMultiplugs=false;
			$("#dashmultiplugscontent").html(" ");
			console.log("firstLoadMultplug");
		}		

		multiplugs.push(new Multiplug(multiplugJSON.id));
		var i=multiplugs.length-1;		
		multiplugs[i].apiData=multiplugJSON;	
	
		$("#dashmultiplugscontent").append(multiplugs[i].generateHtml(colsize));
		multiplugs[i].init();	
		multiplugs[i].initEventListeners();		
}

function updateMultiplugNode(multiplug){	
				var i= multiplug.id-1;
				multiplugs[i].etat=inter.etat;
				multiplugs[i].setState(multiplugs[i].etat);
				multiplugs[i].draw();					
				multiplugs[i].draw();		
				multiplugs[i].draw();		
				multiplugs[i].draw();			
	}

function generateMultiplugContainerHtml(){	
		var prepHTML = 
			'<div id="multiplugswidget" class="col s12 m6">'+
			'<div id="dashmultiplugs" class="card-panel center no-select row">'+			
			'<div id="dashmultiplugstitle" class="flow-text center textOnPrimaryColor dashTitle primaryLightColor">Multiprises</div>'+
			'<div id="dashmultiplugscontent" class="center dashContent">'+
			spinner();
			'</div></div></div>';
			
		return prepHTML;
		
		
	}
	
	/*function generateMultiplugHtml(idx){	

		
		var prepHTML = '<div class="col s4">'+
			'<canvas id="'+idx+'" class="center secondaryTextColor"></canvas>'+
			'<div id="myMultiplugTitle'+idx+'" class="center flow-text textOnBodyColor interTitle"></div>'+
			'</div>';
			
		$("#dashmultiplugscontent").append(prepHTML);
		console.log(prepHTML);
		
		
	}*/

	