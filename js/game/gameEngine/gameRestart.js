//Reinizializza la partita registrata nel database tramite AJAX,
//per poi chiamare getGameSession() per reinizializzare il campo di gioco 
function gameRestart()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == 0)
		{
			cleanGameArea();
			getGameSession(true);
			gameReset = false;
		}
	}

	ajaxRequest("./ajax/game/restartGameSession.php", "GET", handler);
}

//Rimuove gli elementi di gioco della precedente partita in vista della reinizializzazione
function cleanGameArea()
{
	for (var i = playerShots.length - 1; i >= 0; i--) 
	{
		playerShots[i].removeElement();
	};

	for (var i = enemiesArray.length - 1; i >= 0; i--) 
	{
		enemiesArray[i].removeElement();
	};

	document.getElementById("scoreCounter").firstChild.nodeValue = 0;
	document.getElementById("coinsCounter").firstChild.nodeValue = 0;
    document.getElementById("cooldownMessage").style.visibility = "hidden";
    document.getElementById("shieldMessage").style.visibility = "hidden";

	inputUp = false;
	inputDown = false;
	inputRight = false;
	inputLeft = false;

	weaponInput = [false, false, false]; 

	shieldCooldown = 0;
	weaponCooldown = 0;
	fireCooldown = 0;
}