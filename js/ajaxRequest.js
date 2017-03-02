//Funzione che gestisce le interazioni col server tramite AJAX
//Le azioni da eseguire per gestire la risposta asincrona vanno incluse nella funzione handlerFun passata come argomento
function ajaxRequest(url, method, handlerFun, postString)
{
	var ajaxObject = new XMLHttpRequest();

	if(method != "POST")	//esclude una terza possibilita'
		method = "GET";

	ajaxObject.onreadystatechange = function()
	{
		if(ajaxObject.readyState == 4 && ajaxObject.status == 200)
	 	{
	 		handlerFun(ajaxObject.responseText);
	 	}	 
	};

	ajaxObject.open(method, url, true);

	if(method == "POST")
	{
		ajaxObject.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajaxObject.send(postString);
	}
	else
		ajaxObject.send();
}