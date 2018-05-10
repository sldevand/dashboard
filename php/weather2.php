
<?php
	if(isset($_GET['city'])) $city=$_GET['city'];
	else $city="615702";

?>

<script type="text/javascript">
$(document).ready(function () {
	$e=$('#city');
	init('<?php echo $city;?>', {
		lang:'fr',
		unit: 'c',
		country: false,
		type: 2,
		update: 15
	});
});
</script>



<div class="row valign-wrapper center">
	
	<div class="col s6 valign center-block center">
		<img id="weathericon" class="col s12 responsive-img" src="Images/blank.png">
		<div id="temp" class="col s12"></div>
	</div>
	
	<div class="col s6 valign center">
	
			<div id="city" class="col s12 "></div>
			<div id="desc" class="col s12 "></div>
			<div id="HighLow" class="col s12 ">
				<a id="lowtemp"></a><a id="separator"> / </a><a id="hightemp"></a>
			</div>
		
	</div>
	
</div>

<div id="forecast" class="row center hide-on-small-only" >

<?php
	for($i=1;$i<5;$i++){
		echo'
		
			<div class="row center valign-wrapper">
				<div id="Day'.$i.'" class="col s4 valign"></div>	
				<div class="col s4 valign"><img id="Day'.$i.'Icon" src="Images/blank.png" align="middle"/></div>
				<div id="Day'.$i.'HiLo" class="col s4 valign"></div>
			</div>
		
		';
	}


?>

</div>
