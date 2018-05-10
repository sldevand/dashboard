<?php
	 if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 
	include("userInfos.php");
	if($user_os=='Windows XP'){
		require_once('C:\wamp\scripts\passwordLib.php');
	}
			

		    if(isset($_POST['con_password'])){

				$mdp = htmlspecialchars($_POST['con_password']);				
			
                $status = checkForConnection($mdp);	
				if(!$status) {
					
					echo "Mauvais login/password";					
				}
				else {echo "Bonjour ".$_SESSION['name'];}
			
			}elseif(isset($_POST['disconnect'])){
				
				$name=$_SESSION['name'];
				session_destroy();	
				echo 'déconnexion...';
				$name=null;
			}
			
			function checkForConnection($pwd){	

			
					
				$credentials=getUserPassFromFile("../users/user1.txt");
				$login=$credentials[0];				
				$hash=$credentials[1];				
						
				
				if(password_verify($pwd, $hash)){
      				$_SESSION['name'] = htmlspecialchars($login);
					
					return true;
				}else{
					return false;
				}			
			}
			
			function getUserPassFromFile($filename){
				
				//Get user:pass from file
				
				 $file = fopen( $filename, "r" );

				 if( $file == false ) {
					//echo ( "Error in opening file" );
					exit();
				 }

				 $filesize = filesize( $filename );
				 $filetext = fread( $file, $filesize);
				 fclose( $file );
				 $array = explode(":", $filetext);				
				
				
				return $array;
			}
?>
