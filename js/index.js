var messageNode;
var messageArea;

var messages = new Array();

messages["username"]="Da 5 a 16 caratteri alfanumerici";
messages["password"]="Da 8 a 20 caratteri alfanumerici, di cui almeno un numero, una lettera minuscola ed una maiuscola";
messages["password_rep"]="Le due password sono diverse!";
messages["email"]="utente@dominio.tld";

messages["unique-username"] = "L'username inserito non e' disponibile";
messages["unique-email"] = "L'email inserita non e' disponibile"; 

//Inizializza i campi delle form e i messaggi di errori correlati
function load()
{
	messageArea = document.getElementById("messageArea");
	
	messageNode = document.createTextNode("void");
	messageArea.appendChild(messageNode);
	
	var signInForm = document.getElementById("signInForm");
		
	for (var j = 0; j < signInForm.length; j++)
	{
		var signInElement = signInForm[j];

		if(signInElement.type == "submit")
			continue;

		signInElement.modified = false;

		var p = document.createElement("p");
		p.className = "patternAlert hidden";
		p.id = signInElement.form.name + "." + signInElement.name;
	
		p.appendChild( 
			document.createTextNode(
				messages[signInElement.name]
				) 
			);

		signInElement.parentNode.appendChild(p);

		signInElement.errorParagraph = p;					
	};

	validate_form("signInForm");
	validate_form("loginForm");
}

//Mostra il messaggio di errore di un determinato campo del form
function showErrorParagraph(element, unique)
{
	if(element.form.id == "loginForm")
		return;

	unique = (typeof unique == "undefined") ? false : unique;

	if(element.dataset.unique)
	{
		if(unique)
			element.errorParagraph.firstChild.nodeValue = messages["unique-" + element.name];
		else
			element.errorParagraph.firstChild.nodeValue = messages[element.name];
	}

	element.errorParagraph.classList.remove("hidden");
	element.className = "invalid";
}

//Nasconde il messaggio di errore di un determinato campo del form
function hideErrorParagraph(element)
{
	if(element.form.id == "loginForm")
		return;

	element.errorParagraph.classList.add("hidden");
}

//Controlla la validità del form, rendendo cliccabile il tasto di sottomissione della form
//solo se la verifica ha esito positivo
function validate_form(formName)
{
	var form = document.forms[formName];
	var form_validity = true;

	for (var i = 0; i < form.elements.length; i++) 
	{
		form_validity = validate(form.elements[i]) & form_validity;
	};

	var submitButton = document.getElementById(formName + ".submit");
	submitButton.disabled = !form_validity;

	return form_validity;
}

//Controlla la validità di un determinanto campo di una form, mostrando eventuali stati di errore 
function validate(element)
{
	if(element.type == "submit")
		return true;

	if(!(element.modified))
	{
		hideErrorParagraph(element);
		return false;
	}
	//Caso particolare: il secondo campo password e' valido solo se il primo e' valido (secondo il pattern) e i due hanno lo stesso valore
	if(element.id == "password_rep")
	{
		var password = document.getElementById("password");

		if(validate(password))
		{
			if(element.value != password.value)
			{
				showErrorParagraph(element);
				return false;
			}
			else
			{
				hideErrorParagraph(element);
				element.className = "valid";
				return true;
			}
		}
		else
		{
			return false;
		}
	}

	//Caso generale: si controlla il pattern
	var regExp = element.dataset.pattern;
	var str = element.value;

	//Controllo campo mancante: utilizzato per dare un diversa risposta all'utente 
	//rispetto al ad un campo presente ma non valido
	if(str == "")
	{
		element.className = "missing";
		return false;
	}

	//Se il campo e' presente se ne controlla la validita'
	if(!str.match(regExp))
	{
		showErrorParagraph(element);
		return false;
	}
	else if (element.dataset.unique) 
			{
				//Nel caso data-unique sia vero si usa Ajax per verificare che non esista gia' il valore inserito nel database
				validateUnique(element);
			};
	
	//In caso il campo sia valido, si rimuovono eventuali messaggi d'errore
	hideErrorParagraph(element);
	element.className = "valid";
	return true;
}

//Funzione per la validazione, tramite AJAX, di campi di form che non possono avere un duplicato già presente nel database
//Viene utilizzata per username e email, che non possono essere uguali per due utenti.
//Il campo si ritiene già validato secondo il corrispondente pattern
function validateUnique(element)
{
	if(!element.dataset.unique)
		return;

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		if(response["responseCode"] == 0)
		{
			if(response["data"] == 1)
			{
				element.modified = false;	//Finche' il campo non e' modificato verra' assunto come non valido
				showErrorParagraph(element, true);
			}
		}
		else
		{
			console.log(response["message"]);
		}
	}

	postString = "type=" + element.name + "&value=" + element.value;
	ajaxRequest("./php/ajax/session/checkUnique.php", "POST", handler, postString);
}

//Sottomette il form al server, tramite la corrispondente funzione AJAX
function submitFun(event, formName)
{
	event.preventDefault();

	if(formName == "signInForm")
		ajaxSignIn();
	else
		ajaxLogin();
}

//Gestisce l'azione di signIn tramite AJAX
function ajaxSignIn()
{
	if(!validate_form("signInForm"))
		return;

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		messageNode.nodeValue = response["message"];
		messageArea.style.color = (response["responseCode"] == 0) ? "green" : "red";
		messageArea.classList.remove("hidden");

		if(response["responseCode"] == 0)
		{
			switchToLogIn();
		}
	}

	var signInElements = document.getElementById("signInForm").elements;

	var postString = "username=" + signInElements["username"].value +
					"&password=" + signInElements["password"].value +
					"&email=" + signInElements["email"].value; 

	ajaxRequest("./php/ajax/session/signIn.php", "POST", handler, postString);
}

//Gestisce l'azione di login tramite AJAX
function ajaxLogin()
{
	if(!validate_form("loginForm"))
		return;

	var handler = function(responseText)
	{
		var response = JSON.parse(responseText);

		messageNode.nodeValue = response["message"];
		messageArea.style.color = (response["responseCode"] == 0) ? "green" : "red";
		messageArea.classList.remove("hidden");

		if(response["responseCode"] == 0)
			window.location.replace("./php/homepage.php");
	}

	var loginElements = document.getElementById("loginForm").elements;

	var postString = "username=" + loginElements["username"].value +
					"&password=" + loginElements["password"].value;

	ajaxRequest("./php/ajax/session/login.php", "POST", handler, postString);
}

//Seguono funzioni che modificano il form visibile all'utente

function switchToSignIn()
{
	document.getElementById("loginSwitch").disabled = false;
	document.getElementById("signInSwitch").disabled = true;
	
	document.forms["loginForm"].classList.add("hidden");
	document.forms["signInForm"].classList.remove("hidden");

	clearForm("loginForm");
}

function switchToLogIn()
{
	document.getElementById("loginSwitch").disabled = true;
	document.getElementById("signInSwitch").disabled = false;
	
	document.forms["loginForm"].classList.remove("hidden");
	document.forms["signInForm"].classList.add("hidden");

	clearForm("signInForm");
}

//Quando un form viene nascosto, ne vengono reinizializzati i campi
function clearForm(formName)
{
	var form = document.forms[formName];
	
	if(!form)
		return;
	else
	{
		for (var i = 0; i < form.length; i++) 
		{
			var element = form[i];

			if(element.type == "submit")
				continue;
			else
			{
				var onInputEvent = element.oninput;
				element.oninput = null;

				element.modified = false;
				element.value = "";

				element.oninput = onInputEvent;

				element.classList.remove("missing");
				element.classList.remove("invalid");
				element.classList.remove("valid");
			}
		};

		validate_form(formName);
	}
}