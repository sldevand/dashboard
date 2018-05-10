<?php
function cardPanel2($color,$text,$textColor){
		echo'
		
			<div class="card-panel '.$color.'">
			  <div class="valign-wrapper dashContent">
			  <span style="color:'.$textColor.';">
			  '.$text.'
			  </span>
			</div>     
			</div>     
		';
}

function switchButton($title,$idTitre){
	$titre="titre";
	return '<div class="switch">
    		<label>
      		Off
      		<input  id='.$idTitre.' type="checkbox">
      		<span class="lever"></span>
      		On
      		<span id='.$titre.$idTitre.' class="right">'.$title.'</span>
    		</label>
  	</div>';



}






?>
