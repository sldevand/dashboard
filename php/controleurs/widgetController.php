<?php
	require __DIR__.'/../config/params.php'; 
	require __DIR__.'/../lib/OCFram/SplClassLoader.php';
	header("Access-Control-Allow-Origin: *");
	$OCFramLoader = new SplClassLoader('OCFram', __DIR__.'/../lib');
	$OCFramLoader->register();

	$widgets = [		
		"clock"=>"Horloge",
		"scenarios"=>"Scénarios",
		"dimmers"=>"Dimmers",
		"inters"=>"Interrupteurs",
		"thermostat"=>"Thermostat",
		"thermometers"=>"Températures"
//		"teleinfo"=>"Téléinfo",
//		"clipboard"=>"Pense Bete",
//		"weather"=>"Météo"
	];
	
	require __DIR__.'/../vues/Widgets/vueWidgetContainer.php';
	
	
