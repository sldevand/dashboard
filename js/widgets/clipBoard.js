function ClipBoard(id){
	
	m_id=id;

	
	var clipboard={

		"id":m_id,
		"name":"",
		"content":"",
		
		init : function(){
			this.changeText(this.content);
			
			
			
		},
				
		
		changeText : function(textToChange){				
			$('#'+this.id).val(textToChange);
			$('#'+this.id).trigger('autoresize');			
		}
		
	}
		
	
  return clipboard;

}
        