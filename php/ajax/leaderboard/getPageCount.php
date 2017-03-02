<?php
	session_start();

	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API ."sessionApi.php";
	include DIR_DB_API . "leaderboardApi.php";

	$response = new AjaxResponse();

	if( !isLogged() || !array_key_exists("mode", $_POST) || !array_key_exists("page", $_POST) || !array_key_exists("entryCount", $_POST))
		$response->error("Richiesta rifiutata");

	$pageCount = getPageCount($_POST["mode"], $_POST["entryCount"]);

	if( $pageCount === false )
	{
		$response->error("Errore del server, riprova piu' tardi");
	}
	else
	{
		$response->sendBack(0,
							"Ok",
							$pageCount);
	}

?>