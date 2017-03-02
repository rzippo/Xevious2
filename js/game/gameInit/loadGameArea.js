//Dichiarazione delle variabili globali relative all'area di gioco
var GAME_WIDTH;
var GAME_HEIGHT;

var speedScale;

var gameOn = false;
var gameReset = false;

var gameArea;
var pauseLayer;
var helpLayer;

var startButton;
var pauseButton;

//Funzione eseguita al caricamento della pagina, inizializza le variabili relative ad elementi dell'area di gioco
//Chiamando getGameSession inizializza la sessione di gioco
//Tramite updateGameSize gestisce le dimensioni dell'area di gioco e la risposta a ridimensionamenti della finestra
function loadGameArea()
{
    gameArea = document.getElementById("gameArea");
    pauseLayer = document.getElementById("pauseLayer");
    helpLayer = document.getElementById("helpLayer");

    startButton = document.getElementById("startButton");
    pauseButton = document.getElementById("pauseButton");
    
    getGameSession(false);
    updateGameSize();
    
    window.addEventListener("resize", updateGameSize);
}

//Ad ogni ridimensionamento della finestra vengono riassegnate le variabili globali per la gestione dei bordi del gioco
// e per la velocita' degli elementi di gioco 
function updateGameSize()
{
    GAME_WIDTH = gameArea.clientWidth;
    GAME_HEIGHT = gameArea.clientHeight;

    speedScale = GAME_WIDTH/216 + 3/7;
}

//Definisce lo sfondo dell'area di gioco in base alla generazione di un numero pseudocasuale
function setBackground()
{
    var backgrounds = ['grass', 'river', 'sand', 'vulcan', 'crag'];

    var dice = Math.floor(randomGenerator()*backgrounds.length*10000) % backgrounds.length;
    gameArea.style.backgroundImage = "url(./../img/game_backgrounds/" + backgrounds[dice] + ".png)";
}