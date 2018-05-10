//Teleinfo
function Teleinfo(id){	
	
	var teleinfo = {
	
		m_id:id,
		m_radioid:'sensor',
		m_base:0,
		m_papp:0,
		
		draw : function(){
			
			return '<div id='+this.m_id+'>'+
			
							'<table class="bordered">'+
								'<tbody class="center ">'+
									'<tr><th>Consommation totale</th><th>Puissance</th><tr>'+
									'<tr class="flow-text"><td>'+this.m_base+' KWh</td>'+	
										'<td>'+this.m_papp+' VA</td></tr>'+	
								'</tbody>'+
							'</table>'+
						'</div>';			
		}
	};
	return teleinfo;
}

