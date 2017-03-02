<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	require DIR_DB_API . "gameApi.php";

	$response = new AjaxResponse();

	$armi = ( array_key_exists("armi", $_POST) ) ? $_POST["armi"] : null;

	if( !isset( $_POST["seed"], $_POST["aereo"] ) || $_POST["seed"] == 0)
		$response->error("Richiesta rifiutata");

	if(!validateGameEquipment($armi, $_POST["aereo"]) )
		$response->error("Richiesta rifiutata");

	if( createGameSession( $_POST["seed"], $_POST["aereo"], $armi ) )
		$response->ok("Sessione di gioco pronta");
	else
		$response->error("Impossibile creare la sessione di gioco");
?>