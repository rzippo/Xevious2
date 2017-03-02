<?php
	session_start();
	require_once __DIR__ . "/php/config.php";
    include DIR_DB_API . "sessionApi.php";

    if (isLogged())
    {
		    header('Location: ./php/homepage.php');
		    exit;
    }	
?>
<!doctype html>
<html lang="it">
	<head>
		<meta charset="utf-8">
		<title>Xevious II</title>
		<script type="text/javascript" src="./js/index.js"></script>
		<script type="text/javascript" src="./js/ajaxRequest.js"></script>

		<link rel="icon" type="image/png" href="./img/planes/xevious0.png">

		<link rel="stylesheet" type="text/css" href="./css/index.css">
		<link rel="stylesheet" type="text/css" href="./css/xevious.css">
	</head>
	<body onload="load()">
		<h1>Xevious II</h1>
		
		<div class="wrap">
			<p id="messageArea" class="hidden"></p>
			
			<div>
				<div>
				<p class="inlineP">Accedi</p>
				<button id="loginSwitch" class="simpleButton" onclick="switchToLogIn();" disabled>&#x25BC</button>
			
				<form id="loginForm" name="loginForm" onsubmit="submitFun(event, 'loginForm');" >
					<input type="text" name="username" placeholder="Username" autofocus data-pattern="^.*$" oninput="this.modified=true; validate_form('loginForm');">
					<input type="password" name="password" placeholder="Password" data-pattern="^.*$" oninput="this.modified=true; validate_form('loginForm');">
					<input id="loginForm.submit" type="submit" class="mediumButton" value="Accedi"></input>
				</form>
				</div>

				<p class="inlineP">Registrati</p>
				<button id="signInSwitch" class="simpleButton" onclick="switchToSignIn();">&#x25BC</button>

				<form id="signInForm" name="signInForm" class="hidden" onsubmit="submitFun(event, 'signInForm');">
					<div class="inputBox">
						<input type="text" name="username" placeholder="Username"  data-pattern='^[a-zA-Z0-9]{5,16}$' data-unique="true" oninput="this.modified=true; validate_form('signInForm');">
					</div>
					<div class="inputBox">
						<input id="password" type="password" name="password" placeholder="Scegli una password" data-pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}' oninput="this.modified=true; validate_form('signInForm');">
						<input id="password_rep" type="password" name="password_rep" placeholder="Scrivila di nuovo" oninput="this.modified=true; validate_form('signInForm')">
					</div>
					<div class="inputBox">
						<input type="text" name="email" placeholder="email" data-pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" data-unique="true" oninput="this.modified=true; validate_form('signInForm');">
					</div>
					<input id="signInForm.submit" type="submit" class="mediumButton" value="Registrati"></input>
				</form>
			</div>
		</div>

		<a id="info" class="bigButton red" href="./html/info.html">Cos'è Xevious II?</a>
	</body>
</html>