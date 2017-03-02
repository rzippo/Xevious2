<?php
	include DIR_DB_API . "storeApi.php";
	include DIR_CONST . "toolTips.php";

	//Inserisce all'interno della pagina il form per la selezione dell'equipaggiamento e l'avvio di una nuova partita
	//La pagina html che contiene questo form deve anche includere, come script, il file gameSetup.js 

	define ("NUM_WEAPONS", 3);
	define ("PLANES_START_INDEX", 3);
	define ("PLANES_END_INDEX", 6);

	$userStore = getUserStore($_SESSION["username"]);
	$keys = array_keys($userStore);
?>

<form id="gameSetup" name="gameSetup" onsubmit="createGameSession(event)">
	<input id="seed" name="seed" type="text" hidden>

	<p>Seleziona fino a 3 armi e l'aereo che vuoi utilizzare. Premi "GO!" quando sei pronto a giocare.<br>
		Se vuoi più informazioni su qualcosa, passa il mouse sopra l'icona per una descrizione dettagliata.<br>
		<br>Ricorda che puoi comprare nuovi armi e aerei dal negozio!
	</p>

	<div>
		<?php 
			for ($keyIndex=0; $keyIndex < NUM_WEAPONS; $keyIndex++) 
			{ 
				?>
					<div>
						<?php
							for ($weaponLevel=1; $weaponLevel <= 3; $weaponLevel++) 
							{ 
								$weaponName = $keys[$keyIndex].$weaponLevel;
								$isAvailable = ( $userStore[$keys[$keyIndex]] >= ($weaponLevel) ) ? true:false;
						?>
							<label>
								<input 	type="checkbox" 
										name="armi"
										onchange="checkCount(this)"
										value=<?= '"'.$keys[$keyIndex].'_'.$weaponLevel.'"'?> 
										<?= $isAvailable ? '':'disabled' ?> 
								>
								<img src="./../img/<?= $isAvailable ? '':'grayscale_' ?>icons/<?= $weaponName ?>.png" 
									alt="<?= $weaponName ?>"
									title="<?= $toolTips[$weaponName] ?>" >
							</label>	
							
						<?php
							}
						?>
					</div>
				<?php
			}
		?>
	</div>
	<div>
		<label>
			<input type="radio" name="aereo" value="standard" checked>
			<img src="./../img/planes/standard0.png" alt="standard" title="<?= $toolTips["standard0"] ?>" >
		</label>
		<?php
			for ($keyIndex=PLANES_START_INDEX; $keyIndex < PLANES_END_INDEX; $keyIndex++)
			{ 
				$isAvailable = ( $userStore[$keys[$keyIndex]] == 1 ) ? true:false;
				
				?>
					<label>
						<input 	type="radio" 
								name="aereo"
								value= <?= $keys[$keyIndex] ?>
								<?= ($isAvailable) ? '':"disabled" ?>
						>
						<img src="./../img/<?= $isAvailable ? '':'grayscale_' ?>icons/<?= $keys[$keyIndex] ?>1.png" 
							alt="<?= $keys[$keyIndex] ?>"
							title="<?= $toolTips[$keys[$keyIndex] . 1] ?>">
					</label>
				<?php
			}
		?>

	</div>
	<input type="submit" class="mediumButton red" value="GO!">	
</form>
