var boardEntries;
var pageCount;
var username;

var entryCount = 20;
var currentPage = 0;
var mode = "global";

var board;
var messageNode;

//Metodo di utilita' che restituisce true solo se la stringa comincia per il prefisso dato
String.prototype.startsWith = function(prefix)
{
	if(this.lastIndexOf(prefix, 0) == 0)
		return true;
	else
		return false;
}

function load()
{
	board = document.getElementById("board");

	var messageArea = document.getElementById("messageArea");
	messageArea.style.display = "none";
	messageNode = messageArea.firstChild;
	
	getPageCount();
	getBoardEntries(0);
}

//Ottiene tramite AJAX il numero di pagine corrispondenti alla modalità utilizzata ed il numero di elementi visualizzati per pagina
function getPageCount()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == 1)
		{
			messageNode.nodeValue = response["message"];
			messageNode.parentNode.style.display = "block";
			messageNode.parentNode.style.color = "red";
		}
		else
		{
			pageCount = parseInt(response["data"]);

			//Reset di currentPage a 0 e aggiornamento pulsanti di cambio pagina
			pageReset();
		}	
	}

	var postString = "mode=" + mode + "&page=" + currentPage + "&entryCount=" + entryCount;
	ajaxRequest("./ajax/leaderboard/getPageCount.php", "POST", handler, postString);
}

//Rimuove le voci presenti nella tabella
function clearBoard()
{
	gameSetupRow.style.display = "none";

	var boardRows = board.childNodes;
	
	for (var i = boardRows.length - 1; i >= 0; i--) 
	{
		if((typeof boardRows[i])!="object" || (boardRows[i].id != "header" && boardRows[i].id != "gameSetupRow"))
			board.removeChild(boardRows[i]);
	};
}

//Gestisce tramite AJAX l'ottenimento delle voci da visualizzare nella tabella
function getBoardEntries(page)
{
	page = (typeof page == "undefined") ? currentPage : page;	//Argomento default, assume il valore di currentPage se non specificato - per cambi di modalita'

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == "1")
		{
			messageNode.nodeValue = response["message"];
			messageNode.parentNode.style.display = "block";
			messageNode.parentNode.style.color = "red";

			clearBoard();
		}
		else
		{
			messageNode.parentNode.style.display = "none";

			var data = response["data"];
			username = data[0];
			boardEntries = data[1];
			
			updateLeaderboard();
		}
	}

	var postString = "mode=" + mode + "&page=" + page + "&entryCount=" + entryCount;
	ajaxRequest("./ajax/leaderboard/getLeaderboard.php", "POST", handler, postString);
}

//Utilizza le informazioni ottenute dal server per popolare la tabella con i nuovi risultati
function updateLeaderboard()
{
	clearBoard();

	for (var i = 0; i < boardEntries.length; i++)	
	{
		var score = boardEntries[i];
		var boardEntry = document.createElement("tr");		

		//Evidenzia i punteggi del giocatore solo in modalita' global e seedWise
		if( ( mode == "global" || mode.startsWith("seedWise_") ) && score["username"] == username)
			boardEntry.dataset.player = "true";

		//Colonna 'Posizione'
		var entryData = document.createElement("td");
		entryData.appendChild(document.createTextNode(score["std_rank"]));
		boardEntry.appendChild(entryData);

		//Colonna 'Punteggio'
		entryData = document.createElement("td");
		entryData.appendChild(document.createTextNode(score["score"]));
		boardEntry.appendChild(entryData);

		//Colonna 'Utente' - definizione pulsante per classifica utente
		entryData = document.createElement("td");
		
			if(mode.startsWith("userWise"))
			{
				entryData.appendChild(document.createTextNode(score["username"]));
			}
			else
			{
				var userWiseButton = document.createElement("button");
				userWiseButton.type = "button";
				userWiseButton.classList.add("simpleButton");
				userWiseButton.appendChild(document.createTextNode(score["username"]));

				userWiseButton.onclick = function()
				{
					userWiseMode(this.firstChild.nodeValue);
				}

				entryData.appendChild(userWiseButton);
			}
			
		boardEntry.appendChild(entryData);	

		//Colonna 'Data'
		entryData = document.createElement("td");
		entryData.appendChild(document.createTextNode(score["data"]));
		boardEntry.appendChild(entryData);

		//Colonna dei pulsanti gara
		entryData = document.createElement("td");
		
			//Definizione pulsante "Classifica gara"
			if(!mode.startsWith("seedWise_"))
			{	
				var seedWiseButton = document.createElement("button");
				seedWiseButton.type = "button";
				seedWiseButton.classList.add("mediumButton");
				seedWiseButton.appendChild(document.createTextNode("Classifica gara"));
				seedWiseButton.dataset.seed = score["seed"];

				seedWiseButton.onclick = function()
				{
					seedWiseMode(this.dataset.seed);
				}

				entryData.appendChild(seedWiseButton);
			}

			//Definizione pulsante "Gareggia!"
			var challengeButton = document.createElement("button");
			challengeButton.type = "button";
			challengeButton.classList.add("mediumButton", "red");
			challengeButton.appendChild(document.createTextNode("Gareggia!"));
			challengeButton.dataset.seed = score["seed"];

			challengeButton.onclick = function()
			{
				setupChallenge(this.parentNode.parentNode, this.dataset.seed);	//Risale il DOM fino all'elemento tr
			}

			entryData.appendChild(challengeButton);
			
		boardEntry.appendChild(entryData);

		//Compilata la riga, la inseriamo nella tabella
		board.appendChild(boardEntry);
	}
}

//Eventi per cambio di modalita'

function globalMode()
{
	mode = "global";

	getPageCount();
	getBoardEntries(0);
}

function personalMode()
{
	mode = "personal";

	getPageCount();
	getBoardEntries(0);
}
	
function seedWiseMode(seed)
{
	mode = "seedWise_" + seed;

	getPageCount();
	getBoardEntries(0);
}

function userWiseMode(username)
{
	username = (typeof username != "undefined") ? ("_" + username) : "";

	mode = "userWise" + username;	//Se username non e' specificato, il server restituira' i punteggi dell'utente corrente

	getPageCount();
	getBoardEntries(0);
}		

//Eventi per pulsanti di cambio pagina

function pageReset()
{
	currentPage = 0;
	document.getElementById("prevPage").setAttribute("disabled", "disabled");
	if(pageCount > 1)
		document.getElementById("nextPage").removeAttribute("disabled");
	else
		document.getElementById("nextPage").setAttribute("disabled", "disabled");
}

function prevPage()
{
	if(currentPage > 0)
		currentPage--;

	if(currentPage == 0)
		document.getElementById("prevPage").setAttribute("disabled", "disabled");

	if(currentPage < pageCount - 1)
		document.getElementById("nextPage").removeAttribute("disabled");

	if(currentPage == pageCount - 1)
		document.getElementById("nextPage").setAttribute("disabled", "disabled");

	getBoardEntries();
}

function nextPage()
{
	if(currentPage < pageCount - 1)
		currentPage++;

	if(currentPage == pageCount - 1)
		document.getElementById("nextPage").setAttribute("disabled", "disabled");

	if(currentPage > 0)
		document.getElementById("prevPage").removeAttribute("disabled");

	getBoardEntries();
}

function setupChallenge(challengedEntry, seed)
{
	var seedInput = document.getElementById("seed");
	seedInput.value = seed;

	board.insertBefore(gameSetupRow, challengedEntry.nextSibling);
	gameSetupRow.style.display = "table-row";
}

