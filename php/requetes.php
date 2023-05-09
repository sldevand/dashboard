<?php
if (!isset($_SESSION)) {
	session_start();
}
include("userInfos.php");

function checkForConnection($pwd)
{



	$credentials = getUserPassFromFile("../users/user1.txt");
	$login = $credentials[0];
	$hash = $credentials[1];


	if (password_verify($pwd, $hash)) {
		$_SESSION['name'] = htmlspecialchars($login);

		return true;
	} else {
		return false;
	}
}

function getUserPassFromFile($filename)
{

	//Get user:pass from file

	$file = fopen($filename, "r");

	if ($file == false) {
		//echo ( "Error in opening file" );
		exit();
	}

	$filesize = filesize($filename);
	$filetext = fread($file, $filesize);
	fclose($file);
	$array = explode(":", $filetext);


	return $array;
}
