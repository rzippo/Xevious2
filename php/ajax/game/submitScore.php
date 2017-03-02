<?php
	require_once __DIR__ . "./../AjaxResponse.php";
	require DIR_DB_API . "gameApi.php";
	require DIR_DB_API . "leaderboardApi.php";


	$response = new AjaxResponse();
	$rowId = submitGameScore($_POST["score"], $_POST["seed"]);

	if( !isset( $_POST["score"], $_POST["seed"] ) || $rowId === false )
		$response->error("Richiesta Rifiutata");

	$success = updateLeaderboard();
	
	if($success)
	{
		$position = getPosition($rowId);
		$response->sendBack(0, "Classifica aggiornata", $position);
	}
	else
		$response->error("Errore di aggiornamento classifica");
?>