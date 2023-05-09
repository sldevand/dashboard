<?php
	require __DIR__.'/../config/params.php'; 
	require __DIR__.'/../lib/OCFram/SplClassLoader.php';
	header("Access-Control-Allow-Origin: *");
	$OCFramLoader = new SplClassLoader('OCFram', __DIR__.'/../lib');
	$OCFramLoader->register();

	$widgets = [		
		"scenarios"=>"Scénarios",
		"inters"=>"Interrupteurs",
		"thermometers"=>"Températures"
	];
	
	require __DIR__.'/../vues/Widgets/vueWidgetContainer.php';
	
	
