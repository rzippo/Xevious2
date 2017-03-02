//Mostra la guida di gioco, mettendo in pausa l'esecuzione del gioco
function showHelp()
{
	pause();
	helpLayer.style.display = "block";

	startButton.disabled = true;
	helpButton.firstChild.nodeValue = "Chiudi Help";
	helpButton.classList.add("red");
	helpButton.onclick = hideHelp;

	helpLayer.focus();
}

//Nasconde la guida di gioco
function hideHelp()
{
	helpLayer.style.display = "none";
	startButton.disabled = false;

	helpButton.firstChild.nodeValue = "Help";
	helpButton.classList.remove("red");
	helpButton.onclick = showHelp;

	gameArea.focus();
}