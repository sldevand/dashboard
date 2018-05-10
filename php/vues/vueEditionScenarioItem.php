<div class="col s12">
	<form id="formEditionScenarioItem" >		
		<input name="id" type="text" id="id" value="<?php echo $itemid;?>" hidden/>	
		<input name="scenarioid" type="text" id="scenarioid" value="<?php echo $scenario['scenarioid'];?>" hidden/>	

		<div id="actionneur_wrap"  class="input-field">
			<select id="actionneurid" name="actionneurid" required>
			  <option value="" disabled>Cliquez pour éditer l'actionneur</option>
			  
	<?php 

			foreach($actionneurs as $key=>$actionneur){ 

				 ?>
				<option value="<?php echo $actionneur["id"];?>" class="<?php echo $actionneur["categorie"];?>" <?php if($actionneur["id"]==$item["id"]){echo "selected";}?>>
					<?php echo $actionneur["nom"] ;?>						
				</option>
			
		
	<?php		} ?>	
		</select>

			<label>Actionneur</label>
	  </div>

		<div id="etat-wrap" class="input-field col s12">
		  <label for="etat" >Etat</label>
		  <input name="etat" type="number" id="etat" value="<?php echo $item['etat'];?>" required focused/>	  
		</div>			
	  	
	  	<button class="btn-flat waves-effect waves-light primaryTextLightColor right" type="submit" name="action">
	  		Valider
			<i class="material-icons right">check</i>
	  	</button>

	  	<button id="backFormEditItem" class="btn-flat waves-effect waves-light secondaryTextColor right" type="button">
	  		Annuler
			<i class="material-icons right">arrow_back</i>
	  	</button>


		
	</form>

	
</div>
<script src="js/utils/scenariosManage.js"></script>