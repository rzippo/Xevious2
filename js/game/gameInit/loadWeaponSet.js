//Oggetto utilizzato per la gestione delle armi a disposizione dell'utente
function Weapon(type, level, ammunitions)     
{
    this.type = type;
    this.ammoCounter = (typeof ammunitions !== "undefined") ? ammunitions : 0;
    this.level = (typeof level !== "undefined") ? level : 1;
}

//Array contenente le armi disponibili all'utente, rappresentate da oggetti Weapon
var weaponSet = [];

//Utilizza i dati ricevuti dal server per inizializzare il vettore weaponSet
//Inizializza poi l'UI tramite setupWeaponUI()
function loadWeaponSet(weaponStringSet)
{
    weaponSet = [];
    
    var weaponNumber = Math.min(3, weaponStringSet.length);

    for (var i = 0; i < weaponNumber; i++) 
    {
        var string = weaponStringSet[i];
        var stringSplit = string.split("_");

        var weapon = new  Weapon(stringSplit[0], stringSplit[1], 1);

        weaponSet.push(weapon);
    };

    for(var i = 0; i < 3 - weaponNumber; i++)
        weaponSet.push( new Weapon("none") );

    setupWeaponUi();
}

//Utilizzando il vettore weaponSet, inizializza l'interfaccia utente riguardante le armi e le relative munizioni
function setupWeaponUi()
{
    var weaponTile1 = document.getElementById("weaponTile1");
    var weaponTile2 = document.getElementById("weaponTile2");
    var weaponTile3 = document.getElementById("weaponTile3");

    weaponTile1.src = "./../img/icons/" + weaponSet[0].type + weaponSet[0].level + ".png";
    weaponTile1.alt = weaponSet[0].type + weaponSet[0].level;

    weaponTile2.src = "./../img/icons/" + weaponSet[1].type + weaponSet[1].level + ".png";
    weaponTile2.alt = weaponSet[1].type + weaponSet[1].level;    

    weaponTile3.src = "./../img/icons/" + weaponSet[2].type + weaponSet[2].level + ".png";
    weaponTile3.alt = weaponSet[2].type + weaponSet[2].level;    

    ammoCounter1 = document.getElementById("ammoCounter1");
    ammoCounter2 = document.getElementById("ammoCounter2");
    ammoCounter3 = document.getElementById("ammoCounter3");

    ammoCounter1.firstChild.nodeValue = weaponSet[0].ammoCounter;
    ammoCounter2.firstChild.nodeValue = weaponSet[1].ammoCounter;
    ammoCounter3.firstChild.nodeValue = weaponSet[2].ammoCounter;
}