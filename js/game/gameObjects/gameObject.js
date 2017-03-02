//Un GameObject è la rappresentazione di un elemento di gioco.
//È quindi associato ad un elemento immagine, e ne definisce e gestisce il comportamento.

//In particolare è utilizzato come prototipo degli oggetti Player, Enemy e PlayerShot, che definiscono
//le variabili e le funzioni passate come argomento al costruttore di GameObject e utilizzate all'interno dei suoi membri

//imgElement è l'elemento img gestito dal GameObject
//ownFrameAction è una funzione che gestisce comportamento dell'elemento quali animazioni o altre azioni
//elementRemovalFunction è una funzione che gestisce la rimozione dell'elemento dal gioco
//speedConstant è la velocità relativa dell'oggetto rispetto alla variabile globale speedScale
//frameRedirectionFunction è una funzione che, in base agli argomenti passati, restituisce un vettore bidimensionale che indica lo spostamento da eseguire
//		in caso restisca false l'elemento viene rimosso, a meno che un'esecuzione di targetFault non abbia esito positivo
//initSpeedVector è il vettore velocità iniziale
//targetGameObject è l'elemento che il GameObject insegue durante i suoi spostamenti. È utilizzato in caso frameRedirectionFunction=seekerRedirection
//targetFault è la funzione eseguita in caso frameRedirectionFunction restituisca false. Utilizzata per oggetti "a ricerca", ha lo scopo di cercare un nuovo bersaglio

function GameObject(imgElement, ownFrameAction, elementRemovalFunction, speedConstant, frameRedirectionFunction, initSpeedVector, targetGameObject, targetFault)
{
	this.imgElement = imgElement;
	this.speedVector = initSpeedVector;
	this.targetGameObject = targetGameObject;

	if(!targetFault)
	{
		targetFault = function(){
			return false;
		}	
	}

	this.speedModule = function()
	{
		return speedConstant * speedScale;
	}

	this.removeElement = function()
	{
		elementRemovalFunction( this );
	}

	//Funzione chiamata ad ogni frame, gestisce il movimento e le azioni caratteristiche dell'elemento
	this.frame = function()
	{
		var newSpeedVector = frameRedirectionFunction( this.imgElement, this.speedModule(), this.speedVector, this.targetGameObject);
		
		if(newSpeedVector == false)
			if( targetFault( this ) )
			{
				this.frame();
				return;
			}
			else
			{
				this.removeElement();
				return;
			}

		this.speedVector = newSpeedVector;

		frameMovement(this);
		ownFrameAction.call(this);
	}
}