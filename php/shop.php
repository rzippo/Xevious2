<?php
	require_once __DIR__ ."/config.php"; 
	session_cache_limiter("nocache");
	session_start();
	include DIR_DB_API ."sessionApi.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}

	//include DIR_DB_API . "user_store.php";
	//include DIR_CONST . "shop_prices.php";
?>
<html lang="it">
<head>
	<meta charset="utf-8">
	<title>Xevious II - Negozio</title>
	<link rel="icon" type="image/png" href="./../img/planes/xevious0.png">

	<link rel="stylesheet" type="text/css" href="./../css/xevious.css">
	<link rel="stylesheet" type="text/css" href="./../css/shop.css">
	
	<script type="text/javascript" src="./../js/shop.js"></script>
	<script type="text/javascript" src="./../js/ajaxRequest.js"></script>
</head>
<body onload="load()">
	<h1>Xevious II</h1>
	<div class="wrap">
		<div>
			<p id="welcomeText">Benvenuto nel negozio, <em><?= $_SESSION["username"]?></em>!
				<br>Qui puoi comprare nuove armi e aerei per giocare.
				<br>Puoi vedere il prezzo di ogni oggetto sotto di esso; passando con il mouse sopra l'icona dell'oggetto puoi avere utili informazioni su di esso.
				<br>Gli oggetti che hai già acquistato sono in verde, in giallo quelli che puoi comprare, in arancione quelli per i quali non hai abbastanza monete.
				<br>Ogni arma ha tre livelli, per poter acquistare un livello superiore devi avere già acquistato quelli precedenti. Quando ti manca qualche requisito, l'icona sarà in grigio.
				<br>Al momento hai <span id="userCoins"><?= $_SESSION["coins"] ?></span></p>
			<img src="./../img/icons/coins.png" alt="monete">
			<p>Buono shopping!</p>
		</div>

		<div>
			<p id="messageArea">void</p>
			<div id="confirmButtons">
				<button class="mediumButton red" onclick="confirm()">Ok</button>
				<button class="mediumButton" onclick="cancel()">Annulla</button>
			</div>
		</div>

		<div id="shopSection"></div>
	</div>

	<a id="home" class="bigButton red" href="./homepage.php">
		<img src="./../img/icons/home.png" alt="home">
	</a>
</body>
</html>