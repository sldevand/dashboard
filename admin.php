<!DOCTYPE html>

<?php
	 if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 
?>

<html>
	<head>
	<title>Activ'Home Admin</title>
	<?php
			include("php/structurePages.php");		          
			include("html/structureHead.html");
			
			include("php/userInfos.php");
			
			if($user_os=='Windows XP'){
				require_once('C:\wamp\scripts\passwordLib.php');
			}
		
	?>		
	</head>

	<body>	
	
		<?php navbarAdmin('Activ\'Home Admin'); 
		//$mdp = password_hash('password',PASSWORD_BCRYPT, array("cost" => 10));
		//echo $mdp;
		?>
		
		<div class="container">

		 <div class="row">
		 	
			<form id="formcon"  method="post" class="col s12 m8 offset-m2 l6 offset-l4" action="php/requetes.php" onsubmit="return verifFormCon(this)">

					<h5 class="input-field textOnBodyColor">
					Connexion
					</h5>		
			
					<div class="input-field">
						<input id="con_password" name="con_password" type="password" class="validate textOnBodyColor" onblur="verifPass(this)">
						<label for="con_password">Mot de Passe</label>
					</div>			
			
					<div class="input-field">
						<button id="submit" class="btn waves-effect waves-light primaryColor" >
						Se connecter <i class="material-icons right">send</i>
						</button>
					</div>
				
				<h6  id="resultCon" ></h6>
				<h6  id="error" ></h6>
			</form>
		</div>
		

	</div>
	<script src="js/utils/formulars.js"></script>
	<script src="js/utils/formsJquery.js"></script>
 	
	</body>
</html>
