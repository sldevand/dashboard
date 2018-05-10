<?php
	require __DIR__.'/../config/params.php';
	require __DIR__.'/../lib/OCFram/SplClassLoader.php';
	header("Access-Control-Allow-Origin: *");
	$OCFramLoader = new SplClassLoader('OCFram', __DIR__.'/../lib');
	$OCFramLoader->register();

	$curl = new OCFram\CurlManage($APIAdress.'thermostat/planifname/');
	$curl->execute();
	$planifsResp = $curl->response();

	$curl = new OCFram\CurlManage($APIAdress.'thermostat/mode/');
	$curl->execute();
	$modesResp = $curl->response();
	$planifs = json_decode($planifsResp,true);
	$modes = json_decode($modesResp,true);

	

	require __DIR__.'/../vues/vueThermostatSettings.php';
