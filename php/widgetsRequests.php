<?php
	 if(!isset($_SESSION)){ 
        session_start(); 
    } 
	include("gpio.php");
	error_reporting(E_ALL);
	
	
			if(	isset($_POST['action']) 
				&& isset($_POST['widget']) 
				&& isset($_POST['json'])
				&& isset($_POST['name'])){
				
				$itemPath="";
				$keyToChange="";
				$widget = htmlspecialchars($_POST['widget']);
				$action = htmlspecialchars($_POST['action']);
				$name = htmlspecialchars($_POST['name']);				
				
				$itemPath="../json/$widget.json";
				$keyToChange=$widget;
				
				$myJSON = json_decode($_POST['json'],true);						
				
				$table=retrieveJSON($itemPath,true);		
				
				switch ($action){	
				
					case "add":							
						array_push($table[$keyToChange],$myJSON);
						break;

					case "remove":					
						$iter=0;
						foreach($table[$keyToChange] as $elem){	
							if($elem["name"]==$name){								
								array_splice($table[$keyToChange],$iter,1);		
								echo $iter;
								break;
							}							
							$iter++;							
						}
						break;
						
					case "change":
						$exists=false;
						$same=false;
						
						if($name!=$myJSON["name"]){
							$exists = verifyExistingName($table[$keyToChange],$myJSON["name"]);
						}else $same=true;			


						
						if(!$exists){
								
							if(!$same) echo "namechange;".$myJSON["name"];
							
							$res=verifyPosition($table[$keyToChange],$name);
							
							$table[$keyToChange][$res]=$myJSON;
							echo "Changement effectué";
						}else{							
							echo " ".$myJSON["name"]." existe déjà!";						
						}
					
						break;
					default:						
						echo "Unavailable action";
						return;				
				
				}	
				
				//var_dump($table);
				//var_dump($table[$keyToChange]);
				changeJSON($itemPath,$table);
				
					
					
			}else if(isset($_POST['getTree'])){
				$dir=htmlspecialchars($_POST['getTree']);
				$array = scandir($dir);
				array_shift($array);
				array_shift($array);	
				echo json_encode($array);
			
			
			}	
				
			else{	echo "Error in parameters";}	

			function verifyPosition($elements,$locName){
				$isSingle=false;
				$iter=0;			
				foreach($elements as $elem){							
					
					if($elem["name"]==$locName){
					
						return $iter;
					}														
					$iter++;							
				}	
				return -1;
			
			}	
			
			function verifyExistingName($elements,$locName){
			
				
				foreach($elements as $elem){							
					
					if($elem["name"]==$locName){
						
						return true;
					}														
				}
				return false;
			}	
?>

