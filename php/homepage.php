<?php
	require_once __DIR__ ."/config.php"; 
	session_start();
	include DIR_DB_API ."sessionApi.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}

	$_SESSION["onGame"] = false;
?>

<html lang="it">
<head>
	<meta charset="utf-8"></meta>

	<title>Xevious II - Home</title>
	<link rel="icon" type="image/png" href="./../img/planes/xevious0.png">

	<link rel="stylesheet" type="text/css" href="./../css/xevious.css">
	<link rel="stylesheet" type="text/css" href="./../css/homepage.css" >
	<link rel="stylesheet" type="text/css" href="./../css/gameSetup.css">

	<script type="text/javascript" src="./../js/homepage.js"></script>
	<script type="text/javascript" src="./../js/gameSetup.js"></script>
	<script type="text/javascript" src="./../js/ajaxRequest.js"></script>
</head>
<body onload="load();">
	<h1>Xevious II</h1>

	<div class="wrap">
		<p id="messageArea"><?= "Ciao," . $_SESSION["username"]?></p>

		<button id="playButton" class="bigButton" onclick="showGameSetup();" >Gioca</button>

		<!-- form id="gameSetup" -->
			<?php
				include DIR_LAYOUT. "gameSetup.php";
			?>			

		<a id="shop_nav_link" href="./shop.php" class="bigButton">Negozio</a>
		<a id="leaderboard_nav_link" href="./leaderboard.php" class="bigButton">Classifica</a>
		<button class="bigButton" onclick="showHelp()">Guida</button>
		<button class="bigButton red" onclick="logout()">Logout</button>
	</div>

	<div id="helpText" class="wrap" style="display: none;">
		<h2>Guida</h2>
		<p>
		Lo scopo di Xevious II è distruggere più nemici possibili per guadagnare punti, controllare un aereo. La partita termina quando un nemico riesce a colpire l'aereo.<br>
		Durante ogni partita puoi guadagnare monete spendibili nel negozio per comprare nuove armi e aerei da combinare per diverse strategie di gioco.<br>
		Puoi giocare partite casuali per scalare la classifica globale o gareggiare contro altri giocatori per batterli giocando la stessa partita.<br>
		Per conoscere le caratteristiche di ogni arma o aereo, passa con il mouse sopra le icone che li raffigurano.<br>
		</p>
		<p>
		Il sito si divide in tre sezioni: il gioco vero e proprio, il negozio, la classifica.<br>
		Cliccando su "Gioca" ti verrà chiesto di scegliere l'aereo e le armi da utilizzare per la partita, e potrai subito giocare.<br>
		Nel negozio invece potrai spendere le monete accumulate per comprare nuove armi o aerei. Durante ogni partita, si riceve una moneta ogni 10 punti guadagnati. Ricorda che se ti sei appena registrato hai già 10 monete da spendere!<br>
		Nella classifica puoi vedere i tuoi punteggi e quelli di tutti gli altri giocatori. Premendo 'gareggia' puoi giocare la stessa partita, nelle medesime condizioni, di chi ha raggiunto un dato punteggio che vuoi superare<br>

		Se c'è qualcosa di poco chiaro, vai nella sezioni su cui presenti dei dubbi: lì troverai ulteriori informazioni
		</p>
		
		<button class="bigButton red" onclick="hideHelp()">Chiudi la guida</button>
	</div>
</body>
</html>