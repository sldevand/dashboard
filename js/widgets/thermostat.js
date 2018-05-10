//Thermostat
function Thermostat(id,widgetContentId){

	var thermostat = {

		m_id:id,
		m_widgetContentId:widgetContentId,
		apiData:[],
		internalTemp:17.0,
		externalTemp:18.0,
		internalMode:"1",
		modeName:"",
		actif:"1",
		menu:0,


		draw : function(){

			var prepHtml = '<div class="light-container">';

			prepHtml += '<div id='+this.m_id+' class="col s12 thermostat" >';

			if(this.actif=="1"){
				switch(this.menu){
					case 0:
						prepHtml+=this.drawMain();
						break;
					case 1:
						this.drawSettings();
						break;
				}

			}else{

				prepHtml+='<div id="ther_consigne'+this.m_id+'" class="col s6 offset-s3 grey waves-effect waves-light white-text flow-text rounded-corner">'+
								'<div class="center">INACTIF</div>'+
							'</div>';
			}

			prepHtml+='</div>';
			prepHtml+='</div>';

			return prepHtml;
		},

		drawMain : function(){


			var prepHtml=
				'<div class="row">';

			prepHtml+=
					'<div class="row">'+
						'<div id="ther_settings'+this.m_id+'" class="col s1 waves-effect waves-light settings">'+
								this.iconifyNoTitle("","settings")+
						'</div>'+
					'</div>'+
					'<div class="square col s4 offset-s2  l3 offset-l3 grey darken-3 white-text">';

			if(this.apiData.planning==0){
				prepHtml+=
					'<div id="ther_consigne_plus'+this.m_id+'" class="btnConsigne">'+
						'<i class="material-icons">keyboard_arrow_up</i>'+
					'</div>';
			}

				prepHtml+=
					'<div id="ther_consigne'+this.m_id+'" class="dispConsigne">'+
						this.round(this.apiData.consigne,1)+
					'</div>';


			if(this.apiData.planning==0){
				prepHtml+=
				'<div id="ther_consigne_moins'+this.m_id+'"  class="btnConsigne ">'+
									'<i class="material-icons">keyboard_arrow_down</i>'+
								'</div>';
				}

			prepHtml+=
			'</div>'+

			'<div class="square col s4 l3  white black-text">'+
				'<div id="ther_tempin'+this.m_id+'" class="dispConsigne">'+
					this.round(this.internalTemp,1)+
				'</div>'+
			'</div>'+

			'<div id="ther_tempext'+this.m_id+'" class="col s4 offset-s2 m5 offset-s1 dispIcon">'+
				this.iconifyNoTitle(this.externalTemp,"thermometer")+
			'</div>'+

			'<div id="ther_mode'+this.m_id+'" class="col s4 m5 dispIcon">'+
				this.iconifyMode(this.apiData.modeid)+
			'</div>'+

			'<div id="ther_etat'+this.m_id+'" class="col s4 offset-s2 m5 offset-s1 dispIcon">'+
				this.iconifyBoiler(this.apiData.etat,"power")+
			'</div>';

			if(this.apiData.planning>0){

				prepHtml+=
					'<div id="ther_planning'+this.m_id+'" class="col s4 m5 dispIcon">'+
						this.iconifyNoTitle(this.apiData.planningName.nom,"timetable")+
					'</div>';
			}

			return prepHtml;

		},
		drawSettings : function(){
			thermostat.removeListeners();

			$.get('php/controleurs/thermostatSettings.php',function(data){
				$("#"+thermostat.m_widgetContentId).fadeOut('fast',function(){
					$("#"+thermostat.m_widgetContentId).html(data);
					$("#"+thermostat.m_widgetContentId).fadeIn('fast',function(){
						thermostat.initListeners();
					});

				});
			});
		},

		initListeners : function(){
			this.onConsigneDispClick();
			this.onConsignePlusClick();
			this.onConsigneMoinsClick();
			this.onSettingsClick();
		},

		removeListeners : function(){
			$('#ther_consigne'+this.m_id).off('click');
			$('#ther_consigne_plus'+this.m_id).off('click');
			$('#ther_consigne_moins'+this.m_id).off('click');
			$('#ther_settings'+this.m_id).off('click');
		},

		onConsigneDispClick : function(){
			$('#ther_consigne'+this.m_id).off('click');
			$('#ther_consigne'+this.m_id).click(function(){
				$('#ther_consigne'+this.m_id).html("");
				thermostat.sendData("refreshTher");
			});
		},


		onConsignePlusClick : function(){
			$('#ther_consigne_plus'+this.m_id).off('click');
			$('#ther_consigne_plus'+this.m_id).click(function(){

				thermostat.apiData.consigne=parseFloat(thermostat.apiData.consigne)+0.5;
				thermostat.sendData("updateTherCons");

			});
		},

		onConsigneMoinsClick : function(){
			$('#ther_consigne_moins'+this.m_id).off('click');
			$('#ther_consigne_moins'+this.m_id).click(function(){

				thermostat.apiData.consigne=parseFloat(thermostat.apiData.consigne)-0.5;
				thermostat.sendData("updateTherCons");

			});
		},


		onSettingsClick : function(){
			$('#ther_settings'+this.m_id).off('click');
			$('#ther_settings'+this.m_id).click(function(){
				thermostat.menu=1;
				thermostat.draw();
			});
		},

		sendData : function(nodeName){

			socket.emit(nodeName,thermostat.apiData);

		},

		updateConsigneDisplay : function(){
			$('#ther_consigne'+thermostat.m_id).html(thermostat.apiData.consigne);
		},

		iconifyMode : function(modeid){

			var icon="";
			var mode = this.modeName;

			switch(mode){
			case "Confort":
				icon="brightness-5";
				break;
			case "Eco":
				icon="flower";
				break;
			case "Nuit":
				icon="brightness-2";
				break;
			case "Hors gel":
				icon="snowflake";
				break;
			}

			return this.iconifyNoTitle(mode,icon);


		},

		iconifyBoiler : function(state){

			var icon="power";

			if(typeof state == "string"){
				state=parseFloat(state);
			}


			switch(state){
			case 0:
				state="OFF";
				icon+=" red-text"
				break;
			case 1:
				state="ON";
				icon+=" teal-text";
				break;
			}

			return this.iconifyNoTitle(state,icon);

		},

		iconify : function(temp, title,icon){
			return  '<div class="flow-text">'+title+'</div>'+
					'<i class="mdi mdi-'+icon+'"></i>'+
					'<div class="flow-text">'+temp+'</div>';

		},

		iconifyNoTitle : function(value,icon){
			return  '<i class="mdi mdi-'+icon+'"></i>'+
					'<div class="flow-text">'+value+'</div>';
		},

		round : function(value, decimals) {
  			return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		},
		icon : function(icon){

			return '<i class="mdi mdi-'+icon+'"></i>';
		}





	};
	return thermostat;
}
