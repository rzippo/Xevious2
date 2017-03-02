<?php
	require_once __DIR__ . "./../config.php";

	//Classe per la gestione di richieste AJAX
	//Tramite l'esecuzione di una delle sue funzioni membro viene inviata la risposta al client terminando l'esecuzione dello script
	class AjaxResponse
	{
		public $responseCode;	//0: Ok, 1: Errore
		public $message;
		public $data;
		
		function AjaxResponse($responseCode = 1,
								$message = "Errore! ",
								$data = null)
		{
			$this->responseCode = $responseCode;
			$this->message = $message;
			$this->data = null;
		}

		//Restituisce al client una risposta di errore, contenente la stringa passata come argomento
		//Se overwrite è false, la stringa passata come argomento è posposta a "Errore! "
		//Non vengono restituiti dati
		function error($string, $overwrite = false)
		{
			if($overwrite)
				$this->message = $string;
			else
				$this->message .= $string;
			
			echo json_encode($this);
			exit;
		}

		//Restituisce al client una risposta positiva, contenente la stringa passata come argomento
		//Non vengono restituiti dati
		function ok($string)
		{	
			$this->responseCode = 0;
			$this->message = $string;
			echo json_encode($this);
			exit;
		}

		//Restituisce al client una risposta definita dagli argomenti
		function sendBack( $responseCode, $message, $data)
		{
			$this->responseCode = $responseCode;
			$this->message = $message;
			$this->data = $data;

			echo json_encode($this);
			exit;
		}
	}

?>