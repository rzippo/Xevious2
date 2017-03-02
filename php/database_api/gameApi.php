<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "XeviousDBManager.php";
	require_once DIR_DB_API . "sessionApi.php";

	//Verifica che l'equipaggiamento selezionato per la partita sia posseduto dal giocatore
	function validateGameEquipment( $armi, $aereo )
	{
		session_start();

		global $xeviousDB;

		$query = "SELECT * FROM user_store WHERE username='" .$_SESSION["username"]. "'";
		$result = $xeviousDB->performQuery($query);

		if(!$result)
			return false;

		$result = $result->fetch_assoc();

		$aereoOk = ( $aereo == "standard" || $result[$aereo] == 1) ? true:false;
		$armiOk = true;
		
		if($armi != null)
		{
			foreach ($armi as $value) 
			{
				$splitStr = explode('_', $value);

				$armiOk = $armiOk && ($result[$splitStr[0]] >= $splitStr[1]);		
			}
		}

		return $aereoOk && $armiOk;
	}

	//Imposta le variabili di sessione relative alla partita da giocare
	function createGameSession( $seed, $aereo, $armi )
	{
		if(!isLogged() || $_SESSION["onGame"] || !isset($seed,$aereo))
			return false;
	
		if(!is_array($armi))
			$armi = [];

		if(count($armi)>3)
			return false;

		$gameVars = array();
		$gameVars["seed"] = $seed;
		$gameVars["aereo"] = $aereo;
		$gameVars["armi"] = $armi;

		$_SESSION["gameVars"] = $gameVars;

		return true;
	}

	//Ottiene le variabili di sessione relative alla partita da giocare
	function getGameSession()
	{
		session_start();
		if(!isLogged() || $_SESSION["onGame"])
			return false;

		$_SESSION["onGame"] = true;
		return $_SESSION["gameVars"];
	}

	//Prepara una nuova sessione di gioco con le stesse impostazioni della partita precedente
	function restartGameSession()
	{
		session_start();
		if($_SESSION["onGame"])
		{
			$_SESSION["onGame"] = false;
			return true;
		}
		else
			return false;
	}

	//Registra il punteggio di una partita in classifica e ne restituisce l'id
	function submitGameScore($score, $seed)
	{
		session_start();
		if(!isLogged())
			return false;
		else
		{
			global $xeviousDB;

			$score = $xeviousDB->sqlInjectionFilter($score);
			$seed = $xeviousDB->sqlInjectionFilter($seed);

			$query = "INSERT INTO classifica ( username, score, seed, data )
									values( '" .$_SESSION["username"]. "' , '" .$score. "' , '" .$seed. "', CURRENT_DATE) ;" ;

			$result = $xeviousDB->performQuery($query);

			if($result)
				$result = $xeviousDB->getInsertId();

			$xeviousDB->closeConnection();
			return $result;
		}
	}

	//Incrementa di 1 il numero di monete possedute dal giocatore.
	function coinUp()
	{
		session_start();
		if(!isLogged() || !$_SESSION["onGame"])
			return false;

		global $xeviousDB;
		$query = "UPDATE user SET coins = coins+1 WHERE username = '" .$_SESSION["username"]. "' ;";

		$result = $xeviousDB->performQuery($query);
		$xeviousDB->closeConnection();

		if($result)
		{
			$_SESSION["coins"]++;
			return true;
		}
		else
			return false;
	}
?>