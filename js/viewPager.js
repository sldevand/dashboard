$(document).ready(function(){	
	
	$.get("php/controleurs/widgetController.php",function(data){	
		emptyMain();
		$("#maincontent").html(data);
		loadMain();
	});	
	
	$("#releves").click(function(){
		emptyMain();
		initGraphVars(nowDateAPI(),0,1);		
		loadGraphsMain();
	});
	
	$("#meteo").click(function(){		
		emptyMain();
		loadMeteoMain();		
	});
	
	$("#parametres").click(function(){		
		emptyMain();
		loadParamsMain();		
	});
	
	$("#scenariosEdit").click(function(){
		emptyMain();		
		loadScenariosMain();
	});
	
	function emptyMain(){
		$("#titlebar").html("DashBoard - ");
		$("#maincontent").empty();			
		firstThermoLoad=true;
		$("#today").off('click');
	}
	
	function loadMain(){
		
		$("#titlebar").append("Accueil");

		loadClock();
	
		//loadMultiplugWidgetMain();
		getScenariosFromApi();
		getDimmersFromAPI();		
		getIntersFromApi();		
		parseThermostatFromAPI();	
		parseThermosFromJSON();
		parseTeleinfoFromAPI();
		getClipboardsFromJSON();
		loadMeteoWidget();	
		
		
	}
	
	function loadClock(){		
		$("#widget-clock-content").html(generateClockHtml());					
		var clock = new CanvasClock("clock_js");		
	}

	function loadMultiplugWidgetMain(){		

		$("#maincontent").append(generateMultiplugContainerHtml());
		loadPlugs( [{ "id": "4", "nom": "Multiprise_0", "module": "nrf24", "protocole": "node", "adresse": "1Nodw", "type": "multi", "radioid": "0", "etat": "0", "categorie": "multiplug" },
					{ "id": "5", "nom": "Multiprise_1", "module": "nrf24", "protocole": "node", "adresse": "1Nodw", "type": "multi", "radioid": "0", "etat": "0", "categorie": "multiplug" },
					{ "id": "6", "nom": "Multiprise_2", "module": "nrf24", "protocole": "node", "adresse": "1Nodw", "type": "multi", "radioid": "0", "etat": "0", "categorie": "multiplug" },
					{ "id": "7", "nom": "Multiprise_3", "module": "nrf24", "protocole": "node", "adresse": "1Nodw", "type": "multi", "radioid": "0", "etat": "0", "categorie": "multiplug" },
					{ "id": "8", "nom": "Multiprise_4", "module": "nrf24", "protocole": "node", "adresse": "1Nodw", "type": "multi", "radioid": "0", "etat": "0", "categorie": "multiplug" },
					{ "id": "9", "nom": "Multiprise_5", "module": "nrf24", "protocole": "node", "adresse": "1Nodw", "type": "multi", "radioid": "0", "etat": "0", "categorie": "multiplug" }
					]);
		//getScenariosFromApi();
		
		
	}	
	
	function loadGraphsMain(){		
		$("#titlebar").append("Relevés");
		
		appendGraphsButtons();		
				
		$("#maincontent").append(generateContainerGraphHtml());
		
				
		getGraphsFromJSON();					
	}
	
	function appendGraphsButtons(){
		
		$("#maincontent").append('<a id="yesterday" class="waves-effect waves-light btn-flat btn-small primaryTextLightColor"><i class="material-icons left">arrow_back</i>Hier</a>');	        
		
		$("#yesterday").on('click',function(){		
			emptyMain();
			initGraphVars( yesterdayDateAPI(),0,1);
			loadGraphsMain();		
		});
		
		$("#maincontent").append('<a id="today" class="waves-effect waves-light btn-flat btn-small  primaryTextColor"><i class="material-icons left">today</i>Aujourd\'Hui</a>');	        
		
		$("#today").on('click',function(){		
			emptyMain();
			initGraphVars(nowDateAPI(),0,1);
			loadGraphsMain();		
		});		
		
		$("#maincontent").append('<a id="week" class="waves-effect waves-light btn-flat btn-small  primaryTextColor"><i class="material-icons left">today</i>Semaine</a>');	        
		
		$("#week").on('click',function(){		
			emptyMain();
			var week = monToSun();
			initGraphVars( dFormatAPI(week.monday),dFormatAPI(week.sunday),7.0);
			loadGraphsMain();		
		});		
		
		$("#maincontent").append('<a id="month" class="waves-effect waves-light btn-flat btn-small  primaryTextColor"><i class="material-icons left">today</i>Mois</a>');	        
		
		$("#month").on('click',function(){		
			emptyMain();
			var month = monthFL(0);			
			initGraphVars( dFormatAPI(month.first),dFormatAPI(month.last),month.nbDays);
			loadGraphsMain();		
		});		
	}
	
	function loadParamsMain(){
		$("#titlebar").append("Paramètres");
		$("#maincontent").load("parametres.php");	
	}
	
	function loadScenariosMain(){
		$("#titlebar").append("Scenarios");
		$("#maincontent").load("php/controleurs/scenarios.php");	
	}
	
	function loadMeteoMain(){
		$("#titlebar").append("Météo");
		$("#maincontent").load("html/meteoFrame.html",function(){				
				console.log($("html"));				
		});		
	}
	
	function loadMeteoWidget(){
		var options = [ {selector: '#weather', offset: 100, callback: downloadMeteoData }];
		Materialize.scrollFire(options);		 
	}

	function downloadMeteoData(){	

		$.get("php/weather2.php",{"city":592589},function(data){	
			$("#widget-weather-content").html(data);
		});
	}
	
	

});
