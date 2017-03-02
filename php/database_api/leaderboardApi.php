<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "XeviousDBManager.php";

	//Aggiorna la classifica, ricalcolando la posizione di ciascun punteggio.
	//Scorre gli elementi della tabella classifica per calcolarne l'ordine per punteggio secondo
	//ranking standard (1224) e ranking ordinale (1234). Tali valori vengono poi salvati nel database come std_rank e ord_rank 
	function updateLeaderboard()
	{
		global $xeviousDB;

		$getScores = "SELECT id_partita as id,
									score
							FROM classifica
							ORDER BY score DESC, data ASC, id_partita DESC";

		$scores = $xeviousDB->performQuery($getScores);

		if($scores === false)
			return false;

		$ordRank = 0;
		$stdRank = 0;
		$prevScore = -1;	//il confronto eseguito nel loop restituira' sempre false alla prima iterazione, non essendo previsto un punteggio < 0

		foreach ($scores as $scoreRow)
		{
			$ordRank++;
			$stdRank = ($scoreRow["score"] == $prevScore) ? $stdRank : $ordRank;
			$prevScore = $scoreRow["score"];

			$rowUpdateQuery = "UPDATE classifica
								SET 	ord_rank=".$ordRank.",
										std_rank=".$stdRank."
								WHERE 	id_partita=".$scoreRow["id"].";";

			$success = $xeviousDB->performQuery($rowUpdateQuery);
			if(!$success)
				return false;
		}

		$xeviousDB->closeConnection();
		return true;
	}

	//Ottiene le righe richieste della classifica, ossia seleziona la classifica richiesta in base all'argomento mode
	//e ne restituisce la page-esima pagina da rowLimit righe
	function getLeaderboard($mode, $page, $rowLimit)
	{
		global $xeviousDB;
		$page = $xeviousDB->sqlInjectionFilter($page);

		$mode = explode("_", $mode);

		switch ($mode[0]) 
		{
			case 'global':
				$query = "SELECT *
							FROM classifica
							ORDER BY ord_rank ASC
							LIMIT " .($rowLimit*$page). ", " .$rowLimit. ";";

				$result = $xeviousDB->performQuery($query);
				$xeviousDB->closeConnection();

				return $result;
				break;
			
			case 'userWise':
				$username = ( isset($mode[1]) ) ? $mode[1] : $_SESSION['username'];

				$query = "SELECT *
							FROM classifica
							WHERE username='" .$username."'
							ORDER BY ord_rank ASC
							LIMIT " .($rowLimit*$page). ", " .$rowLimit. ";";

				$result = $xeviousDB->performQuery($query);
				$xeviousDB->closeConnection();

				return $result;
				break;
			
			case 'seedWise':
				$query = "SELECT *
							FROM classifica
							WHERE seed='" .$mode[1]."'
							ORDER BY ord_rank ASC
							LIMIT " .($rowLimit*$page). ", " .$rowLimit. ";";

				$result = $xeviousDB->performQuery($query);
				$xeviousDB->closeConnection();

				return $result;
				break;

			default:
				return false;
				break;
		}
	}

	//Definita la classifica richiesta tramite l'argomento mode, restituisce il numero di pagine, contenenti ciascuna al più
	//rowLimit righe, in cui può essere divisa tale classifica
	function getPageCount($mode, $rowLimit)
	{
		global $xeviousDB;
		
		$mode = explode("_", $mode);

		switch ($mode[0])
		{
			case 'global':
				$query = "SELECT COUNT(*) as count
							FROM classifica;";

				$result = $xeviousDB->performQuery($query);
				$xeviousDB->closeConnection();

				if(!$result)
					return false;

				$count = $result->fetch_array();
				$count = $count[0];
			
				$pageCount = intval($count/$rowLimit) + (($count%$rowLimit > 0) ? 1:0);

				return $pageCount;
				break;

			case 'userWise':
				$username = (isset($mode[1])) ? $mode[1] : $_SESSION['username'];

				$username = $xeviousDB->sqlInjectionFilter($username);
				
				$query = "SELECT COUNT(*) as count
							FROM classifica
							WHERE username='" .$username."';";

				$result = $xeviousDB->performQuery($query);
				$xeviousDB->closeConnection();

				if(!$result)
					return false;
				
				$count = $result->fetch_array();
				$count = $count[0];

				$pageCount = intval($count/$rowLimit) + (($count%$rowLimit > 0) ? 1:0);

				return $pageCount;
				break;

			case 'seedWise':
				$seed = $xeviousDB->sqlInjectionFilter($mode[1]);

				$query = "SELECT COUNT(*) as count
							FROM classifica
							WHERE seed='" .$seed. "' ;";

				$result = $xeviousDB->performQuery($query);
				$xeviousDB->closeConnection();

				if(!$result)
					return false;
				
				$count = $result->fetch_array();
				$count = $count[0];

				$pageCount = intval($count/$rowLimit) + (($count%$rowLimit > 0) ? 1:0);

				return $pageCount;
				break;			

			default:
				return false;
				break;
		}
	}

	//Dato l'id di una riga della classifica, ne restituisce la posizione secondo stardard ranking (1224)
	function getPosition($rowId)
	{
		global $xeviousDB;

		$rowId = $xeviousDB->sqlInjectionFilter($rowId);

		$query = "SELECT std_rank FROM classifica WHERE id_partita = '" .$rowId. "';";
		$result = $xeviousDB->performQuery($query);
		$xeviousDB->closeConnection();

		if(!$result || $result->num_rows != 1)
			return false;

		$result = $result->fetch_array();
		$result = $result[0];
		return $result;
	}
?>