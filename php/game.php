<?php
	session_start();
	require_once __DIR__ ."/config.php"; 
	require_once DIR_DB_API ."sessionApi.php";
	require_once DIR_DB_API . "storeApi.php";

	if(!isLogged())
	{
		header("Location: ./../index.php");
		exit;
	}

    if ($_SESSION["onGame"]) 
    {
        header("Location: ./homepage.php");
        exit;
    }

?>
<html lang="it">
<head>
	<meta charset="utf-8">
	<title>Xevious II - Gioco</title>
    <link rel="icon" type="image/png" href="./../img/planes/xevious0.png">
    
	<link rel="stylesheet" type="text/css" href="./../css/game.css">
	<link rel="stylesheet" type="text/css" href="./../css/xevious.css">

	<script type="text/javascript" src="./../js/ajaxRequest.js"></script>
	
	<script type="text/javascript" src="./../js/game/gameInit/getGameSession.js"></script>
	<script type="text/javascript" src="./../js/game/gameInit/loadGameArea.js"></script>
	<script type="text/javascript" src="./../js/game/gameInit/loadWeaponSet.js"></script>

	<script type="text/javascript" src="./../js/game/gameObjects/gameObject.js"></script>
	<script type="text/javascript" src="./../js/game/gameObjects/Player.js"></script>
	<script type="text/javascript" src="./../js/game/gameObjects/PlayerShot.js"></script>
	<script type="text/javascript" src="./../js/game/gameObjects/Enemy.js"></script>

    <script type="text/javascript" src="./../js/game/gameEvents/enemySpawn.js"></script>
    <script type="text/javascript" src="./../js/game/gameEvents/fireFrame.js"></script>
    <script type="text/javascript" src="./../js/game/gameEvents/playerWeapons.js"></script>
    <script type="text/javascript" src="./../js/game/gameEvents/redirectionFunctions.js"></script>
    <script type="text/javascript" src="./../js/game/gameEvents/scoreHandling.js"></script>


	<script type="text/javascript" src="./../js/game/gameEngine/gameLoop.js"></script>
	<script type="text/javascript" src="./../js/game/gameEngine/inputHandling.js"></script>
    <script type="text/javascript" src="./../js/game/gameEngine/movementHandling.js"></script>
	<script type="text/javascript" src="./../js/game/gameEngine/randomGenerator.js"></script>
    <script type="text/javascript" src="./../js/game/gameEngine/gameOver.js"></script>
    <script type="text/javascript" src="./../js/game/gameEngine/gameRestart.js"></script>
    <script type="text/javascript" src="./../js/game/gameEngine/gameHelper.js"></script>


</head>
<body onload="loadGameArea(); setInterval(frame, 20)">
    <div id="gameArea">
        <div id="scoreBoard">
            <div id="scoreWrap">
                <p id="scoreLab">SCORE:</p>
                <p id="scoreCounter">0</p>

                <img id="coinsIcon" src="./../img/icons/coins.png" alt="coins">
                <p id="coinsCounter">0</p>
            </div>
            
            <div id="ammoWrap">
                <p id="shieldMessage">SHIELD DOWN IN <span id="shieldCounter">0</span></p>
                <p id="cooldownMessage">COOLDOWN! <span id="cooldownCounter">0</span></p>
                <p>WEAPONS:</p>
                <div id="ammo">
                    <img id="weaponTile1">
                    <p id="ammoCounter1">0</p>

                    <img id="weaponTile2">
                    <p id="ammoCounter2">0</p>
                    
                    <img id="weaponTile3">
                    <p id="ammoCounter3">0</p>
                </div>
            </div>
        </div>

        <div id="pauseLayer">
            <h1 id="titleLabel">Xevious II</h1>
            <em id="pauseEmLabel"> </em>
            <pre id="pausePreLabel">Premi Start per giocare!</pre>
        </div>

        <div id="helpLayer">
            <p>Help rapido<br>
            I tasti sono:<br>
                - Frecce direzionali per muovere l'aereo<br>
                - 'S' per sparare colpi normali: se tenuto premuto si userà il "fuoco automatico" che permette una raffica continua ma lenta,
                    mentre premendo il tasto ripetutamente si ha un "fuoco manuale" con una raffica più rapida di colpi<br>
                - 'A', 'D', 'W' per le armi speciali<br>
                - 'Invio' come scorciatoia a Start/Pause<br>
            Scopo del gioco è guadagnare più punti possibile distruggento i nemici che compaiono a schermo.<br>
            Per far ciò il giocatore ha a disposizione una varietà di armi ed aerei, ma attenzione:<br>
            <em>il gioco diventa più difficile circa ogni 15 secondi di gioco</em>.<br>
            Le armi, così come i particolari aerei, sono sbloccabili nel negozio e vanno selezionati prima di ogni partita.<br>
            Elementi di gioco:<br>
                - Missili a ricerca: colpi speciali che inseguono un bersaglio. In mancanza di un bersaglio, non vengono lanciati.<br>
                  Il livello dell'arma indica quanti missili si tenterà di lanciare (1,3,7).<br>
                  NB: i missili non possono prendere come bersaglio i proiettili nemici.<br>
                - Bomba: i colpi già sparati esploderanno lanciando nuovi colpi in diverse direzioni.<br>
                  Numero e direzione dei colpi dipende dal livello.<br>
                  NB: richiede che dei colpi standard siano già presenti nel campo per funzionare.<br>
                - Scudo: una barriera protettiva impedisce all'aereo di essere distrutto dalle collisioni con i nemici <br>
                  Finché lo scudo è attivo, scontrarsi contro i nemici li distrugge.<br>
                  La durata dello scudo dipende dal livello e la durata rimanente è indicata da un contatore verde in alto a sinistra<br>
            Tutte le armi hanno un cooldown dopo essere state usate, durante il quale nessuna arma può essere utilizzata.<br>
            Tale cooldown è indicato dal contatore rosso che appare in alto a sinistra.<br>
            Aerei:<br>
                - standard: velocità e rateo normali, 1 colpo<br>
                - doubleshot: velocità ridotta, rateo aumentato, 2 colpi<br>
                - speeder: velocità incrementata, rateo ridotto, 1 colpo<br>
                - xevious: velocità ridotta, rateo normale, spara 4 colpi ma solo se fermo<br>
            Nemici:<br>
                - Blind: nemici verde scuro dal nucleo blu, vagano per il campo da gioco senza intraprendere azioni particolari.<br>
                - Shooter: nemici verde chiaro, hanno un nucleo che ad intervalli regolari cambia colore da giallo ad arancione a rosso.<br>
                  Al passaggio da rosso a giallo, sparano un proiettile molto veloce verso il giocatore: attenzione!<br>
                - Stalker: nemici gialli con un occhio al centro, inseguono il giocatore senza tregua.

            Distruggere un Blind fornisce 1 punto.<br>
            Distruggere uno Shooter dal nucleo giallo o arancione fornisce 1 punto, 2 se il nucleo è rosso.<br>
            Distruggere un proiettile di Shooter fornisce 3 punti.<br>
            Distruggere uno Stalker fornisce sempre 2 punti.<br>
            Ogni 8 punti si guadagna una munizione per arma speciale, assegnata, andando da sinistra verso destra, alla prima arma con meno di 3 munizioni.<br>
            Ogni 10 punti si guadagna 1 moneta</p>
        </div>

        <img id="playerImgElement">

    </div>
    <div>
        <a id="home" class="bigButton red" href="homepage.php">
            <img src="./../img/icons/home.png" alt="home">
        </a>
        <button id="startButton" class="bigButton" onclick="start()">Start!</button>
        <button id="pauseButton" class="bigButton" onclick="pause()" disabled>Pause</button>
        <button id="helpButton" class="bigButton" onclick="showHelp()">Guida rapida</button>
    </div>
</body>
</html>