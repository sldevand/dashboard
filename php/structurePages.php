<?php 

function navbar(){
	echo'
		<nav class="primaryColor noselect" id="navbar">
		
			<div class="nav-wrapper valign-wrapper">	
			
				<a id="menubutton" data-activates="slide-out" class="button-collapse show-on-large">
					<i class="material-icons">menu</i>
				</a>
				<div id="message"></div>
				
					<div id="titlebar" class="brand-logo center textOnPrimaryColor"><a href="index.php" ></a></div>
				
			</div>
	';
				addConnectionChip();			
		
			
			echo'
		</nav>
	';	
}
function navbarAdmin($title){
	echo'
		<nav class="primaryColor noselect" id="navbarAdmin">
			<div class="nav-wrapper valign-wrapper">
				<a href="index.php"><i class="material-icons">home</i></a>
					<a class="valign center-block">
						<div id="#titleAdmin" class="flow-text textOnPrimaryColor">'.
							$title.'
						</div>
					</a>';
			
			addConnectionChip();
		
	echo'	</div>
		</nav>';
}

function addConnectionChip(){
	
	if(isset($_SESSION['name'])){
			
		include("html/connectionChip.html");
	}	

}

function chargeStructureBody(){
	navbar();
	//SIDE NAV MENU
	sideNav();	
}

function sideNav(){	
	
	include("html/sideNav/sideNavMainPart.html");		
		
	if(!isset($_SESSION['name'])){
		include("html/sideNav/sideNavUserPart.html");
	
	}else{	
		include("html/sideNav/sideNavAdminPart.html");			
	}		
	echo'</ul>';

	echo'
	<script>	 
		$("#menubutton").sideNav({
			
			closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true, // Choose whether you can drag to open on touch screens
			menuWidth: 250
		});	 
	</script>';
}




?>

