//Le seguenti variabili di input vengono impostate da inputIn ed inputOut e gestite poi dalle relative funzioni

//Variabili di movimento utilizzate in inputRedirection()
var inputUp = false;
var inputDown = false;
var inputRight = false;
var inputLeft = false;

//Variabili per l'uso di armi speciali, utilizzate in weaponFrame()
var weaponInput = [false, false, false]; 

//Variabile per l'uso del fuoco standard, utilizzata in fireFrame()
var inputFire = false;

//Le funzioni inputIn ed inputOut registrano gli input inviati dall'utente tramite tastiera,
//ed in base a questo impostano le variabili di input
document.addEventListener("keydown", inputIn);
document.addEventListener("keyup", inputOut);

function inputIn(eventObject)
{
    var key = eventObject.keyCode;

    //Frecce direzionali
    if (key == 37)
        inputLeft = true;
    if (key == 38)
        inputUp = true;
    if (key == 39)
        inputRight = true;
    if (key == 40)
        inputDown = true;

   
    //'s': tasto per fuoco standard
    //L'utente può sfruttare un meccanismo di fuoco automatico, mantenendo premuto il pulsante di fuoco,
    //Oppure utilizzare il fuoco manuale premendo ripetutamente il tasto. Questo porta a due diversi ratei di fuoco
    if (key == 83)
        inputFire = true;
}

function inputOut(eventObject) 
{
    var key = eventObject.keyCode;

    if (key == 37)
        inputLeft = false;
    if (key == 38)
        inputUp = false;
    if (key == 39)
        inputRight = false;
    if (key == 40)
        inputDown = false;

     //'s': tasto per fuoco standard
     //L'utente può sfruttare un meccanismo di fuoco automatico, mantenendo premuto il pulsante di fuoco,
     //Oppure utilizzare il fuoco manuale premendo ripetutamente il tasto. Questo porta a due diversi ratei di fuoco
    if (key == 83) 
    {             
        inputFire = false;
        fireCooldown = player.minCooldown;
    }

    //'a': usa arma #1
    if (key == 65) {
        weaponInput[0] = true;       
    }
    
    //'d': usa arma #2
    if (key == 68) {
        weaponInput[1] = true;       
    }

    //'w': usa arma #3
    if (key == 87) {
        weaponInput[2] = true;       
    }

    //tasto invio, scorciatoia per Start/Pausa
    if( key == 13)    
    {
        if (gameOn && pauseButton.disabled == false)
            pause();
        else if(startButton.disabled == false)
            start();
    }
}