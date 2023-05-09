<?php
function retrieveJSON($url, $isArray)
{
	$contents = file_get_contents($url);
	$contents = utf8_encode($contents);
	if (is_bool($isArray)) return json_decode($contents, $isArray);
}

function changeJSON($url, $contenttochange)
{
	$contents = file_get_contents($url);
	$contents = utf8_encode($contents);
	file_put_contents($url, json_encode($contenttochange, JSON_PRETTY_PRINT));
}

function changeParameters($id)
{
	$results = retrieveJSON("json/config.json", false);
	if (isset($results->$id)) {
		$results->$id = htmlspecialchars($_GET["value"]);
		changeJSON("json/config.json", $results);
	} else {
		echo $id . ' not found!';
	}
}

function activatePiAssistNode($activation)
{
	$foreverCLI = "sudo /home/pi/activServer/activServerLauncher";
	set_time_limit(0);
	if ($activation == "on") exec($foreverCLI, $status);
	if ($activation == "off") exec("sudo killall node", $status);
}

function activateOpenvpn($activation)
{

	if ($activation == "on") exec("sudo service openvpn start", $status);
	if ($activation == "off") exec("sudo service openvpn stop", $status);
}

function getPiAssistNodeActivation()
{

	exec("ps -U root | grep -o node", $status, $etat);
	$activated = "off";
	if (isset($status) && !$etat) {
		if (strpos($status[0], 'node') !== false) $activated = "on";
	}
	echo $activated;
}

function getOpenvpnActivation()
{

	exec("service openvpn status | grep -ow active", $status, $etat);
	$activated = "off";
	if (isset($status) && !$etat) {
		if (strpos($status[0], 'active') !== false) $activated = "on";
	}
	echo $activated;
}

function getLog($file)
{
	if (file_exists($file)) {

		$lines = file($file);

		$last = count($lines) - 1;

		for ($i = $last; $i >= 0; $i--) {
			echo $lines[$i] . '<br>';
		}
	}
}
