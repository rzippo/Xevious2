//Utilizza AJAX per ottenere le informazioni della partita
//Inizializza poi lo stato del gioco in base a quanto ricevuto
function getGameSession(autostart)
{
    var handler = function(responseText)
    {
        var response = JSON.parse(responseText);

        if( response["responseCode"] == 0)
        {
            var data = response["data"];
            
            loadGameSeed(data["seed"]);
            loadPlayer(data["aereo"]);
            loadWeaponSet(data["armi"]);
            spawnRate = 800;

            if(autostart)
                start();
        }
        else
        {
            //fatal error!
            console.log(response["message"]);
            window.location.replace("./homepage.php");
        }
    }

    ajaxRequest("./ajax/game/getGameSession.php", "GET", handler);
}
