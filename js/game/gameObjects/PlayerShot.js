//Array contenente gli oggetti PlayerShot presenti in gioco
var playerShots = [];

//Oggetto che rappresenta un proiettile del giocatore, definisce e gestisce il comportamento dell'elemento img che lo rappresenta nell'interfaccia di gioco
//Ha GameObject come prototipo
function PlayerShot(type, shotImgElement, alpha, enemyTarget)
{
    this.type = type;
	var speedConstant = (type == "standardShot" || type == "shardShot") ? 1.1 : 1.25;
    
    var initSpeedVector = {
            x: speedConstant*player.speedModule()*Math.cos(alpha),
            y: speedConstant*player.speedModule()*Math.sin(alpha)
        };

    var redirectionFunction = 
        (type.lastIndexOf("missile", 0) === 0) ?
            seekingRedirection : forwardRedirection;

	this.shotFrameAction = function()
	{
        //Controlla se vi è stata una collisione con un nemico.
        //Se ciò è avvenuto, gestisce l'incremento del punteggio e la rimozione di nemico e proiettile dal gioco
        var enemyHit = collision( this, enemiesArray);
        if( enemyHit )
        {
            upScoreEvent(enemyHit);
            enemyHit.removeElement();
           
            this.removeElement();
            return;
        }

        //Se il proiettile è un missile a ricerca, l'immagine che lo rappresenta è ruotata in mdo che punti nella direzione di movimento
		if( type.lastIndexOf("missile", 0) === 0 )
        {
            var alpha = Math.atan2(this.speedVector.y, this.speedVector.x);
            
            this.imgElement.style.transform = "rotate(" + ( - alpha + Math.PI/2 ) + "rad)";
        }
	}

    //Funzione chiamata in caso il bersaglio del missile a ricerca è stato rimosso dal gioco
    //Cerca un nuovo bersaglio valido, modificando targetGameObject e restituendo true se la ricerca ha successo
    function seekerTargetFault( seekerGameObject )
    {
        var i = 0;
        for(; i < enemiesArray.length; i++)
        {
            if( enemiesArray[i].targeted )
                continue;
            else
                break;
        }

        if( i < enemiesArray.length )
        {
            seekerGameObject.targetGameObject = enemiesArray[i];
            enemiesArray[i].targeted = true;
            return true;
        }
        else
            return false;
    }

    //Gestisce la rimozione del proiettile dall'area di gioco
    function removeShot( playerShot )
    {
        gameArea.removeChild(playerShot.imgElement);
        
        if( playerShot.targetGameObject != null )
        {
           playerShot.targetGameObject.targeted = false;
           playerShot.targetGameObject = null;
        }

        var i = playerShots.indexOf(playerShot);
        playerShots.splice(i, 1);
    }

    //Costruttore del prototipo GameObject
    GameObject.call(
            this,
            shotImgElement,
            this.shotFrameAction,
            removeShot,
            speedConstant,
            redirectionFunction,
            initSpeedVector,
            enemyTarget,
            (type.lastIndexOf("missile", 0) === 0) ? seekerTargetFault : false
        );
}

PlayerShot.prototype = Object.create(GameObject.prototype);