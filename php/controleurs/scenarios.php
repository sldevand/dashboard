<?php
	require __DIR__.'/../config/params.php'; 
	require __DIR__.'/../lib/OCFram/SplClassLoader.php';
	header("Access-Control-Allow-Origin: *");
	$OCFramLoader = new SplClassLoader('OCFram', __DIR__.'/../lib');
	$OCFramLoader->register();

	$curl = new OCFram\CurlManage($APIAdress.'scenarios/');
	$curl->execute();
	$response = $curl->response();

	$scenarios = json_decode($curl->response(),true);

	require __DIR__.'/../vues/vueScenarios.php';
	require __DIR__.'/../vues/vueModalConfirmationDelete.php';
