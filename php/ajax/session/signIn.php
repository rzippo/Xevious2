<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API . "sessionApi.php";
	
	$response = new AjaxResponse();

	if( !array_key_exists("username", $_POST) || !array_key_exists("password", $_POST) || !array_key_exists("email", $_POST) )
		$response->error("Richiesta rifiutata");

	$username = $_POST["username"];
	$password = $_POST["password"];
	$email = $_POST["email"];

	$signed = signIn($username, $password, $email);

	$response->sendBack( ($signed) ? 0 : 1,
						 ($signed) ? "Registrazione completata, continua con il primo login!" : "Qualcosa è andato storto :(",
						 ($signed) ? 0 : 1)
?>