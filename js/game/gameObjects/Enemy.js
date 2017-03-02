//Array contenente gli oggetti Enemy presenti in gioco
var enemiesArray = [];

//Oggetto che rappresenta un nemico, definisce e gestisce il comportamento dell'elemento img che lo rappresenta nell'interfaccia di gioco
//Ha GameObject come prototipo
function Enemy(type, enemyImgElement, initSpeedVector)
{
    this.type = type;
    this.enemyState = 0;

    //I proiettili di nemici di tipo Shooter non possono essere bersagliati da missili a ricerca
    this.targeted = (type == "shooterBullet") ? true : false;

    //Definizione il tipo di movimento e la velocità iniziale dell'elemento
    var redirectionFunction = (type == "shooterBullet") ? forwardRedirection : ( (type == "stalker") ? seekingRedirection : bouncingRedirection );
  	var speedConstant = (type == "shooterBullet") ? 1.1 : ( (type == "standard") ? 0.85 : 0.65 );

    if(type != "shooterBullet")
       initSpeedVector = randomSpeedVector( speedConstant*speedScale );

    //Variabili per la gestione dello stato interno, utilizzate per nemici di tipo Shooter
    var MAX_COUNTER = 35;
    var stateCounter = MAX_COUNTER;

    //Funzione che, in base al tipo dell'elemento, ne definisce il comportamento
	this.enemyFrameAction = function()
	{
        switch(type)
        {
            //I nemici "stalker" presentano un'occhio che punta nella direzione in cui si sta muovendo
            //La funzione elabora il vettore di movimento corrente per impostare l'immagine corretta
            case "stalker":
                var alpha = Math.atan2( this.speedVector.y, this.speedVector.x ) + (9/8)*Math.PI;
                this.enemyState = Math.floor( alpha / (Math.PI/4) ) % 8;
                enemyImgElement.src = "./../img/enemies/" + type + this.enemyState + ".png";
                break;

            //I nemici "shooter" passano fra 3 stati distinti ad intervalli regolari, indicati visivamente dal cambiamento del colore al centro
            //Al passaggio dallo stato 2 a 0 viene generato un nuovo nemico, di tipo "shooterBullet", direzionato verso il giocatore
            case "shooter":
                stateCounter--;
                if(stateCounter == 0)
                {
                    if(this.enemyState == 2)
                    {
                        var bulletImg = document.createElement("img");
                        bulletImg.src = "./../img/enemies/shooterBullet0.png";
                        bulletImg.alt = "shooterBullet";

                        gameArea.appendChild(bulletImg);

                        var xShooterCenter = parseInt(enemyImgElement.style.left) + ( enemyImgElement.getBoundingClientRect().width / 2 );
                        var yShooterCenter = parseInt(enemyImgElement.style.bottom) + ( enemyImgElement.getBoundingClientRect().height / 2 );

                        bulletImg.style.left = xShooterCenter - bulletImg.getBoundingClientRect().width /2;
                        bulletImg.style.bottom = yShooterCenter - bulletImg.getBoundingClientRect().height /2;

                        var bulletVector = seekingRedirection(bulletImg, 1.1*player.speedModule(), null, player );
                        
                        var shooterBullet = new Enemy("shooterBullet", bulletImg, bulletVector);
                        shooterBullet.targeted = true;
                        enemiesArray.push(shooterBullet);

                        this.enemyState = 0;
                    }
                    else
                    {
                        this.enemyState++;
                    }

                    stateCounter = MAX_COUNTER;
                    enemyImgElement.src = "./../img/enemies/shooter" + this.enemyState + ".png";
                }
                break;

            case "blind":
                break;

            case "shooterBullet":
                break;
        }

	}

    //Gestisce la rimozione di un nemico dal gioco
    function enemyRemoveFunction( enemy)
    {
        gameArea.removeChild(enemy.imgElement);
        enemy.imgElement = null;

        var i = enemiesArray.indexOf(enemy);
        enemiesArray.splice(i, 1);
    }

    //Costruttore del prototipo GameObject
	GameObject.call(
            this,
			enemyImgElement,
			this.enemyFrameAction,
            enemyRemoveFunction,
			speedConstant,
			redirectionFunction,
			initSpeedVector,
			player, false
		);
}

Enemy.prototype = Object.create(GameObject.prototype);