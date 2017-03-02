<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API . "sessionApi.php";
	
	session_start();

	$response = new AjaxResponse();

	if(logout())
		$response->sendBack(0, "Disconnessione completata", null);
	else
		$response->error("Impossibile distruggere la sessione");
?>