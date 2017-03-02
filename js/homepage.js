var gameSetup;
var messageArea;
var messageNode;

function load()
{
	gameSetup = document.getElementById("gameSetup");

	messageArea = document.getElementById("messageArea");
	//messageArea.style.display = "none";
	messageNode = messageArea.firstChild;
}

function showGameSetup()
{
	var seed; 
	
	//Il generatore di numeri pseudocasuali utilizzato all'interno del gioco non può avere seed uguale a 0
	do
	{
		seed = Math.floor(Math.random()*100000);
	}
	while(seed == 0);
	
	var seedInput = document.getElementById('seed');
	seedInput.value = seed;

	document.getElementById("playButton").disabled = true;
	document.getElementById('gameSetup').style.display='block';
}

function showHelp()
{
	document.getElementById("helpText").style.display = "block";
}

function hideHelp()
{
	document.getElementById("helpText").style.display = "none";
}

//Gestisce il logout dell'utente tramite AJAX
function logout()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == 0)
			window.location.replace("./../index.php");
	}

	ajaxRequest("./../php/ajax/session/logout.php", "GET", handler);
}