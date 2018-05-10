<?php
	require __DIR__.'/../config/params.php';
	require __DIR__.'/../lib/OCFram/SplClassLoader.php';
 	header("Access-Control-Allow-Origin: *");	
	$OCFramLoader = new SplClassLoader('OCFram', __DIR__.'/../lib');
	$OCFramLoader->register();		
	$curl = new OCFram\CurlManage($APIAdress.'actionneurs/');
	$curl->execute();

	$actionneurs = json_decode($curl->response(),true);

	$curl = new OCFram\CurlManage($APIAdress.'scenarios/');
	$curl->execute();
	$scenarios = json_decode($curl->response(),true);
	
	$request = new \OCFram\HTTPRequest();
	
	
	if($request->getExists("id")){
		$id=$request->getData("id");	
		$scenario=$scenarios[$id];
		$items=$scenario["data"];

		if ($request->getExists("itemid")){

			$itemid=$request->getData("itemid");
			$item=$scenario["data"][$itemid];	

			require __DIR__. '/../vues/vueEditionScenarioItem.php';

		}elseif ($request->getExists("nomScenario")) {

			$nomScenario=$request->getData("nomScenario");			
			require __DIR__. '/../vues/vueEditionScenarioNom.php';
			
		}else{
			require __DIR__. '/../vues/vueEditionScenario.php';
		}
		
	}

	
