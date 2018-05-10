
<div class="row">
		<div id="backFormThermostatSettings" class="valign-wrapper col s12 thermostatSettingsTitle">
			<i class="material-icons primaryTextColor left">arrow_back</i><div class="flow-text">Planification</div>
		</div>
</div>

<div class="row">
	<div class="col s12">
		<form id="formThermostatSettings" >

			<div class="row valign-wrapper">
				<div id="planning_wrap"  class="input-field col s10">
					<select id="planning" name="planning" required>
						<option value="0">Aucun</option>
						<?php
						foreach($planifs as $planif){  ?>
							<option value=" <?php echo $planif["id"];?> "><?php echo $planif["nom"]; ?></option>
						<?php } ?>
					</select>
					<label>Planning</label>
				</div>
				<a href="/activapi.fr/thermostat-planif" class="col s2" ><i class="material-icons primaryTextColor">edit</i></a>

			</div>

			<div  class="row valign-wrapper">
				<div id="modes_wrap"  class="input-field col s8" >
					<select id="mode" name="mode"  >
						<option value="0" disabled>Modes disponibles</option>
						<?php
						foreach($modes as $mode){ ?>
							<option value="<?php echo $mode["id"];?>"><?php echo $mode["nom"]; ?></option>
						<?php } ?>
					</select>
					<label>Mode</label>
				</div>
				<a href="/activapi.fr/thermostat-modes" class="col s2" ><i class="material-icons primaryTextColor">edit</i></a>
				<a href="" id="refreshMode" class="col s2" ><i class="material-icons secondaryTextColor">autorenew</i></a>
			</div>

			<div class="col s12">
				<button class="btn-flat waves-effect waves-light primaryTextLightColor right" type="submit" name="action">
					Envoyer
					<i class="material-icons right">send</i>
				</button>
			</div>

		</form>
	</div>



	<div class="row" >
		<div class="col s12 thermostatSettingsTitle valign-wrapper">
					<i class="material-icons left primaryTextColor">access_time</i><div class="flow-text left">Horloge</div>
		</div>
	</div>

	<div class="row valign-wrapper">
		<div class="col s6 left">
			<div id="heureLue">XX:XX:XX</div>

		</div>

		<div class="col s6">
			<button id="synClockThermostatSettings" class="btn-flat waves-effect waves-light secondaryTextColor">
				Sync
				<i class="material-icons left">autorenew</i>
			</button>
		</div>
	</div>



</div>

<script>
	$('select').material_select();
</script>

<script src="js/utils/thermostatSettings.js"></script>
