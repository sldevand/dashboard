<!DOCTYPE html>
<?php
	header("Access-Control-Allow-Origin: *");
	session_start();
?>
<html>
	<head>
		<title>ActivHome-Dashboard</title>
		<?php
			include("php/gpio.php");
			include("php/structurePages.php");
			include("php/objets.php");
			include("html/structureHead.html");

		?>
	</head>
	<body>

		<?php
			chargeStructureBody();
			include("html/footer.html");
			?>

			<div id="maincontent" class="container-light row"></div>
			<div id="errors"></div>

			<script src="js/utils/node_modules/socket.io-client/dist/socket.io.js"></script>
			<script src="js/utils/animate.jquery.js"></script>
			<script src="js/utils/forms.js"></script>
			<script src="js/utils/dateManage.js"></script>
			<script src="js/config.js"></script>
			<script src="js/widgets/widget.js"></script>
			<script src="js/widgets/widgetAbstract.js"></script>
			<script src="js/widgets/interrupteur.js"></script>
			<script src="js/widgets/interrupteurManage.js"></script>
			<script src="js/widgets/thermometre.js"></script>
			<script src="js/widgets/thermomanage.js"></script>
			<script src="js/widgets/graphs.js"></script>
			<script src="js/widgets/graphsmanage.js"></script>
			<script src="js/widgets/canvas_clock.js"></script>
			<script src="js/widgets/canvas_clockmanage.js"></script>
			<script src="js/widgets/dimmer.js"></script>
			<script src="js/widgets/dimmerManage.js"></script>
			<script src="js/widgets/teleinfo.js"></script>
			<script src="js/widgets/teleinfoManage.js"></script>
			<script src="js/widgets/thermostat.js"></script>
			<script src="js/widgets/thermostatManage.js"></script>
			<script src="js/widgets/scenarioWidget.js"></script>
			<script src="js/widgets/scenarioWidgetManage.js"></script>
			<script src="js/animations.js"></script>

			<script src="js/widgets/widgetJsonFileManage.js"></script>
			<script src="js/viewPager.js"></script>
			<script src="js/widgets/weather.js"></script>
			<script src="js/utils/socketioManage.js"></script>

	</body>
</html>
