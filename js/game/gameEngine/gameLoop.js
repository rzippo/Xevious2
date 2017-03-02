//A seconda del valore gameReset, mette in esecuzione il gioco o ne provoca una nuova inizializzazione
function start()
{
    if (gameReset) 
        gameRestart();
    else
    {
        pauseLayer.style.display = "none";

        pauseEmLabel = document.getElementById("pauseEmLabel");
        pausePreLabel = document.getElementById("pausePreLabel");

        pauseEmLabel.firstChild.nodeValue = "";                                                
        pausePreLabel.firstChild.nodeValue = "Gioco in pausa.\nPremi Start per continuare!";

        startButton.disabled = true;
        pauseButton.disabled = false;

        startButton.blur();
        gameArea.focus();
        gameOn = true;
    }
}

//Mette in pausa l'esecuzione del gioco
function pause()
{
    gameOn = false;

    pauseButton.disabled = true;
    startButton.disabled = false;

    pauseLayer.style.display = "";

    gameArea.focus();
}

//Eseguinta ad intervalli di 20 millisecondi, gestisce l'esecuzione del gioco chiamando
//a sua volta le funzioni che gestiscono gli elementi di gioco
function frame()
{
    if (gameOn)
    {
        //Gestione movimento del giocatore
        player.frame();

        //Gestione azioni dei proiettili del giocatore
        for (var i = playerShots.length - 1; i >= 0; i--) 
        {
            playerShots[i].frame();
        };

        //Gestione azioni dei nemici
        for (var i = enemiesArray.length - 1; i >= 0; i--) 
        {
            enemiesArray[i].frame();
        };
        
        //Controllo della collisione tra il giocatore e nemici.
        //Se il giocatore è "shielded" il nemico è distrutto, altrimenti la partita termina
        enemyCollision = collision(player, enemiesArray)
        if ( enemyCollision )    
        {
            if(player.shielded)
            {
                upScoreEvent(enemyCollision);
                enemyCollision.removeElement();
            }
            else
            {
                console.log("Game over!");
                gameOver();
            }
        }

        //Gestione azioni del giocatore
        weaponFrame();
        fireFrame();
        
        //Generazione dei nemici
        increaseSpawnRate();
        spawnEnemy();
    }
}