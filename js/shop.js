var shopPrices;
var toolTips;
var userStore;

var userCoins;
var shopSection;
var messageNode;
var confirmButtons;
var itemRequest;

function load()
{
	var messageArea = document.getElementById("messageArea");
	messageNode = messageArea.firstChild;
	messageArea.parentNode.style.display = "none";

	userCoins = document.getElementById("userCoins");
	shopSection = document.getElementById("shopSection");
	confirmButtons = document.getElementById("confirmButtons");

	confirmButtons.style.display = "none";	

	getStoreData();
}

function getStoreData()
{
	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == "1")
		{
			messageNode.nodeValue = response["message"];
			messageArea.parentNode.style.display = "block";
			messageArea.style.color = "red";
		}
		else
		{
			var data = response["data"];
			shopPrices = data["shopPrices"];
			toolTips = data["toolTips"];
			userStore = data["userStore"];
			updateShop();
		}
	}

	ajaxRequest("./../php/ajax/shop/getStoreData.php", "GET", handler);
}

function updateShop()
{
	if(!shopSection.hasChildNodes())
		loadShop();

	var coins = parseInt(userCoins.firstChild.nodeValue);
	var buttonArray = document.getElementsByTagName("button");

	for(var i=0; i < buttonArray.length; i++ )
	{
		var button = buttonArray[i];
		if(!button.dataset.state)
			continue;
		
		var weaponString = button.id;
		
		var split = weaponString.split("_");

		var weaponType = split[0];
		var weaponLevel = (split[1]) ? split[1] : 1;

		var state;

		if(userStore[weaponType] >= weaponLevel)
			state = "purchased";
		else
		{
			if(weaponLevel == (parseInt(userStore[weaponType]) + 1) )
			{
				if(coins >= shopPrices[weaponString])
					state = "purchasable";
				else
					state = "more_coins";
			}
			else
				state = "previous_levels";
		}

		button.dataset.state = state;
		if(state == "previous_levels" && !button.firstChild.src.match("grayscale_icons"))
			button.firstChild.src = button.firstChild.src.replace("icons", "grayscale_icons");
	};		
}

function loadShop()
{
	var div;
	var objKeys = Object.keys(shopPrices);

	for (var i = 0; i < objKeys.length ; i++) 
	{
		if(i % 3 == 0)
		{
			div = document.createElement("div");
			shopSection.appendChild(div);
		}	

		var weaponString = objKeys[i];

		var buttonDiv = document.createElement("div");
		buttonDiv.classList.add("buttonDiv");

		var button = document.createElement("button");
		button.id = weaponString;
		button.type = "button";

		var buttonImage = document.createElement("img");

		var splitString = weaponString.split("_");
		
		buttonImage.src = "./../img/icons/" + splitString[0] + splitString[1] + ".png";
		buttonImage.alt = splitString[0] + splitString[1];	

		button.title = toolTips[splitString[0] + splitString[1]];

 		button.appendChild( buttonImage );
		button.dataset.state = "undefined";

		button.onclick = function(){
			request(this);
		}

		buttonDiv.appendChild(button);

		var priceDiv = document.createElement("div");
		priceDiv.classList.add("inlineDiv");
		
		var priceTag = document.createElement("p");
		priceTag.appendChild(document.createTextNode(shopPrices[weaponString]));

		var coinsImg = document.createElement("img");
		coinsImg.src = "./../img/icons/coins.png";
		coinsImg.alt = "monete";

		priceDiv.appendChild(priceTag);
		priceDiv.appendChild(coinsImg);

		buttonDiv.appendChild(priceDiv);

		div.appendChild(buttonDiv);
	};
}

	function request(button)
{
	switch(button.dataset.state)
	{
		case "purchasable":
			messageNode.nodeValue = "Vuoi acquistare l'oggetto per " + shopPrices[button.id] + " monete?";
			messageArea.parentNode.style.display = "block";
			confirmButtons.style.display = "block";
			itemRequest = button.id;
			break;

		case "purchased":
			messageNode.nodeValue = "Oggetto già acquistato";
			messageArea.parentNode.style.display = "block";
			confirmButtons.style.display = "none";
			break;

		case "more_coins":
			messageNode.nodeValue = "Monete insufficienti";
			messageArea.parentNode.style.display = "block";
			confirmButtons.style.display = "none";
			break;

		case "previous_levels":
			messageNode.nodeValue = "Devi possedere i livelli precedenti per acquistare questo";
			messageArea.parentNode.style.display = "block";
			confirmButtons.style.display = "none";
			break;
	}	
}

function confirm()
{
	var intervalKey;

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);
		clearInterval(intervalKey);

		messageNode.nodeValue = response["message"];
		userCoins.firstChild.nodeValue = response["data"];

		getStoreData();
	}

	var postString = "item=" + itemRequest;
	ajaxRequest("./../php/ajax/shop/buy.php", "POST", handler, postString);

	confirmButtons.style.display = "none";
	messageNode.nodeValue = "Acquisto in corso";
	intervalKey = setInterval(messageFrame(), 700);
}

function cancel()
{
	itemRequest = "";
	messageArea.parentNode.style.display = "none";
	confirmButtons.style.display = "none";
}

function messageFrame()
{
	if(messageNode.nodeValue.length < 21)
		messageNode.nodeValue += '.';
	else
		messageNode.nodeValue = "Acquisto in corso";
}