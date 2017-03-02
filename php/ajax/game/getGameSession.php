<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	require DIR_DB_API . "gameApi.php";

	$response = new AjaxResponse();

	$gameSession = getGameSession();

	if($gameSession === false)
		$response->error("Richiesta Rifiutata");
	else
		$response->sendBack(0,
							"Sessione di gioco trovata",
							$gameSession );
?>