<div class="col s12">
	<form id="formEditionScenarioNom" >		
		<input name="id" type="text" id="id" value="<?php echo $id;?>" hidden/>	

		<input name="nom" type="text" id="nom" value="<?php echo $nomScenario;?>"/>	
		<label for="nom" >Nom du scénario</label>
	

		<button class="btn-flat waves-effect waves-light primaryTextLightColor right" type="submit" name="action">
	  		Valider
			<i class="material-icons right">check</i>
	  	</button>

	  	<button id="backFormEditNom" class="btn-flat waves-effect waves-light secondaryTextColor right"  type="button">
	  		Annuler
			<i class="material-icons right">arrow_back</i>
	  	</button>


		
	</form>

	
</div>
<script src="js/utils/scenariosManage.js"></script>