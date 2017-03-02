<?php
	session_start();

	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API ."sessionApi.php";
	include DIR_DB_API . "leaderboardApi.php";

	$response = new AjaxResponse();

	if( !isLogged() || !array_key_exists("mode", $_POST) || !array_key_exists("page", $_POST) || !array_key_exists("entryCount", $_POST))
		$response->error("Richiesta rifiutata");

	$scoreSet = getLeaderboard($_POST["mode"], $_POST["page"], $_POST["entryCount"]);

	if( $scoreSet->num_rows == 0)
	{
		$response->error("Nessun punteggio trovato");
	}
	else
	{
		$table = array();
		$i = 0;
		foreach ($scoreSet as $score) 
		{
			$table[$i] = $score;
			$i++;
		}

		$data = array();
		$data[0] = $_SESSION["username"];
		$data[1] = $table;

		$response->sendBack(0,
							"Ok",
							$data);
	}

?>