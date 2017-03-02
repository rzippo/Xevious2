<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "XeviousDBManager.php";
	require DIR_CONST . "shopPrices.php";

	//Restituisce un array associativo che rappresenta gli oggetti acquistabili posseduti dal giocatore
	function getUserStore($username)
	{
		global $xeviousDB;

		$username = $xeviousDB->sqlInjectionFilter($username);
		
		$query = "select missili,  
						 bomba,
						 scudo,
						 speeder, 
						 doubleshot, 
						 xevious
					from user_store US
					where US.username = '" .$username. "';";
		$result = $xeviousDB->performQuery($query);

		if(!$result || $result->num_rows != 1)
			return false;
		else
		{
			$storeApi = $result->fetch_assoc();
			$xeviousDB->closeConnection();
			
			return $storeApi;
		}
	}

	//Esegue l'acquisto di un oggetto definito da un itemType ed un itemLevel, per conto dell'utente username
	//Tale acquisto è preceduto dalla validazione: viene controllato che le monete possedute siano sufficienti
	//e che si posseggano i requisiti di livello per acquistare l'oggetto (bisogna possedere il livello precedente, tranne che per il livello 1)
	function buy($username, $itemType, $itemLevel)
	{
		global $xeviousDB;

		$username = $xeviousDB->sqlInjectionFilter($username);	
		$itemType = $xeviousDB->sqlInjectionFilter($itemType);
		$itemLevel = $xeviousDB->sqlInjectionFilter($itemLevel);

		global $shopPrices;
		$itemCost = $shopPrices[$itemType."_".$itemLevel];

		$response = array();
		$response["success"] = false;
		$response["coins"] = $_SESSION["coins"];

		$checkQuery = "SELECT u.coins as coins, us.".$itemType." as itemLevel
						FROM user u JOIN user_store us USING (username)
						WHERE u.username = '".$username."';";

		$result = $xeviousDB->performQuery($checkQuery);

		if(!$result || $result->num_rows != 1)
			return $response;

		$curState = $result->fetch_assoc();
		$xeviousDB->closeConnection();

		$aftCoins = $curState["coins"] - $itemCost;

		//Aggiornamento del valore corrente per evitare inconsistenze tra database, sessione e UI
		$response["coins"] = $curState["coins"];	//destinato al client (js)
		$_SESSION["coins"] = $curState["coins"];	//destinato al server (php)

		if($curState["coins"] < $itemCost || $curState["itemLevel"] + 1 != $itemLevel)
				return $response;

		$buyQuery = "	UPDATE user SET coins=".$aftCoins."
								WHERE username='".$username."';
						UPDATE user_store SET ".$itemType."=".$itemLevel."
								WHERE username='".$username."';";

		unset($result);
		$result = $xeviousDB->performMultiQuery($buyQuery);

		if($result)
		{
			$response["success"] = true;
			$response["coins"] = $aftCoins;		// nuovo valore, destinato al client (js)
			$_SESSION["coins"] = $aftCoins;		// nuovo valore, destinato al server (php)
		}

		$xeviousDB->closeConnection();
		return $response;
	}
?>