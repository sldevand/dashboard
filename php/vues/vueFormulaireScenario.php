<div class="col s12">
	<form id="formAjoutScenario" >

		<div class="col s12">
			<label for="nom">Nom</label>
			<input id="nom" type="text" name="nom" value="<?php if($id!=""){echo $scenario["nom"];}?>" required <?php if($id!=""){echo "disabled";}?>/>	
		
		</div>

		<div id="actionneur_wrap"  class="input-field col s12">
			<select id="actionneurid" name="actionneurid" required>
			  <option value="" disabled selected>Cliquez pour ajouter un actionneur</option>
			  
	<?php 
			
			foreach($actionneurs as $actionneur){ ?>
				<option value="<?php echo $actionneur["id"]?>" class="<?php echo $actionneur["categorie"]; ?>"><?php echo $actionneur["nom"] ;?></option>
			
		
	<?php		} ?>	
		</select>

			<label>Actionneur</label>
	  </div>

		<div id="etat-wrap" class="input-field col s12">
		  <label for="etat" >Etat</label>
		  <input name="etat" type="number" id="etat" min="0" max="1" required/>	  
		</div>			
	  	
	  	<button class="btn-flat waves-effect waves-light primaryTextLightColor right" type="submit" name="action">
	  		Valider
			<i class="material-icons right">check</i>
	  	</button>

	  	<button id="backFormAjout" class="btn-flat waves-effect waves-light secondaryTextColor right" type="button">
	  		Annuler
			<i class="material-icons right">arrow_back</i>
	  	</button>


		
	</form>

	
</div>