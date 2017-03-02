<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	require DIR_DB_API . "gameApi.php";

	$response = new AjaxResponse();

	$success = coinUp();

	if($success)
		$response->ok("Monete incrementate");
	else
		$response->error(" Richiesta rifiutata");
?>