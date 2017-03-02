<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API . "sessionApi.php";
	
	$response = new AjaxResponse();

	if( !array_key_exists("username", $_POST) || !array_key_exists("password", $_POST) )
		$response->error("Richiesta rifiutata");

	$username = $_POST["username"];
	$password = $_POST["password"];

	$logged = login($username, $password);

	$response->sendBack( ($logged) ? 0 : 1,
						 ($logged) ? "Login completato, caricamento homepage.." : "Username e/o password errati",
						 ($logged) ? 0 : 1)
?>