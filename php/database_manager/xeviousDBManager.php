<?php  
	require_once __DIR__ . "/../config.php";
    require DIR_DB_MANAGER . "dbConfig.php";


    $xeviousDB = new XeviousDBManager();

    //Classe per la gestione del database mysql
	class XeviousDBManager 
	{
		private $mysqli_conn = null;
	
		function XeviousDBManager()
		{
			$this->openConnection();
		}
    
    	//Apre la connessione col database costruendo l'oggetto mysqli e selezionando il database
    	//Le informazioni utilizzate sono incluse dal file dbConfig.php
    	function openConnection()
    	{
    		if (!$this->isOpened())
    		{
    			global $dbHostname;
    			global $dbUsername;
    			global $dbPassword;
    			global $dbName;
    			
    			$this->mysqli_conn = new mysqli($dbHostname, $dbUsername, $dbPassword);
				if ($this->mysqli_conn->connect_error) 
					die('Connect Error (' . $this->mysqli_conn->connect_errno . ') ' . $this->mysqli_conn->connect_error);

				$this->mysqli_conn->select_db($dbName) or
					die ('Can\'t use pweb: ' . mysqli_error());
			}
    	}
    
    	//Controlla se la connessione con il database è attiva
    	function isOpened()
    	{
       		return ($this->mysqli_conn != null);
    	}

   		//Esegue una query da un singolo statement e ne restituisce il risultato
		function performQuery($queryText) 
		{
			if (!$this->isOpened())
				$this->openConnection();
			
			return $this->mysqli_conn->query($queryText);
		}

		//Esegue una query da multipli statement e ne restituisce i risultati
		function performMultiQuery($queryText)
		{
			if (!$this->isOpened())
			$this->openConnection();
			
			return $this->mysqli_conn->multi_query($queryText);
		}

		//Restituisce l'id dell'ultima riga inserita
		function getInsertId()
		{
			if(!$this->isOpened())
				return false;
			else
			{
				return $this->mysqli_conn->insert_id;
			} 
		}

		//Filtra il parametro per sicurezza contro sql-injection
		function sqlInjectionFilter($parameter)
		{
			if(!$this->isOpened())
				$this->openConnection();
				
			return $this->mysqli_conn->real_escape_string($parameter);
		}
		
		//Chiude la connessione col database
		function closeConnection()
		{
 	       	
 	       	if($this->mysqli_conn !== null)
				$this->mysqli_conn->close();
			
			$this->mysqli_conn = null;
		}
	}

?>