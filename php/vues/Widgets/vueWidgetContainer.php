<?php foreach ($widgets as $id => $title) { ?>

<div id="<?php echo $id; ?>" class="col s12 m6">
			<div id="widget-<?php echo $id; ?>" class="card-panel center no-select row">		
			<div id="widget-<?php echo $id; ?>-title" class="flow-text center textOnPrimaryColor dashTitle primaryLightColor">
				<?php echo $title; ?>
			</div>
			<div id="widget-<?php echo $id; ?>-content" class="center dashContent">
				<div id="<?php echo $id; ?>-Spinner" class="preloader-wrapper big active center">
					<div class="spinner-layer spinner-pink-only">
						<div class="circle-clipper left">
							<div class="circle"></div>
						</div>
						<div class="gap-patch">
							  <div class="circle"></div>
						</div>
						<div class="circle-clipper right">
							 <div class="circle"></div>
						</div>
					</div>
				</div>
			</div>
	</div>
</div>

<?php } ?>