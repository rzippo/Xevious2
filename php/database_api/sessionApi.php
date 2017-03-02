<?php
	require_once __DIR__ . "/../config.php";
	require_once DIR_DB_MANAGER . "XeviousDBManager.php";

	//Restituisce false se l'utente se non è stato effettuato il login
	function isLogged()
	{		
		if(isset($_SESSION['username']))
			return true;
		else
			return false;
	}

	//Effettua il login con gli argomenti passati. Restituisce true se il processo ha esito positivo
	function login($username, $password)
	{
		global $xeviousDB;
		
		$username = $xeviousDB->sqlInjectionFilter($username);
		$password = $xeviousDB->sqlInjectionFilter($password);

		$query = "select * from user where username='" .$username. "' and password='" .$password. "'";
		$result = $xeviousDB->performQuery($query);

		if($result->num_rows != 1)
			return false;
		else
		{
			$userRow = $result->fetch_array();
			$xeviousDB->closeConnection();
			
			setSession($userRow);
			return true;
		}
	};

	//Inizializza le variabili di sessione
	function setSession($userRow)
	{
		session_start();
		$_SESSION['username'] = $userRow["username"];
		$_SESSION['coins'] = $userRow["coins"];
		$_SESSION['onGame'] = false;
	}

	//Esegue il logout, eliminando le variabili di sessione
	function logout()
	{
		if(isLogged())
			return session_destroy();
		else
			return false;
	}

	//Esegue la registrazione di un nuovo utente nel database.
	//Prima della registrazione, gli argomenti sono validati perché aderiscano ai pattern richiesti dal servizio
	function signIn($username, $password, $email)
	{
		if(!validate($username, $password, $email))
			return false;

		global $xeviousDB;

		$username = $xeviousDB->sqlInjectionFilter($username);
		$password = $xeviousDB->sqlInjectionFilter($password);
		$email = $xeviousDB->sqlInjectionFilter($email);

		$query = "INSERT into user (username, password, email) values ('" .$username. "', '" .$password. "', '" .$email. "');
					INSERT into user_store (username) values ('" .$username. "');";
		
		$result = $xeviousDB->performMultiQuery($query);
		$xeviousDB->closeConnection();

		return $result;
	}

	//Effettua la validazione degli input tramite espressioni regolari
	function validate($username, $password, $email)
	{
		$usernamePattern = '/^[a-zA-Z0-9]{5,16}$/';
		$passwordPattern = '/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/';
		$emailPattern = '/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/';

		if( preg_match($usernamePattern, $username) && preg_match($passwordPattern, $password) && preg_match($emailPattern, $email))
			return true;
		else
			return false;
	}

	//Restituisce il numero di righe di 'user' che alla colonna indicata presentano il valore indicato
	//Questa funzione è utilizzata per verificare che l'username o l'email inseriti dall'utente non siano già presenti nel database,
	// prima di tentare la registrazione
	//Restituisce false in caso di errore, 1 in caso il valore sia già presente e 0 se non è già presente
	function checkUnique($column, $value)
	{
		if($column != "username" && $column != "email")
			return false;

		global $xeviousDB;

		$column = $xeviousDB->sqlInjectionFilter($column);
		$value = $xeviousDB->sqlInjectionFilter($value);

		$query = "SELECT COUNT(*) as count from user where " .$column. " = '" .$value. "';";
		$result = $xeviousDB->performQuery($query);

		$xeviousDB->closeConnection();

		if(!$result)
			return false;
		
		$count = $result->fetch_assoc();
		$count = $count["count"];

		return $count;
	}
?>