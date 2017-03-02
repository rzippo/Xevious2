//Variabile settata dopo l'utilizzo di un'arma, il valore è specifico dell'arma usata
//Se in un dato frame il contatore è 0 è possibile utilizzare un'arma, altrimenti gli input vengono ignorati e il contatore decrementato
var weaponCooldown = 0;

//Contatore relativo all'arma "scudo", tiene traccia della durata rimanente di detto scudo
var shieldCooldown = 0;

//Gestisce i contatori visibili all'utente relativi alle munizioni rimaste
function updateAmmoCounters()
{
    ammoCounter1.firstChild.nodeValue = weaponSet[0].ammoCounter;
    ammoCounter2.firstChild.nodeValue = weaponSet[1].ammoCounter;
    ammoCounter3.firstChild.nodeValue = weaponSet[2].ammoCounter;
}

//Funzione eseguita ad ogni frame, a meno di cooldown attivi esegue la funzione relativa all'input ricevuto.
//Gli input vengono valutati per priorità decrescente, e ne viene eseguito solo uno.
function weaponFrame()
{
    //In caso di cooldown attivo, cancella gli input e decrementa il contatore, compreso quello visibile all'utente
    if(weaponCooldown > 0)
    {
        weaponCooldown--;
        weaponInput = [ false, false, false];

        document.getElementById("cooldownMessage").style.visibility = "visible";
        document.getElementById("cooldownCounter").firstChild.nodeValue = weaponCooldown;

        return;
    }

    if(weaponCooldown == 0)
        document.getElementById("cooldownMessage").style.visibility = "hidden";


    for (var i = 0; i < 3; i++) 
    {
        if(weaponInput[i] == true)
        {
            if(weaponSet[i].ammoCounter > 0)
            {
                //Le munizioni vengono decrementate solo se l'esecuzione ha avuto effetto
                //I cooldown vengono similmente gestiti dalle funzioni specifiche di ciascuna arma
                if( weaponExec(weaponSet[i].type, weaponSet[i].level) )
                {
                    weaponSet[i].ammoCounter--;
                    updateAmmoCounters();
                }
            }
            weaponInput[i] = false;
        }    
    };
}

//Funzione che a seconda degli argomenti esegue la funzione relativa ad una specifica arma
//Restituisce true se l'esecuzione ha avuto effetto
function weaponExec(type, level)
{
    switch(type)
    {
        case "missili":
            {
                switch(level)
                {
                    case "1":
                        {
                            return fireMissile(1);    
                        }
                    case "2":
                        {
                            var shoot = [];
                            for (var i = 0; i < 3; i++){
                                shoot[i] = fireMissile(2);
                            };

                            return (shoot[0] || shoot[1] || shoot[2]); 
                        }
                    case "3":
                        {
                            var shoot = [];
                            for (var i = 0; i < 7; i++){
                                shoot[i] = fireMissile(3);
                            };

                            return (shoot[0] || shoot[1] || shoot[2] || shoot[3] || shoot[4] || shoot[5] || shoot[6]); 
                        }
                }
            }
            break;

        case "scudo":
            {
                raiseShield(level);
                return true;
            }
            break;


        case "bomba":
            {
                if(bombExplosion(level))
                {
                    weaponCooldown = level*level*100;
                    fireCooldown = level*level*50;
                    
                    return true;
                }
                else
                    return false;
            }
            break;

        default:
            console.log("Arma non riconosciuta!");
            return false;
    }
}

//Se trova un nemico non già bersagliato, crea un missile che lo bersagli
//Il livello passato come argomento determina l'immagine utilizzata e il cooldown 
function fireMissile(level)
{
    for (var i = enemiesArray.length - 1; i >= 0; i--) 
    {
        if(enemiesArray[i].targeted)
            continue;
        else
        {
            var missileImg = document.createElement("img");
            missileImg.src = "./../img/weapons/missile" + level + ".png";
            missileImg.alt = "missile" + level;
            gameArea.appendChild(missileImg);

            var playerXCoordinate = parseInt(player.imgElement.style.left);
            var playerYCoordinate = parseInt(player.imgElement.style.bottom);

            var playerWidth = player.imgElement.getBoundingClientRect().width;
            var playerHeight = player.imgElement.getBoundingClientRect().height;
            var missileWidth = missileImg.getBoundingClientRect().width;

            var missileXCoordinate = ( playerXCoordinate + playerWidth/2 - missileWidth/2 );

            missileImg.style.left = missileXCoordinate + 'px';
            missileImg.style.bottom = (playerYCoordinate + playerHeight + 4) + 'px';

            var missile = new PlayerShot("missile" + level, missileImg, 0, enemiesArray[i]);
            playerShots.push(missile);

            enemiesArray[i].targeted = true;
            weaponCooldown += 80*level;
            return true;
        }
    };

    return false;
}

//Imposta lo stato del giocatore come "shielded" e imposta i cooldown, a seconda del livello passato come argomento
function raiseShield(level)
{
    player.imgElement.classList.add("shielded");
    player.shielded = true;

    shieldCooldown = 100*level;
    weaponCooldown = 150*level;
}

//Funzione eseguita ad ogni frame se il giocatore risulta "shielded"
//Gestisce il contatore e, quando questo arriva a 0, rimuove tale stato tramite lowerShield()
function shieldFrame()
{    
    if(shieldCooldown > 0)
    {
        shieldCooldown--;
        
        document.getElementById("shieldMessage").style.visibility = "visible";
        document.getElementById("shieldCounter").firstChild.nodeValue = shieldCooldown;

        return;
    }

    if(shieldCooldown == 0)
    {
        lowerShield();
        document.getElementById("shieldMessage").style.visibility = "hidden";
    }
}

function lowerShield(level)
{
    player.imgElement.classList.remove("shielded");
    player.shielded = false;
}

//Funzione che gestisce le "esplosioni", ossia la creazione di nuovi proiettili in luogo di quelli già presenti
//Numero e dinamica dei nuovi proiettili dipende dal livello passato come argomento
function bombExplosion( level )
{
    var didIt = false;

    var type = (level == 3) ? "standardShot" : "shardShot";
    var shardsCount = (level == 2) ? 8 : 4;
    var explosionImgs = [];

    for (var i = playerShots.length - 1; i >= 0; i--)
    {
        if (playerShots[i].type != "standardShot")
            continue;

        // Creazione immagine per l'esplosione
        explosionImgs[i] = document.createElement("img");
        explosionImgs[i].src = "./../img/weapons/explosion" + level + ".png";
        explosionImgs[i].alt = "boom!";

        explosionImgs[i].style.left = playerShots[i].imgElement.style.left;
        explosionImgs[i].style.bottom = playerShots[i].imgElement.style.bottom;

        gameArea.appendChild(explosionImgs[i]);
      
        // Creazione immagine e oggetti per gestire i nuovi proiettili
        for (var j = 0; j < shardsCount; j++) 
        {
            var shardImg = document.createElement("img");
            shardImg.src = "./../img/weapons/" + type + ".png";
            shardImg.alt = type;

            shardImg.style.left = playerShots[i].imgElement.style.left;
            shardImg.style.bottom = playerShots[i].imgElement.style.bottom;

            gameArea.appendChild(shardImg);

            var shardObject = new PlayerShot(type, shardImg, j*2*Math.PI/shardsCount, null );
            playerShots.push(shardObject);
        }

        playerShots[i].removeElement();
        didIt = true;
    }

    if(didIt)
    {
        //Rimozione dell'immagine dell'esplosione
        setTimeout( function(){
                for (var i = explosionImgs.length - 1; i >= 0; i--) 
                    gameArea.removeChild(explosionImgs[i]); 
            }, 300);

        //In caso di bomba livello 3, è prevista una seconda esplosione dopo 0,5 secondi 
        //che coinvolge i proiettili generati dalla prima
        if(level == 3)
            setTimeout(function() {bombExplosion(2)}, 500);
    }

    return didIt;
}