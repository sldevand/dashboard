<!DOCTYPE html>

<?php
	 if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 
?>

<html>
	<head>
	<title>Activ'Home Mode édition</title>
	<?php
			include("php/structurePages.php");						
			include("html/structureHead.html");
	?>		
	</head>
	
	<body>	
		<?php 
			if(!isset($_SESSION['name'])){		
				header('Location: admin.php');				
			}	
		
			navbarAdmin('Activ\'Home Mode édition');
		?>	
		<div id="errorContainer"></div>
		<div id="editContainer" class="noselect"></div>
		
		<script src="js/widgets/thermometre.js"></script>	
		<script src="js/widgets/interrupteur.js"></script>	
		<script src="js/widgets/widgetWindowSimple.js"></script>
		<script src="js/widgets/widgetJsonFileManage.js"></script>		
		<script src="js/widgets/widgetEdition.js"></script>	
		<script src="js/widgets/widgetFactory.js"></script>	
		<script src="js/utils/jscolor.min.js"></script>	
 	
	</body>
</html>
