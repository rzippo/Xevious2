//Gestisce il termine della partita, mostrando i risultati al giocatore e avviando l'immissione del risultato nel database
function gameOver()
{
    var score = document.getElementById("scoreCounter").firstChild.nodeValue;

    pauseEmLabel = document.getElementById("pauseEmLabel");
    pausePreLabel = document.getElementById("pausePreLabel");

    gameOn = false;
    gameReset = true;

    pauseEmLabel.firstChild.nodeValue = "GAME OVER!"           
    pausePreLabel.firstChild.nodeValue = "Il tuo punteggio " + '\u00E8' + " " + score + "\nCaricamento punteggio...";

    pauseLayer.style.display = "";

    pauseButton.disabled = true;
    startButton.disabled = true;

    submitScore(score);
}

//Gestisce l'immissione del risultato nel database tramite AJAX
//Al termine del processo rende possibile cominciare una nuova partita
function submitScore(score)
{
    var handler = function(responseText)
    {
        var response = JSON.parse(responseText);

        if(response["responseCode"] == 0)
        {
            pausePreLabel.firstChild.nodeValue = "Il tuo punteggio " + '\u00E8' + " " + score + 
                "\nLa relativa posizione in classifica " + '\u00E8' + " " + response["data"] +
                "\nPremi Start per rigiocare questa partita!";

            startButton.disabled = false;
            gameArea.focus();
        }
        else
        {
            pausePreLabel.firstChild.nodeValue = "Il tuo punteggio " + '\u00E8' + " " + score + 
                "\nCaricamento fallito. Torna alla home per cominciare una nuova partita.";
        }
    }

    var postString = "score=" + score + "&seed=" + gameSeed;
    ajaxRequest("./ajax/game/submitScore.php", "POST", handler, postString);
}