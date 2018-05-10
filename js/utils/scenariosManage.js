$(document).ready(function(){

	var APIAddress = "http://domusbox./activapi.fr/api/";
	//var APIAddress = "http://localhost/activapi.fr/";
	
	//SUPPRESSION
	$(".delete").click(function(){
		$("#modal1 .modal-content").html("Etes-vous sur de vouloir supprimer le scénario ?");
		$("#modal1").modal('open');

		var id=this.id;		
		$("#modalDeleteOK").click(function(){
			$.post(APIAddress+'scenarios/delete',{'id':id},function(data){
				$("#titlebar").html("DashBoard - Scenarios");
				$("#maincontent").load("php/controleurs/scenarios.php");	
					$("#modal1").modal('close');
			});	
		});
	});

	$(".delete-item").click(function(){
		$("#modal1 .modal-content").html("Etes-vous sur de vouloir supprimer l'actionneur ?");
		$("#modal1").modal('open');

		var id=this.id;		
		var scenarioid = $(".scenario")[0].id;

		console.log(scenarioid);
		$("#modalDeleteOK").click(function(){
			$.post(APIAddress+'scenarios/delete-item',{'id':id},function(data){
				$("#titlebar").html("DashBoard - Scenarios");
				$("#dashscenariocontent").load("php/controleurs/formulaireEditionScenario.php?id="+scenarioid);	
					$("#modal1").modal('close');
			});	
		});
	});


	//EDITION
	$(".edition").click(function(){		
	
		var clickedId=this.id;
		$.get("php/controleurs/formulaireEditionScenario.php",{'id':clickedId},function(data){			
			$("#maincontent").css("display","block");			
			$("#dashscenariotitle").html("Scénarios-Edition");
			$("#dashscenariocontent").html(data);				
			$("#etat-wrap").hide();
			$('select').material_select();			
		});
	});

	$(".edition-item").click(function(){		
		
		var clickedId=this.id;	
		var scenarioid = $(".scenario")[0].id;
		displayFormulaireEditionItem(clickedId,scenarioid);
	});

	$(".edition-name").click(function(){	
	
		var nomScenario = $(".scenario")[0].innerText;	

		displayFormulaireEditionNom(this.id,nomScenario);
	});

	//AJOUT
	$("#ajoutScenario").click(function(){

		displayFormulaireAjoutScenario();
		
	});

	$(".add").click(function(){


		displayFormulaireAjoutScenario(this.id);
		
	});

     // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    function displayScenarios(){						
				
			$("#titlebar").html("DashBoard - Scenarios");		
			$.get("php/controleurs/scenarios.php",function(data){

				$("#maincontent").html(data).fadeIn();
			});
    }

    function displayFormulaireAjoutScenario(id){
    	var params={};
    	if(id!==null){
			 params={'id':id};
    	}

		$.get("php/controleurs/formulaireScenario.php",params,function(data){

			$("#maincontent").fadeOut(function(){	

				$("#scenariowidget").removeClass("s12");			
				$("#scenariowidget").addClass("s12 m8 offset-m2 l6 offset-l3");
				$("#dashscenariotitle").html("Scénarios-Ajout");	
				$("#dashscenariocontent").html(data);				
				$("#etat-wrap").hide();
				$('select').material_select();				

				$("#maincontent").fadeIn(function(){	
		
					$("#maincontent").css("display","block");
					 eventsFormulaireAjoutScenario();
					
				});
			});
		});

    }


    function eventsFormulaireAjoutScenario(){
    	

		$("select").change(function(event){
					
			onActionneursSelected(this);			

		});
				
		$('#formAjoutScenario').on('submit',function(event){

			event.preventDefault();

			$('#formAjoutScenario #nom').attr("disabled",false);

			var data = $('#formAjoutScenario').serialize();				
			$.post(APIAddress+'scenarios/add',data,function(data){
				$("#maincontent").fadeOut(function(){		
					displayScenarios();	
				});
			});
		});

		$('#backFormAjout').click(function(){			

			$("#maincontent").fadeOut(function(){		
				displayScenarios();	
			});

		});
    }


    function displayFormulaireEditionItem(itemid,scenarioid){

		$.get("php/controleurs/formulaireEditionScenario.php",{'id':scenarioid,'itemid':itemid},function(data){

			$("#maincontent").fadeOut(function(){	

				$("#scenariowidget").removeClass("s12");			
				$("#scenariowidget").addClass("s12 m8 offset-m2 l6 offset-l3");
				$("#dashscenariotitle").html("Scénarios-Edition-Item");	
				$("#dashscenariocontent").html(data);
				$('select').material_select();	

				$("#maincontent").fadeIn(function(){	
		
					$("#maincontent").css("display","block");
					eventsFormulaireEditionItem();
				});
			});
		});

    }

    function eventsFormulaireEditionItem(){

		$("select").change(function(event){
	 		onActionneursSelected(this);
	 	});
				
		$('#formEditionScenarioItem').on('submit',function(event){

			event.preventDefault();		

			var data = $('#formEditionScenarioItem').serialize();	

			console.log(data);

			$.post(APIAddress+'scenarios/update-item',data,function(data){
				console.log(data);
				$("#maincontent").fadeOut(function(){		
					displayScenarios();	
				});
			});
		});

		$('#backFormEditItem').click(function(){
				
			$("#maincontent").fadeOut(function(){		
				displayScenarios();	
			});

		});
    }

    function displayFormulaireEditionNom(scenarioid,nomScenario){

		$.get("php/controleurs/formulaireEditionScenario.php",{'id':scenarioid,'nomScenario':nomScenario},function(data){

			$("#maincontent").fadeOut(function(){	

				$("#scenariowidget").removeClass("s12");			
				$("#scenariowidget").addClass("s12 m8 offset-m2 l6 offset-l3");
				$("#dashscenariotitle").html("Scénarios-Edition-Item");	
				$("#dashscenariocontent").html(data);
				$('select').material_select();	

				$("#maincontent").fadeIn(function(){	
		
					$("#maincontent").css("display","block");
					eventsFormulaireEditionNom();
				});
			});
		});
	}

    function eventsFormulaireEditionNom(){		
				
		$('#formEditionScenarioNom').on('submit',function(event){

			event.preventDefault();		

			var data = $('#formEditionScenarioNom').serialize();	

			

			$.post(APIAddress+'scenarios/update',data,function(data){
				console.log(data);
				$("#maincontent").fadeOut(function(){		
					displayScenarios();	
				});
			});
			
		});

		$('#backFormEditNom').click(function(){			

			$("#maincontent").fadeOut(function(){		
				displayScenarios();	
			});

		});
    }

    function onActionneursSelected(selector){

    	var name = selector[parseInt(selector.value)].innerText;
		var id = selector.value;
		var categorie = selector[parseInt(id)].classList[0];	
		changeEtatAvecCategorie(categorie)		

    } 

    function changeEtatAvecCategorie(categorie){
		var min=0;
		var max=1;
		
		if(categorie==="dimmer"){max=255;}		
		if(categorie==="thermostat"){min=8; max=25;}					

		if(categorie!=="multiplug_group"){					
			
			$("#etat").attr("min",min);
			$("#etat").attr("max",max);	
			$("#etat").attr("value",0);	
			$("#etat-wrap").show();	
			
		}else{

			$("#etat-wrap").hide();	
		}	


    }


});
