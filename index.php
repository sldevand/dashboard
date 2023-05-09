<!DOCTYPE html>
<?php
header("Access-Control-Allow-Origin: *");
session_start();
?>
<html>

<head>
	<title>ActivHome-Dashboard</title>
	<?php
	include("php/structurePages.php");
	include("php/objets.php");
	include("html/structureHead.html");
	?>
</head>

<body>
	<nav class="primaryColor noselect" id="navbar">
		<div class="nav-wrapper valign-wrapper">
			<div id="message"></div>
			<div id="titlebar" class="brand-logo center textOnPrimaryColor"><a href="index.php"></a></div>

		</div>
	</nav>
	<div id="maincontent" class="container-light row"></div>
	<div id="errors"></div>

	<script src="js/utils/node_modules/socket.io-client/dist/socket.io.js"></script>
	<script src="js/utils/animate.jquery.js"></script>
	<script src="js/config.js"></script>
	<script src="js/widgets/widget.js"></script>
	<script src="js/widgets/widgetAbstract.js"></script>
	<script src="js/widgets/interrupteur.js"></script>
	<script src="js/widgets/interrupteurManage.js"></script>
	<script src="js/widgets/thermometre.js"></script>
	<script src="js/widgets/thermomanage.js"></script>
	<script src="js/widgets/scenarioWidget.js"></script>
	<script src="js/widgets/scenarioWidgetManage.js"></script>
	<script src="js/animations.js"></script>
	<script src="js/viewPager.js"></script>
	<script src="js/utils/socketioManage.js"></script>
</body>
</html>