<?php
	session_start();
	require_once __DIR__ . "./../AjaxResponse.php";
	include DIR_DB_API . "sessionApi.php";
	include DIR_DB_API . "storeApi.php";

	include DIR_CONST . "shopPrices.php";
	include DIR_CONST . "toolTips.php";

	$response = new AjaxResponse();

	if(!isLogged())
		$response->error("Richiesta rifiutata");

	$userStore = getUserStore($_SESSION["username"]);
	$code; $message;

	if($userStore != false && 
		isset($shopPrices) ) 
	{
		$response->sendBack(0,
							"Ok",
							[ "userStore" => $userStore, "shopPrices" => $shopPrices, "toolTips" => $toolTips]
							);
	}
	else
		$response->error("Riprova piu' tardi");
	
?>