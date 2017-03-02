<?php
	session_start();
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API . "sessionApi.php";

	$response = new AjaxResponse();

	if( !array_key_exists("item", $_POST) || !isLogged() )
		$response->error("Richiesta rifiutata");

   	include DIR_DB_API . "storeApi.php";

	$username = $_SESSION['username'];

	$item = explode("_", $_POST['item']);
	$itemType = $item[0];
	$itemLevel = isset($item[1])?$item[1]:1;

	$buyResult = buy($username, $itemType, $itemLevel);
	$response->sendBack($buyResult["success"] ? 0 : 1,
						$buyResult["success"] ? "Acquisto completato" : "Errore, acquisto annullato",
						$buyResult["coins"]); 
?>