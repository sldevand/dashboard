function Multiplug(id){

	var multiplug=new WidgetAbstract(id);

	multiplug.generateHtml =function(colsize){	

		var nom =multiplug.apiData.nom.split("_")[1];
			
		return '<div class="col s'+(colsize)+'">'+
			'<canvas id="'+multiplug.id+'" class="center secondaryTextColor"></canvas>'+
			'<div id="myMultiplugTitle'+multiplug.id+'" class="center flow-text textOnBodyColor interTitle">'+nom+'</div>'+
			'</div>';			
	}


	multiplug.draw=function(){

		multiplug.ctx.clearRect(0, 0, multiplug.canvas.width, multiplug.canvas.height);		
		multiplug.ctx.fillStyle=rgb2hex(getColor("secondaryTextColor"));

		multiplug.ctx.rect(0,0,multiplug.canvas.width,multiplug.canvas.height);
		multiplug.ctx.fill();
	}

	return multiplug;

}