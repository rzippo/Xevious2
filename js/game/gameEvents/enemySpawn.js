//Minore è spawnRate, maggiore è la frequenza di generazione di nemici
var spawnRate;

//Contatore per gestire l'incremento della difficoltà di gioco. Corrisponde a 15 secondi
var increaseTimer = 750;

//Incrementa la difficoltà di gioco ogni 15 secondi, aumentando la frequenza di generazione di nemici
function increaseSpawnRate()
{
    if(increaseTimer == 0)
    {
        spawnRate /= 1.15;
        increaseTimer = 750;
    }
    else
    {
        increaseTimer--;
    }
}


//Genera un vettore bidimensionale dal modulo dato
//Per meccaniche di gioco, la componente y è sempre negativa
function randomSpeedVector(speedModule)
{
    var alpha;

    do
    {
        alpha = -Math.PI*(randomGenerator());
    }
    while(alpha == 0);

    return  {
            x: speedModule * Math.cos(alpha),
            y: speedModule * Math.sin(alpha)
        };
}


//Genera un numero pseudocasuale e a seconda di questo crea o no un nuovo nemico il cui tipo è scelto ancora in base al numero.
//Un minore spawnRate influisce sulla decisione incrementando le probabilità di generazione del nemico 
function spawnEnemy()
{
    var dice = Math.ceil(randomGenerator() * spawnRate);

    if(dice <= 10)
    {
        var type;
        if(dice <= 2)
            type = "stalker";
        else
        {
            if(dice <= 5)
                type = "shooter";
            else
                type = "blind";
        }

        //Creazione dell'elemento img
        var enemyImgElement = document.createElement("img");
        enemyImgElement.src = "./../img/enemies/" + type + "0.png";
        enemyImgElement.alt = type;

        gameArea.appendChild(enemyImgElement);

        imgWidth = enemyImgElement.getBoundingClientRect().width;
        imgHeight = enemyImgElement.getBoundingClientRect().height;

        enemyImgElement.style.bottom = ( GAME_HEIGHT - imgHeight - 2) + "px";
        enemyImgElement.style.left = ( (GAME_WIDTH - imgWidth)*( randomGenerator() ) ) + "px";

        //Creazione del GameObject che gestisce l'immagine
        var enemy = new Enemy(type, enemyImgElement);
        enemiesArray.push(enemy);
    }
}