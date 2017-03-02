//Funzione che calcolo l'incremento del punteggio in base al tipo di nemico distrutto
function upScoreEvent( enemyObject )
{
	var scoreIncrease;

	switch(enemyObject.type)
	{
		case "blind":
			scoreIncrease = 1;
			break;

		case "shooter":
			if(enemyObject.enemyState == 2)
				scoreIncrease = 2;
			else
				scoreIncrease = 1;
			break;

		case "shooterBullet":
			scoreIncrease = 3;
			break;

		case "stalker":
			scoreIncrease = 2;
	}	

	while(scoreIncrease > 0)
	{
		increaseScore();
		scoreIncrease--;
	}	
}

//Funzione chiamata tante volte quanto è l'incremento del punteggio
//Questo per una corretta gestione delle ricompense
function increaseScore()
{
    var scoreCounter = document.getElementById("scoreCounter");
    var score = parseInt(scoreCounter.firstChild.nodeValue) + 1;
    scoreCounter.firstChild.nodeValue = score;
  
    if(score % 8 == 0)
    {
    	
    	for (var i = 0; i < weaponSet.length; i++) 
    	{
    		if(weaponSet[i].type == "none")
    			break;

    		if(weaponSet[i].ammoCounter < 3)
    		{
    			weaponSet[i].ammoCounter++;
    			updateAmmoCounters();
    			break;
    		}	
    	};
    }

  	if(score % 10 == 0)
		coinUp();
}

//Gestisce l'incremento delle monete del giocatore tramite AJAX
function coinUp()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if( response["responseCode"] == 0)
		{
			var coinsCounter = document.getElementById("coinsCounter");
			var coins = parseInt(coinsCounter.firstChild.nodeValue) + 1;
			coinsCounter.firstChild.nodeValue = coins;
		}
	}

	ajaxRequest("./ajax/game/coinUp.php", "GET", handler);
}