<div class="col s12">
	<form id="formEditionScenario">
		
		<div id="<?php echo $id; ?>" class="flow-text scenario"> <?php echo $scenario["nom"];?> </div>
		<a id= "<?php echo $id; ?>" class="waves-effect waves-light btn-flat btn-small primaryTextLightColor edition-name center">
			<i class="material-icons center">edit</i>
		</a>
		
		<table class="responsive-table">
			<thead>
				<tr>
					<th>actionneur</th>	
					<th>etat</th>
					<th>editer</th>
					<th>suppr.</th>
				</tr>
			</thead>

			<tbody>
		<?php if(!is_null($items)){ 
				
				 
						foreach($items as $key=>$actionneur){	?>


						<tr>
							
						 	<td id= "<?php echo $key; ?>" class="actionneur"> <?php echo $actionneur["nom"]; ?> </td>
						 	<td id= "<?php echo $key; ?>" class="etat"> <?php echo $actionneur["etat"]; ?> </td>			
						 	<td>
						 		<a id= "<?php echo $key; ?>" class="waves-effect waves-light btn-flat btn-small primaryTextLightColor edition-item center">
						 			<i class="material-icons center">edit</i>
						 		</a>
						 	</td>
						 	<td>
						 		<a id= "<?php echo $key; ?>" class="waves-effect waves-light btn-flat btn-small secondaryTextLightColor delete-item center">
						 			<i class="material-icons center">delete</i>
						 		</a>
						 	</td>
						</tr>

					<?php	}
					?>		
				
					
				
				</tr>

		<?php } ?>
			</tbody>
		
	</table>
</div>
<script src="js/utils/scenariosManage.js"></script>