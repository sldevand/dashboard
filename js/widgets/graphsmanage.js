	var graphs=[];			
	var graphsJSON =[];	

	var rafGraph;	
	var nbGraphs=1;
	var dateGraphs;
	var dateGraphsEnd;
	var dateGraphsScale;

	var startTime = -1;
	var animationGraphLength = 1000.0; // Animation length in milliseconds
	var currentGraphIndex=0;
		
	function initGraphVars(date,dateEnd=0,dateScale){
		dateGraphs=date;			
		dateGraphsEnd=dateEnd;
		dateGraphsScale=dateScale;
		if(dateGraphsEnd==0)dateGraphsEnd=date;
		graphs=[];			
		graphsJSON =[];			
		rafGraph=null;
		nbGraphs=1;
		curIndex=0;
		startTime=-1;
		
		animationGraphLength=1000.0;
	}
	
	function getGraphsFromJSON(){
			
		$.getJSON('json/graphs.json?time='+new Date().getTime(), function(data){		
			graphsJSON=data["graphs"];
			nbGraphs=graphsJSON.length;			

			for(var i=0;i<nbGraphs;i++){
				graphs.push(new Graph("myGraph"+i));		
			}
						
			graphsJSON.forEach(function(element) {				
				if(element.date!==dateGraphs){					
					element.date=dateGraphs;
					widgetJsonFileManage(element,"graphs","change",element.name);					
				}				
			});	
			
		
			getGraphFromAPI( graphUrlify(graphsJSON[0]),0);	
		});	
	}	
	
	function graphUrlify(graphPath){	

		var url='/activapi.fr/api/mesures/';
		var sensor=graphPath.type+graphPath.rf+graphPath.probe+graphPath.id;
		url += sensor+'-'+dateGraphs+'-'+dateGraphsEnd;
			
		return url;		
	}
	
	function getGraphFromAPI(url){

		$.getJSON(url, function(data) {			
			
			loadGraph(data,currentGraphIndex);
			
			currentGraphIndex++;
			if(currentGraphIndex<nbGraphs) getGraphFromAPI(graphUrlify(graphsJSON[currentGraphIndex]),currentGraphIndex);
			else{
				currentGraphIndex=0;
			}
			
		});		
	}	
	
	function loadGraph(loadedGraph,idx){		
	
			
				
		graphs[idx].graphData=loadedGraph.data;	
		
		graphs[idx].animtime=animationGraphLength;	
		graphs[idx].miniY=graphsJSON[idx].miniY;
		graphs[idx].maxiY=graphsJSON[idx].maxiY;
		graphs[idx].gradX=graphsJSON[idx].gradX;
		graphs[idx].gradY=graphsJSON[idx].gradY;
		graphs[idx].name=graphsJSON[idx].name;
		graphs[idx].date=dateGraphs;
		graphs[idx].dateEnd=dateGraphsEnd;
		graphs[idx].dateScale=dateGraphsScale;
		graphs[idx].unitname=graphsJSON[idx].unitname;
		graphs[idx].graphcolor=graphsJSON[idx].graphcolor;
		graphs[idx].init();		
				
	}
	
	function generateContainerGraphHtml(){
		
		return '<div id="graphcontainer" class="col s12"></div>';		
	}	
	

