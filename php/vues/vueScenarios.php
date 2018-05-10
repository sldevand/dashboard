<div id="scenariowidget" class="col s12">
	<div id="dashscenarios" class="card-panel no-select row">
		<div id="dashscenariotitle" class="flow-text center  textOnPrimaryColor dashTitle primaryLightColor">Scenarios</div>	
	<div id="dashscenariocontent" class="dashContent ">	
		<table class="responsive-table">
				<thead>
					<tr>
						<th>nom</th>		
						<th>actionneur</th>			
						<th>etat</th>
						<th>ajouter</th>
						<th>editer</th>	
						<th>suppr.</th>	
					</tr>

				</thead>
				<tbody>
					<?php
					if(!is_null($scenarios)){
						foreach($scenarios as $scenario){  ?>
							<tr>
							
								<td> <?php echo $scenario["nom"];	?> </td>	
								
								<td>
								<?php	foreach($scenario["data"] as $actionneur){ ?>
									 <?php echo $actionneur["nom"].'</br>'; 	?> 
								<?php } ?>
								</td>
								
								<td>
								<?php	foreach($scenario["data"] as $actionneur){ ?>
									 <?php echo $actionneur["etat"].'</br>'; 	?> 
								<?php } ?>
								</td>

								<td>
									<a id= "<?php echo $scenario['scenarioid']; ?>" class="waves-effect waves-light btn-flat btn-small primaryTextLightColor add center"><i class="material-icons center">add</i></a>
								</td>
								
								<td>
									<a id= "<?php echo $scenario['scenarioid']; ?>" class="waves-effect waves-light btn-flat btn-small primaryTextLightColor edition center"><i class="material-icons center">edit</i></a>
								</td>
								
								<td>
									<a id= "<?php echo $scenario['scenarioid']; ?>" class="waves-effect waves-light btn-flat btn-small secondaryTextLightColor delete center"><i class="material-icons center">delete</i></a>
								</td>							
								
							</tr>
					
							
				<?php	}
					} ?>
					
					
				</tbody>
			</table>
			
			<a id= "ajoutScenario" class="waves-effect waves-light btn-flat btn-small primaryTextLightColor edit center"><i class="material-icons left">add</i> Ajouter Scénario</a>
	
	</div>
	</div>
	
	
</div>

<script src="js/utils/scenariosManage.js"></script>