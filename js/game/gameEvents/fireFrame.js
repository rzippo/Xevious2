//Contatore settato ad ogni azione di fuoco, che impedisce di ripeterla finché il contatore è maggiore di 0
//Il meccanismo del fuoco manuale può ridurre il valore iniziale di questo contatore
var fireCooldown = 0;

var standardShotImgPath = "./../img/weapons/standardShot.png";

//Se non vi è cooldown ed è presente l'input dell'utente, la funzione esegue le operazioni relative al tipo di aereo utilizzato
function fireFrame()
{
    if(fireCooldown == 0)
    {
        if (inputFire)
        {
            if(player.type == "standard" || player.type == "speeder")
                singleFire()

            if(player.type == "doubleshot")
                doubleFire();

            if(player.type == "xevious")
                spreadFire();
        }
        
    }
    else
    {
        fireCooldown--;
    }
}

//Spara un singolo proiettile in direzione verticale
function singleFire()
{
    var shotImg = document.createElement("img");
    shotImg.src = standardShotImgPath;
    shotImg.alt = "standardShot";
    gameArea.appendChild(shotImg);

    var playerXCoordinate = parseInt(player.imgElement.style.left);
    var playerYCoordinate = parseInt(player.imgElement.style.bottom);

    var playerWidth = player.imgElement.getBoundingClientRect().width;
    var playerHeight = player.imgElement.getBoundingClientRect().height;
    var shotWidth = shotImg.getBoundingClientRect().width;

    var shotXCoordinate = ( playerXCoordinate + playerWidth/2 - shotWidth/2 );

    shotImg.style.left = shotXCoordinate + 'px';
    shotImg.style.bottom = (playerYCoordinate + playerHeight + 1) + 'px';

    var alpha = Math.PI/2;
    var shot = new PlayerShot("standardShot", shotImg, alpha, null);
    playerShots.push(shot);

    fireCooldown = (player.type == "standard") ? 15 : 25;
}

//Spara due proiettili leggermente decentrati, in direzione verticale
function doubleFire()
{
    var shotImg1 = document.createElement("img");
    shotImg1.src = standardShotImgPath;
    shotImg1.alt = "standardShot";
    gameArea.appendChild(shotImg1);

    var shotImg2 = document.createElement("img");
    shotImg2.src = standardShotImgPath;
    shotImg2.alt = "standardShot";
    gameArea.appendChild(shotImg2);

    var playerXCoordinate = parseInt(player.imgElement.style.left);
    var playerYCoordinate = parseInt(player.imgElement.style.bottom);

    var playerWidth = parseInt(player.imgElement.getBoundingClientRect().width);
    var playerHeight = player.imgElement.getBoundingClientRect().height;
    var shotWidth = parseInt(shotImg1.getBoundingClientRect().width);

    var shot1XCoordinate = ( playerXCoordinate + playerWidth/6 - shotWidth/2 );
    var shot2XCoordinate = ( playerXCoordinate + 5*playerWidth/6 - shotWidth/2 );

    shotImg1.style.left = shot1XCoordinate + 'px';
    shotImg1.style.bottom = (playerYCoordinate + playerHeight - 5) + 'px';

    shotImg2.style.left = shot2XCoordinate + 'px';
    shotImg2.style.bottom = (playerYCoordinate + playerHeight - 5) + 'px';

    var alpha = Math.PI/2;
    var shot1 = new PlayerShot("standardShot", shotImg1, alpha, null);
    playerShots.push(shot1);

    var shot2 = new PlayerShot("standardShot", shotImg2, alpha, null);
    playerShots.push(shot2);

    fireCooldown = 10;
}

//Solo se l'aereo è fermo, spara 4 proiettili a ventaglio
function spreadFire()
{
    if( player.speedVector.x != 0 || player.speedVector.y != 0 )
        return;

    doubleFire();

    var shotImgL = document.createElement("img");
    shotImgL.src = standardShotImgPath;
    shotImgL.alt = "standardShot";
    gameArea.appendChild(shotImgL);

    var shotImgR = document.createElement("img");
    shotImgR.src = standardShotImgPath;
    shotImgL.alt = "standardShot";
    gameArea.appendChild(shotImgR);

    var playerXCoordinate = parseInt(player.imgElement.style.left);
    var playerYCoordinate = parseInt(player.imgElement.style.bottom);

    var playerWidth = parseInt(player.imgElement.getBoundingClientRect().width);
    var playerHeight = player.imgElement.getBoundingClientRect().height;
    var shotWidth = parseInt(shotImgL.getBoundingClientRect().width);

    var shotLXCoordinate = ( playerXCoordinate - shotWidth/2 );
    var shotRXCoordinate = ( playerXCoordinate + playerWidth - shotWidth/2 );

    shotImgL.style.left = shotLXCoordinate + 'px';
    shotImgL.style.bottom = (playerYCoordinate + playerHeight - 7) + 'px';

    shotImgR.style.left = shotRXCoordinate + 'px';
    shotImgR.style.bottom = (playerYCoordinate + playerHeight - 7) + 'px';

    var alphaL = 4*Math.PI/6;

    var shotL = new PlayerShot("standardShot", shotImgL, alphaL, null);
    playerShots.push(shotL);

    var alphaR = 2*Math.PI/6;

    var shotR = new PlayerShot("standardShot", shotImgR, alphaR, null);
    playerShots.push(shotR);

    fireCooldown = 15;
}