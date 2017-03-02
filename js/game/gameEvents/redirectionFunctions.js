//Le funzioni seguenti sono utilizzate all'interno del metodo frame() del prototipo GameObject
//Pertanto hanno la stessa lista di argomenti nonostante non li utilizzino tutti.

//Le funzioni ritornano il vettore da utilizzare per il successivo spostamento dell'elemento,
//mentre restituiscono false se questo non è possibile (caso bersaglio mancante) o se l'elemento va cancellato

//Le coordinate dell'elemento non sono modificate


//Caratteristico dell'aereo del giocatore, determina il movimento in base all'input utente
function inputRedirection( imgElement, speedModule, speedVector, targetGameObject )
{
	var xInput;
	var yInput;

	if( inputLeft || inputRight )
	{
		if( inputRight && inputLeft )
			xInput = 0;
		else
		{
			if( inputLeft )
				xInput = -1;
			else
				xInput = 1;
		}
	}
	else
		xInput = 0;

	if( inputDown || inputUp )
	{
		if( inputUp && inputDown )
			yInput = 0;
		else
		{
			if( inputDown )
				yInput = -1;
			else
				yInput = 1;
		}
	}
	else
		yInput = 0;

	if(xInput == 0 && yInput == 0)
		return { x:0, y:0};
	else
	{
		var alpha = Math.atan2(yInput, xInput);

		return 	{
				x: speedModule * Math.cos(alpha),
				y: speedModule * Math.sin(alpha)
			};	
	}

}

//L'elemento prosegue secondo una retta a meno di collidere con un confine verticale, dove rimbalza con direzione orizzontale opposta.
//Se l'elemento collide con il confine inferiore, viene cancellato
function bouncingRedirection( imgElement, speedModule, speedVector, targetGameObject )
{
	var currentXCoordinate = parseInt(imgElement.style.left);
	var currentYCoordinate = parseInt(imgElement.style.bottom);

	var elementWidth = imgElement.getBoundingClientRect().width;
	var elementHeight = imgElement.getBoundingClientRect().height;

	var nextYCoordinate = currentYCoordinate + speedVector.y;

	if( nextYCoordinate < 0)
		return false;

	var nextXCoordinate = currentXCoordinate + speedVector.x;

	if( nextXCoordinate < 0 || nextXCoordinate + elementWidth >  GAME_WIDTH )
		speedVector.x = -speedVector.x;

	return speedVector;
}

//L'elemento si sposta esclusivamente lungo una retta
//Se collide con un confine dell'area di gioco, viene cancellato
function forwardRedirection( imgElement, speedModule, speedVector, targetGameObject )
{
	var currentXCoordinate = parseInt(imgElement.style.left);
	var currentYCoordinate = parseInt(imgElement.style.bottom);

	var elementWidth = imgElement.getBoundingClientRect().width;
	var elementHeight = imgElement.getBoundingClientRect().height;

	var nextYCoordinate = currentYCoordinate + speedVector.y;

	if( nextYCoordinate < 0 || nextYCoordinate + elementHeight >  GAME_HEIGHT )
		return false;

	var nextXCoordinate = currentXCoordinate + speedVector.x;

	if( nextXCoordinate < 0 || nextXCoordinate + elementWidth >  GAME_WIDTH )
		return false;

	return speedVector;
}


//L'elemento segue gli spostamenti di un elemento obbiettivo, ridirezionandosi ad ogni frame verso la posizione corrente dell'obiettivo
function seekingRedirection( imgElement, speedModule, speedVector, targetGameObject )
{
	var targetImgElement = targetGameObject.imgElement;

	if(targetImgElement == null || targetImgElement.parentNode != gameArea)
		return false;

	var xSeekerCenter = parseInt(imgElement.style.left) + ( imgElement.getBoundingClientRect().width / 2 );
	var ySeekerCenter = parseInt(imgElement.style.bottom) + ( imgElement.getBoundingClientRect().height / 2 );

	var xTargetCenter = parseInt(targetImgElement.style.left) + ( targetImgElement.getBoundingClientRect().width / 2 );
	var yTargetCenter = parseInt(targetImgElement.style.bottom) + ( targetImgElement.getBoundingClientRect().height / 2 );

	var xDelta = xTargetCenter - xSeekerCenter;
	var yDelta = yTargetCenter - ySeekerCenter;

	var alpha = Math.atan2( yDelta, xDelta);

	return 	{
			x: speedModule * Math.cos(alpha),
			y: speedModule * Math.sin(alpha)
		};
}
