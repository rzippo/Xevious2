<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	require_once DIR_DB_API . "gameApi.php";

	$response = new AjaxResponse();

	$success = restartGameSession();

	if($success)
		$response->ok("Sessione pronta");
	else
		$response->error("Richiesta rifiutata");
?>