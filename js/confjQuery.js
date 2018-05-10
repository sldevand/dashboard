$(document).ready(function(){


	refreshAllParams();
	setInterval(refreshAllParams,2000);
	

	function refreshAllParams(){
		refreshParams();
		getPiAssistNodeState();
		getOpenvpnState();
		refreshNodeLog();
	}
	

	function refreshNodeLog(){
 		$.get( "resultat.php?log")
  		.done(function(data) {
			
			$("#nodelog").html(" ");	
			var lines = data.split(/\n/);
			var i;
			var offsetMax=20;
			var offset=offsetMax;
			if(lines.length<offsetMax) offset = lines.length;
			else offset=offsetMax;

			for(var i=0;i<offset;i++){
				
				$("#nodelog").append(lines[i]);	
			}
  		});
	}

	$("#planif").on("change",function(e){
		e.preventDefault();
		var val = refreshDisplay();
		var valeur="nok";
		(val)? valeur="ok":valeur="nok";

		 $.get( "resultat.php", { setjson:"cronauth",value:valeur} )
  		.done(function() {
			refreshDisplay();

  		})

  	});
		
	$("#planifTemp").on("change",function(e){
		e.preventDefault();
		var val = refreshDisplayTemp();
		var valeur="nok";
		(val)? valeur="ok":valeur="nok";

		 $.get( "resultat.php", { setjson:"cronauthTemp",value:valeur} )
  		.done(function() {
			refreshDisplayTemp();

  		})

  	});

	$("#piassistnode").on("change",function(e){
		e.preventDefault();
		var val = refreshDisplayPiAssistNode();
		
		var valeur="off";
		(val)? valeur="on":valeur="off";
	
		
			
		 	$.get( "resultat.php", { piassistnode:valeur} )
  			.done(function() {
				getPiAssistNodeState();
			})

			 	
			

  	});

	$("#openvpn").on("change",function(e){
		e.preventDefault();

		var val =refreshDisplayOpenvpn();

		var valeur="off";
		(val)? valeur="on":valeur="off";
	
		
			
		 	$.get( "resultat.php", { openvpn:valeur} )
  			.done(function() {
				getOpenvpnState();
			})

			 	
			

  	});

	function getPiAssistNodeState(){

			$.get( "resultat.php", { getpiassistnode:""} )
  			.done(function(data) {

				data=data.trim();
				if(data.localeCompare("on")==0){
					$('#piassistnode').attr('checked', true);
				}else{
					$('#piassistnode').attr('checked', false);
				}

				refreshDisplayPiAssistNode();
			})


	}
	function getOpenvpnState(){

			$.get( "resultat.php", { getopenvpn:""} )
  			.done(function(data) {

				data=data.trim();
				if(data.localeCompare("on")==0){
					$('#openvpn').attr('checked', true);
				}else{
					$('#openvpn').attr('checked', false);
				}

				refreshDisplayOpenvpn();
			})


	}


	function refreshParams(){

		var jqxhr = $.getJSON( "json/config.json?time="+new Date().getTime(), function() {
		})
  		.done(function(data) {

			if(data.cronauth.localeCompare("ok")==0){
				$('#planif').attr('checked', true);
			}else{
				$('#planif').attr('checked', false);
			}
			
			if(data.cronauthTemp.localeCompare("ok")==0){
				$('#planifTemp').attr('checked', true);
			}else{
				$('#planifTemp').attr('checked', false);
			}


			refreshDisplay();
			refreshDisplayTemp();
		});
	}


	function refreshDisplay(){

		var checkbox = $('#planif').is(":checked");
		(checkbox)?	$("#titreplanif").css({"color": "black"}):$("#titreplanif").css({"color": "grey"});
		return checkbox;
	}
	
	function refreshDisplayTemp(){
		var checkbox = $('#planifTemp').is(":checked");
		(checkbox)?	$("#titreplanifTemp").css({"color": "black"}):$("#titreplanifTemp").css({"color": "grey"});
		return checkbox;
	}
	
	function refreshDisplayPiAssistNode(){
		var checkbox = $('#piassistnode').is(":checked");
		(checkbox)?	$("#titrepiassistnode").css({"color": "black"}):$("#titrepiassistnode").css({"color": "grey"});
		return checkbox;
	}

	function refreshDisplayOpenvpn(){
		var checkbox = $('#openvpn').is(":checked");
		(checkbox)?	$("#titreopenvpn").css({"color": "black"}):$("#titreopenvpn").css({"color": "grey"});
		return checkbox;
	}
			
	




});
