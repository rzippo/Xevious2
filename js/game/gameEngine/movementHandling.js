//La seguente funzione sposta l'immagine collegata al gameObject dei pixel specificati in speedVector.
//Se il movimento porta l'oggetto oltre i confini del campo da gioco, questo viene ristretto a tali confini
function frameMovement( gameObject )
{
	var currentXCoordinate = parseInt( gameObject.imgElement.style.left );
	var currentYCoordinate = parseInt( gameObject.imgElement.style.bottom );
	var elementWidth =  gameObject.imgElement.getBoundingClientRect().width;
	var elementHeight = gameObject.imgElement.getBoundingClientRect().height;


	var nextXCoordinate = currentXCoordinate + gameObject.speedVector.x;
	var nextYCoordinate = currentYCoordinate + gameObject.speedVector.y;

	if( nextXCoordinate < 0 )
		nextXCoordinate = 0;

	if( nextXCoordinate + elementWidth >  GAME_WIDTH )
		nextXCoordinate = GAME_WIDTH - elementWidth;
	
	if( nextYCoordinate < 0 )
		nextYCoordinate = 0;

	if( nextYCoordinate + elementHeight >  GAME_HEIGHT )
		nextYCoordinate = GAME_HEIGHT - elementHeight;

	gameObject.imgElement.style.left = nextXCoordinate + "px";
	gameObject.imgElement.style.bottom = nextYCoordinate + "px";
}

//Controlla se il gameObject è in collisione con un'elemento di targetElementArray.
//Tale collisione è verificata per approssimazione; se più elementi collidono solo la prima trovata viene considerata.
//La funzione restituisce poi l'elemento in collisione con gameObject se presente, altrimenti false
function collision(gameObject, targetElementArray)
{
	var elementWidth = gameObject.imgElement.getBoundingClientRect().width;
	var elementHeight = gameObject.imgElement.getBoundingClientRect().height;

	var elementXCenter = parseInt(gameObject.imgElement.style.left) + elementWidth/2;
	var elementYCenter = parseInt(gameObject.imgElement.style.bottom) + elementHeight/2;

	var elementApproxRadius = ( elementHeight + elementWidth )/4;

	for (var i = targetElementArray.length - 1; i >= 0; i--) 
	{
		var currentElement = targetElementArray[i];

		var currentWidth = currentElement.imgElement.getBoundingClientRect().width;
		var currentHeight = currentElement.imgElement.getBoundingClientRect().height;

		var currentXCenter = parseInt(currentElement.imgElement.style.left) + currentWidth/2;
		var currentYCenter = parseInt(currentElement.imgElement.style.bottom) + currentHeight/2;

		var currentApproxRadius = ( currentHeight + currentWidth )/4;

		var deltaX = elementXCenter - currentXCenter;
		var deltaY = elementYCenter - currentYCenter;
		var collisionCenterDistance = elementApproxRadius + currentApproxRadius;

		if( deltaX*deltaX + deltaY*deltaY <= collisionCenterDistance*collisionCenterDistance)
			return currentElement;
	};

	//Se il flusso di esecuzione esce al di fuori del ciclo for, nessuna collisione è stata trovata
	return false;
}