	<div class="row">

		<div class="col s12 m6 l6">
		<?php	cardPanelParam(switchButton("Planification","planif"));	?>
		</div>

		<div class="col s12 m6 l6">
		<?php cardPanelParam(switchButton("OpenVPN","openvpn")); ?>
		</div>


		<div class="col s12 m6 l6">
		<?php cardPanelParam(switchButton("Node.js","piassistnode")); ?>
		</div>





		<div class="col s12">
		<?php
			$text= '
				<div class="flow-text textOnBodyColor" id="titrenodelog">Node Log</div>
				<div id="nodelog" class="textOnBodyColor"></div>
			';
			cardPanelParam($text);
		?>
		</div>

	</div>

	<?php
	include("html/footer.html");
	function cardPanelParam($text){
		echo'

			<div class="card-panel parameters textOnPrimaryColor">
			  <span>
			  '.$text.'
			  </span>
			</div>


		';
	}

	function switchButton($title,$idTitre){

		return '<div class="switch">
				<span id="titre'.$idTitre.'" class="left textOnBodyColor">'.$title.'</span>
				<label class="right">

				Off
				<input  id='.$idTitre.' type="checkbox">
				<span class="lever"></span>
				On

				</label>
		</div>';



	}	?>
<script src="js/confjQuery.js"></script>






