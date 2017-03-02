//Unico oggetto di tipo Player
var player;

//Oggetto che rappresenta l'aereo controllato dal giocatore
//Ha GameObject come prototipo
function Player(type)
{
	this.type = type;
	this.shielded = false;
	
	//Minima distanza, in termini di frame, tra un'azione di fuoco e la successiva.
	//Utilizzata in caso di fuoco manuale
	this.minCooldown =  (type == "doubleshot") ? 5 : ((type == "speeder") ? 8 : 6);
	
	var speedConstant = (type == "speeder") ? 1.2 : ((type == "standard") ? 1 : 0.75);
	var playerImgElement = document.getElementById("playerImgElement");

	//Variabili per la gestione dell'animazione
	var animationState = 0;
	var animationCount = 50;

	this.playerAnimationFrame = function()
	{
		if(this.shielded)
			shieldFrame();

		if(animationCount == 0)
		{
			animationCount = 50;
			animationState = (animationState == 0) ? 1 : 0;
			playerImgElement.src = "./../img/planes/" + type + animationState + ".png";
		}
		else
			animationCount--;
	}

    //Costruttore del prototipo GameObject
	GameObject.call(
			this,
			playerImgElement,
			this.playerAnimationFrame,
			null,							//L'oggetto player non viene mai rimosso dall'area di gioco
			speedConstant,
			inputRedirection,
			null,
			null,
			false
		);
}

Player.prototype = Object.create(GameObject.prototype);

//Inizializza l'elemento img corrispondente all'aereo del giocatore e l'oggetto che lo rappresenta
function loadPlayer(type)
{
	setupPlayerImgElement(type);
	player = new Player(type);
}

//Inizializza l'elemento img corrispondente all'aereo del giocatore
function setupPlayerImgElement(type)
{
	var playerImgElement = document.getElementById("playerImgElement");
	playerImgElement.classList.remove("shielded");
	playerImgElement.src = "./../img/planes/" + type + "0.png";
	playerImgElement.alt = type;

	playerImgElement.style.left = GAME_WIDTH/2 + 'px';
    playerImgElement.style.bottom = 2 + 'px';
}