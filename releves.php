<!DOCTYPE html>
<?php
	session_start();
?>
<html>
	<head>
	<title>Releve de temperatures</title>
	<?php
			include("php/structurePages.php");
			include("php/gpio.php");           
			include("html/structureHead.html");
	?>	
	
	</head>

	<body>
	
		<script src="js/utils/animate.jquery.js"></script>		

		<?php 
			chargeStructureBody();	
			
		?>
		
 		<script src="js/animations.js"></script>		
		<script src="js/widgets/graphs.js"></script>
		<script src="js/widgets/graphsmanage.js"></script>
		<?php include("html/footer.html");?>
	</body>
</html>
