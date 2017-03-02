<?php
	require_once __DIR__ ."/config.php"; 
	session_start();
	include DIR_DB_API ."sessionApi.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}
?>

<html lang="it">
<head>
	<meta charset="UTF-8"></meta>
	<title>Xevious II - Classifica</title>
	<link rel="icon" type="image/png" href="./../img/planes/xevious0.png">

	<link rel="stylesheet" type="text/css" href="./../css/xevious.css">
	<link rel="stylesheet" type="text/css" href="./../css/leaderboard.css">
	<link rel="stylesheet" type="text/css" href="./../css/gameSetup.css">
	
	<script type="text/javascript" src="./../js/leaderboard.js"></script>
	<script type="text/javascript" src="./../js/gameSetup.js"></script>
	<script type="text/javascript" src="./../js/ajaxRequest.js"></script>
</head>
<body onload="load()">
	<h1>Xevious II</h1>	
	<div class="wrap">
		<p id="welcomeText">
			Benvenuto nella pagine delle classifiche, <em><?= $_SESSION["username"]?></em>!
			<br>Qui puoi trovare i tuoi punteggi e quelli degli altri giocatori di Xevious II.
			<br>Nella classifica globale sono riportati i punteggi di tutti i giocatori ordinati dal più alto al più basso,
			<br>tra cui i tuoi sono messi in evidenza in arancione.
			<br>Puoi vedere solo i tuoi punteggi premendo su "I miei punteggi" oppure vedere i punteggi di un altro utente cliccando sul suo username dalla classifica globale.
			<br>Da qui puoi anche accedere alle gare: puoi giocare la stessa partita di un altro giocatore (stessi nemici, stesse condizioni) per ottenere un punteggio migliore del suo.
			<br>Puoi accedere alla classifica di ciascuna partita tramite "Classifica gara" o partecipare affrontando quella stessa partita tramite il pulsante "Gareggia!"
		</p>

		<p id="messageArea">void</p>
		
		<nav>
			<button type="button" class="mediumButton" onclick="globalMode()">Classifica globale</button>
			<button type="button" class="mediumButton" onclick="userWiseMode()">I tuoi punteggi</button>
		</nav>

		<button id="prevPage" class="mediumButton" onclick="prevPage()">
			&larr;
		</button>
		<button id="nextPage" class="mediumButton" onclick="nextPage()">
			&rarr;
		</button>

		<div>
			<table >
				<tbody id="board">
					<tr id="header">
						<th>Posizione</th>
						<th>Punteggio</th>
						<th>Utente</th>
						<th>Data</th>
						<th></th>
					</tr>

					<tr id="gameSetupRow">
						<td colspan = 5>
							<?php
								include DIR_LAYOUT . "gameSetup.php";
							?>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<a id="home" class="bigButton red" href="./homepage.php">
		<img src="./../img/icons/home.png" alt="home">
	</a>

</body>
</html>