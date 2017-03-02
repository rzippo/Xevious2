//Funzione di controllo per il form di scelta delle armi
//Se più di tre armi vengono selezionate, l'ultima scelta viene annullata
function checkCount(element)
{
	var count = 0;

	for (var i = 0; i < gameSetup.elements.length; i++)
	{
		if(gameSetup.elements[i].type == "checkbox" &&
			gameSetup.elements[i].checked == true  )
		{
				count++;
		}	
	};

	if(count > 3)
		element.checked = false;
}

//Gestisce la creazione della nuova sessione di gioco tramite AJAX
//In caso di risposta positiva dal server, ridireziona verso la pagina di gioco
function createGameSession(event)
{
	event.preventDefault();

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		messageNode.nodeValue = response["message"];
		
		if(response["responseCode"] == 0)
		{
			messageArea.style.color = "green";	
			window.location.assign("./game.php");
		}
		else
		{
			messageArea.style.color = "red";
		}
	}

	messageNode.nodeValue = "Creazione sessione di gioco...";
	messageArea.style.display = "inline";

	var elements = document.getElementById("gameSetup").elements;
	var postString = "seed=" + elements.seed.value
					+"&aereo=" + elements.aereo.value;

	for(var i = 0; i < elements.armi.length; i++)
	{
		if(elements.armi[i].checked)
			postString += ( "&armi[]=" + elements.armi[i].value );
	}

	ajaxRequest("./ajax/game/createGameSession.php", "POST", handler, postString);
}