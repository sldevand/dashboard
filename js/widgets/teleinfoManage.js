

	
	var tinfo = new Teleinfo('myTeleinfo1');
	
	function parseTeleinfoFromAPI(){		
		$.getJSON('/activapi.fr/api/mesures/get-sensor24tinfoid1',function(data){
			$.each(data,function(index,value){
				tinfo.m_radioid=value.radioid;
				tinfo.m_base=value.valeur1;
				tinfo.m_papp=value.valeur2;
						generateTeleinfoHtml();
			});
		});
		
	}
	
	
	function generateTeleinfoHtml(){			
		var prepHTML = '<div class="col s12">'+
										tinfo.draw();
		
									'</div>';
			
		$("#widget-teleinfo-content").html(prepHTML);	
		
	}
	
	function updateTeleinfo(tinfoTab){

		tinfo.m_base = tinfoTab.valeur1;
		tinfo.m_papp = tinfoTab.valeur2;
		
		generateTeleinfoHtml();
		
	}
