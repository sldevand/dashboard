
var defaults = {
	unit: 'c',
	image: true,
	city: false,
	country: true,
	highlow: true,
	wind: false,
	humidity: false,
	visibility: false,
	sunrise: false,
	sunset: false,
	forecast: false,
	link: false,
	showerror: true,
	linktarget: '_self',
	lang:"en",
	type: 1,
	clock:"no",
	update:0
};
var row = 'odd';
var translate = new Array();
var options="";
var locationid="";
var updateWeatherEvery = 0;
var days;
var months;
var refreshWeatherTimerNormal;
var forecast="";
var result; //Utilisé pour garder en mémoire le résultat

var weatherImagesPath="w5/images/icons/";

function init(location, option){
	options = $.extend(defaults, option);
	locationid=location;
	updateWeatherEvery = options.update*60*1000;
	switch (options.lang) {
	case "fr":
		days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
		months=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
		translate["high"]="Max";
		translate["low"]="Min";
		translate["wind"]="Vent";
		translate["humidity"]="Humidité";
		translate["visibility"]="Visibilité";
		translate["sunrise"]="Lever";
		translate["sunset"]="Coucher";
		break;
	default:
		days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		months=["January","February","March","April","May","June","July","August","September","October","November","December"];
		translate["high"]="High";
		translate["low"]="Low";
		translate["wind"]="Wind";
		translate["humidity"]="Humidity.";
		translate["visibility"]="Visibility";
		translate["sunrise"]="Sunrise";
		translate["sunset"]="Sunset";
		break;
	}
	if(options.clock!="no") {
		displayClock();
	}
	readfeed();
}

function readfeed() {
	// Cache results for an hour to prevent overuse
	now = new Date();
	// Create Yahoo Weather feed API address
	var query = "select * from weather.forecast where woeid='"+ locationid +"' and u='"+ options.unit +"'";
	var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';
//yql?q=select%20item%20from%20weather.forecast%20where%20woeid=%222295424%22&format=json&callback=c

	// Send request
	$.ajax({
		type: 'GET',
		url: api,
		dataType: 'json',
		success: function(data) {
			if (data.query) {
				//if (data.query.results.channel.length > 0 ) {
					// Multiple locations
					//var result = data.query.results.channel.length;
					//for (var i=0; i<result; i++) {
						// Create weather feed item
				//		_process2(data.query.results.channel[0]);
					//}
				//} else {
					// Single location only
					switch (options.type) {
					case 2:
						forecast=true;
						_process2(data.query.results.channel);
					break;
					case 3:
						_process3(data.query.results.channel);
					break;
					case 4:
						forecast=false;
						$('#forecast').css('display', 'none');
						result=data.query.results.channel
						_process2(result);
					break;					
					case 5:
						_process5(data.query.results.channel);
					break;
					default:
						_process(data.query.results.channel);
					break;
					}
				//}
				
				// Optional user callback function
				//if ($.isFunction(fn)) fn.call(this,$e);
				
			} else {
				if (options.showerror) $e.html('<p>Weather information unavailable</p>');
			}
		},
		error: function(data) {
			if (options.showerror) $e.html('<p>Weather request failed</p>');
		}
	});
	if(updateWeatherEvery>0) refreshWeatherTimerNormal = setTimeout('readfeed()', updateWeatherEvery);
}

//Digiclock HTC
function _process5(feed) {
	
	var curr_temp = '<p class="temp">' + feed.item.condition.temp + '&deg;<span class="metric">' + options.unit.toUpperCase() + '</span></p>';
	
	// Determine day or night image
	var daynight=_daynight(feed.item.pubDate, feed.astronomy.sunset, feed.astronomy.sunrise);
	
	$('#weather').css('background','url(' + weatherImagesPath + feed.item.condition.code + daynight.substring(0,1) + '.png) 50% 100% no-repeat');
	var weather = '<div id="local"><p class="city">' + feed.location.city + '</p><p>' + _tr_condition(feed.item.condition.text) + '</p></div>';
	weather += '<div id="temp">' + curr_temp + '</div>';
	$('#weather').html(weather);
}

//climacons iwidget mini
function _process3(feed) {
	// Determine day or night
	var daynight=_daynight(feed.item.pubDate, feed.astronomy.sunset, feed.astronomy.sunrise);
	/*if(daynight=='night') {
		$('body').css('color', 'white');
		var IconSet="Images/whitesmall/";
	} else {
		$('body').css('color', 'black');
		var IconSet="Images/blacksmall/";
	}*/
	
	var imgsrc = '<img id="theImg" src="'+IconSet+ feed.item.condition.code + '.png" width="115" height="115"/>';
	$('#weathericon').html(imgsrc);
	if (options.unit == 'c'){
		$("#temp").text(feed.item.condition.temp + "\u00B0C");
	} else {
		$("#temp").text(feed.item.condition.temp + "\u00B0F");
	}

}

//climacons iwidget (type 2 et 4)
function _process2(feed, forecast) {
	// Check for invalid location
	if (feed.description != 'Yahoo! Weather Error') {
		
		// Determine day or night
		var daynight=_daynight(feed.item.pubDate, feed.astronomy.sunset, feed.astronomy.sunrise);
		var IconSet="black";
		/*if(daynight=='night') {
			$('body').css('color', 'white');
			$('body').css('text-shadow', '0px 1px 1px black');
			var IconSet="white";
		} else {
			$('body').css('color', 'black');
			$('body').css('text-shadow', '0px 1px 1px white');
			var IconSet="black";
		}*/
		
		var wf = feed.item.forecast[0];
		
		document.getElementById("city").innerHTML = feed.location.city;
		document.getElementById("temp").innerHTML = feed.item.condition.temp + "&#176;";
		document.getElementById("hightemp").innerHTML = wf.high + "&#176;";
		document.getElementById("lowtemp").innerHTML = wf.low  + "&#176;";
		
		document.getElementById("desc").innerHTML=_tr_condition(feed.item.condition.text);
		
		document.getElementById("weathericon").src="Images/"+IconSet+"/"+feed.item.condition.code +".png";
		
		var wfi = feed.item.forecast;
		document.getElementById("Day1").innerHTML=_translate_day(wfi[1].day);
		document.getElementById("Day1Icon").src="Images/"+IconSet+"/"+wfi[1].code+".png";
		document.getElementById("Day1HiLo").innerHTML=wfi[1].low+ "&#176;/ "+wfi[1].high+ "&#176;";
		
		document.getElementById("Day2").innerHTML=_translate_day(wfi[2].day);
		document.getElementById("Day2Icon").src="Images/"+IconSet+"/"+wfi[2].code+".png";
		document.getElementById("Day2HiLo").innerHTML=wfi[2].low+ "&#176;/ "+wfi[2].high+ "&#176;";
		
		document.getElementById("Day3").innerHTML=_translate_day(wfi[3].day);
		document.getElementById("Day3Icon").src="Images/"+IconSet+"/"+wfi[3].code+".png";
		document.getElementById("Day3HiLo").innerHTML=wfi[3].low+ "&#176;/ "+wfi[3].high+ "&#176;";
		
		document.getElementById("Day4").innerHTML=_translate_day(wfi[4].day);
		document.getElementById("Day4Icon").src="Images/"+IconSet+"/"+wfi[4].code+".png";
		document.getElementById("Day4HiLo").innerHTML=wfi[4].low+ "&#176;/ "+wfi[4].high+ "&#176;";

	} else {
		document.getElementById("cityname").innerHTML = "City not found!";
	}
}
function showhideforecast() {
	if(forecast) {
		forecast=false;
		$('#forecast').css('display', 'none');
	} else {
		forecast=true;
		$('#forecast').css('display', 'block');
	}
}

// zWeatherFeed
function _process(feed) {
	// Check for invalid location
	if (feed.description != 'Yahoo! Weather Error') {
		// Format feed items
		var wd = feed.wind.direction;
		if (wd>=348.75&&wd<=360){wd="N"};if(wd>=0&&wd<11.25){wd="N"};if(wd>=11.25&&wd<33.75){wd="NNE"};if(wd>=33.75&&wd<56.25){wd="NE"};if(wd>=56.25&&wd<78.75){wd="ENE"};if(wd>=78.75&&wd<101.25){wd="E"};if(wd>=101.25&&wd<123.75){wd="ESE"};if(wd>=123.75&&wd<146.25){wd="SE"};if(wd>=146.25&&wd<168.75){wd="SSE"};if(wd>=168.75&&wd<191.25){wd="S"};if(wd>=191.25 && wd<213.75){wd="SSW"};if(wd>=213.75&&wd<236.25){wd="SW"};if(wd>=236.25&&wd<258.75){wd="WSW"};if(wd>=258.75 && wd<281.25){wd="W"};if(wd>=281.25&&wd<303.75){wd="WNW"};if(wd>=303.75&&wd<326.25){wd="NW"};if(wd>=326.25&&wd<348.75){wd="NNW"};
		var wf = feed.item.forecast[0];
		
		// Determine day or night
		var daynight=_daynight(feed.item.pubDate, feed.astronomy.sunset, feed.astronomy.sunrise);
		
	/*	if(daynight=='night') $('body').css('color', 'white');
		else $('body').css('color', 'black');*/
		
		// Add item container
		var html = '<div class="weatherItem '+ row +' '+ daynight +'"';
		if (options.image) html += ' style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ feed.item.condition.code + daynight.substring(0,1) +'.png); background-repeat: no-repeat;"';
		html += '>';
		
		// Add item data
		if (options.city) html += '<div class="weatherCity">'+ feed.location.city +'</div>';
		if (options.country) html += '<div class="weatherCountry">'+ feed.location.country +'</div>';
		html += '<div class="weatherTemp">'+ feed.item.condition.temp +'°'+options.unit.toUpperCase()+'</div>';
		
		// Add optional data
		if (options.highlow) html += '<div class="weatherRange">'+translate["high"]+': '+ wf.high +'&deg; '+translate["low"]+': '+ wf.low +'&deg;</div>';
		if (options.wind) html += '<div class="weatherWind">'+translate["wind"]+': '+ wd +' '+ feed.wind.speed + feed.units.speed +'</div>';
		if (options.humidity) html += '<div class="weatherHumidity">'+translate["humidity"]+': '+ feed.atmosphere.humidity +'</div>';
		if (options.visibility) html += '<div class="weatherVisibility">'+translate["visibility"]+': '+ feed.atmosphere.visibility +'</div>';
		if (options.sunrise) html += '<div class="weatherSunrise">'+translate["sunrise"]+': '+ feed.astronomy.sunrise +'</div>';
		if (options.sunset) html += '<div class="weatherSunset">'+translate["sunset"]+': '+ feed.astronomy.sunset +'</div>';
		
		html += '<div class="weatherDesc">'+ _tr_condition(feed.item.condition.text) +'</div>';
		//debug
		//html +='<div class="weatherRange">'+new Date()+'</div>';
		
		// Add item forecast data
		if (options.forecast) {
			
			html += '<div class="weatherForecast">';
			
			var wfi = feed.item.forecast;
			for (var i=0; i<wfi.length; i++) {
				html += '<div class="weatherForecastItem" style="background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/'+ wfi[i].code +'s.png); background-repeat: no-repeat;">';
				html += '<div class="weatherForecastDay">'+ _translate_day(wfi[i].day) +'</div>';
				//html += '<div class="weatherForecastDate">'+ wfi[i].date + '</div>';
				html += '<div class="weatherForecastText">'+ _tr_condition(wfi[i].text) +'</div>';
				html += '<div class="weatherForecastRange">'+translate["high"]+': '+ wfi[i].high +' '+translate["low"]+': '+ wfi[i].low +'</div>';
				html += '</div>'
			}
			
			html += '</div>'
		}
		
		if (options.link) html += '<div class="weatherLink"><a href="'+ feed.link +'" target="'+ options.linktarget +'" title="Read full forecast">Full forecast</a></div>';
		
	} else {
		var html = '<div class="weatherItem '+ row +'">';
		html += '<div class="weatherError">City not found</div>';
	}
	
	html += '</div>';
	
	// Alternate row classes
	//if (row == 'odd') { row = 'even'; } else { row = 'odd';	}
	
	//$e.append(html);
	$e.html(html);
}

// Get time string as date
function _getTimeAsDate(t) {
	
	d = new Date();
	r = new Date(d.toDateString() +' '+ t);
	
	return r;
}

function _daynight(now, sunset, sunrise) {
	// Determine day or night image
	var daynight;
	var n = now.indexOf(":");
	var tpb = _getTimeAsDate(now.substr(n-2,8));
	var tsr = _getTimeAsDate(sunrise);
	var tss = _getTimeAsDate(sunset);
	
	// Get night or day
	if (tpb>tsr && tpb<tss) { daynight = 'day'; } else { daynight = 'night'; }
	
	return daynight;
}
			
function _translate_day(day) {
	switch (day) {
	case "Sun": { return days[0]; }
	case "Mon": { return days[1]; }
	case "Tue": { return days[2]; }
	case "Wed": { return days[3]; }
	case "Thu": { return days[4]; }
	case "Fri": { return days[5]; }
	case "Sat": { return days[6]; }
	case "Today": { return "Today"; }
	case "Tonight": { return "Tonight"; }
	}
}

function _tr_condition(t) {
	var position=-1;
	var traduction="";
	var chaine="";
	var prefix="";
	position=t.indexOf("/");
	if(position>-1) {
		chaine=t.split("/");
		for(var i2 = 0; i2 < chaine.length; i2++) {
			prefix="";
			if(chaine[i2].indexOf("AM ")>-1) {
				prefix="AM ";
				chaine[i2]=chaine[i2].replace("AM ","");
			} else if(chaine[i2].indexOf("PM ")>-1) {
				prefix="PM ";
				chaine[i2]=chaine[i2].replace("PM ","");
			}
			if(i2==0) traduction=prefix+_translate_condition(chaine[i2]);
			else traduction=traduction+"/"+prefix+_translate_condition(chaine[i2]);
		}
	} else {
		traduction=_translate_condition(t);
	}
	return traduction;
}

function _translate_condition(t) {
	translatedesc=t.toLowerCase();
	var options = defaults;
	switch (options.lang) {
	case "fr":
			
			if (translatedesc=='tornado') { return 'Tornade'; }
			if (translatedesc=='tropical storm') { return 'Tempête tropicale'; }
			if (translatedesc=='hurricane') { return 'Ouragan'; }
			if (translatedesc=='severe thunderstorms') { return 'Orages violents'; }
			if (translatedesc=='thunderstorms') { return 'Orages'; }
			if (translatedesc=='mixed rain and snow') { return 'Pluie et neige'; }
			if (translatedesc=='mixed rain and sleet') { return 'Pluie et verglas'; }
			if (translatedesc=='mixed snow and sleet') { return 'Neige et verglas'; }
			if (translatedesc=='freezing drizzle') { return 'Brouillard givrant'; }
			if (translatedesc=='drizzle') { return 'Bruine'; }
			if (translatedesc=='freezing rain') { return 'Pluie verglaçante'; }
			if (translatedesc=='showers') { return 'Averses'; }
			
			if (translatedesc=='snow flurries') { return 'Rafales de neige'; }
			if (translatedesc=='light snow showers') { return 'Neige légère'; }
			if (translatedesc=='blowing snow') { return 'Blizzard'; }
			if (translatedesc=='snow') { return 'Neige'; }
			if (translatedesc=='hail') { return 'Grêle'; }
			if (translatedesc=='sleet') { return 'Verglas'; }
			if (translatedesc=='dust') { return 'Poussière'; }
			if (translatedesc=='foggy') { return 'Brouillard'; }
			if (translatedesc=='haze') { return 'Brume'; }
			if (translatedesc=='smoky') { return 'Brumeux'; }
			if (translatedesc=='blustery') { return 'Bourrasques'; }
			if (translatedesc=='windy') { return 'Venteux'; }
			if (translatedesc=='cold') { return 'Froid'; }
			if (translatedesc=='cloudy') { return 'Nuageux'; }
			if (translatedesc=='mostly cloudy') { return 'Très nuageux'; }
			
			if (translatedesc=='mostly cloudy (night)') { return 'Très nuageux'; }
			if (translatedesc=='mostly cloudy (day)') { return 'Très nuageux'; }
						
			if (translatedesc=='partly cloudy') { return 'Partiel. nuageux'; }
			if (translatedesc=='partly cloudy (night)') { return 'Partiel. nuageux'; }
			if (translatedesc=='partly cloudy (day)') { return 'Partiel. nuageux'; }
			
			if (translatedesc=='clear') { return 'Clair'; }
			if (translatedesc=='clear (night)') { return 'Clair'; }
			if (translatedesc=='sunny') { return 'Ensoleillé'; }
			
			if (translatedesc=='fair') { return 'Ciel dégagé'; }
			if (translatedesc=='fair (night)') { return 'Ciel dégagé'; }
			if (translatedesc=='fair (day)') { return 'Ciel dégagé'; }
			
			
			if (translatedesc=='mixed rain and hail') { return 'Pluie et grêle'; }
			if (translatedesc=='hot') { return 'Chaud'; }
			if (translatedesc=='isolated thunderstorms') { return 'Orages isolés'; }
			if (translatedesc=='scattered thunderstorms') { return 'Orages éparses'; }
			
			if (translatedesc=='scattered showers') { return 'Averses éparses'; }
			if (translatedesc=='heavy snow') { return 'Forte neige'; }
			if (translatedesc=='scattered snow showers') { return 'Neige éparse'; }
			if (translatedesc=='heavy snow') { return 'Fortes neiges'; }
			if (translatedesc=='thundershowers') { return 'Averses orageuses'; }
			if (translatedesc=='snow showers') { return 'Averses de neige'; }
			if (translatedesc=='isolated thundershowers') { return 'Averses isolées'; }
			
			if (translatedesc=='not available') { return 'non disponible';    }
		
			//Autre ??
			if (translatedesc=='wind') { return 'Vent'; }
			if (translatedesc=='heavy rain') { return 'Fortes averses'; }
			if (translatedesc=='rain and snow') { return 'Pluie et neige'; }
			if (translatedesc=='mostly sunny') { return 'Quelques nuages'; }
			if (translatedesc=='partly sunny') { return 'Partiel. nuageux'; }
			if (translatedesc=='intermittent clouds') { return 'Nuages éparses'; }
			if (translatedesc=='hazy sunshine') { return 'Légèrement voilé;'; }
			if (translatedesc=='fog') { return 'Brouillard'; }
			if (translatedesc=='partly sunny with showers') { return 'Soleil et averses'; }
			if (translatedesc=='thunderstorm') { return 'Orage'; }
			if (translatedesc=='mostly cloudy with thunder showers') { return 'Très nuageux, fortes averses'; }
			if (translatedesc=='partly sunny with thunder showers') { return 'Soleil, fortes averses'; }
			if (translatedesc=='light rain') { return 'Légère pluie'; }
			if (translatedesc=='rain') { return 'Pluie'; }
			if (translatedesc=='flurries') { return 'Averses de neige'; }
			if (translatedesc=='mostly cloudy with flurries') { return 'Très nuageux avec neige'; }
			if (translatedesc=='partly sunny with flurries') { return 'Soleil et neige'; }
			if (translatedesc=='mostly cloudy with snow') { return 'Très nuageux et neige'; }
			if (translatedesc=='ice') { return 'Glace'; }
			if (translatedesc=='rain and snow mixed') { return 'Pluie et neige'; }
			if (translatedesc=='mostly clear') { return 'Très clair'; }
			if (translatedesc=='hazy') { return 'Brume'; }
			if (translatedesc=='partly cloudy with showers') { return 'Partiel. nuageux et averses'; }
			if (translatedesc=='mostly cloudy with showers') { return 'Très nuageux et averses'; }
			if (translatedesc=='partly cloudy with thunder showers') { return 'Partiel. nuageux et fortes averses'; }
			if (translatedesc=='light snow') { return 'Flocons de neige'; }        
			if (translatedesc=='rain shower') { return 'Averses'; }
			if (translatedesc=='light drizzle') { return 'Légère bruine'; }
			if (translatedesc=='light rain with thunder') { return 'Pluie légère et éclairs'; }
			if (translatedesc=='drifting snow') { return 'Neige poudreuse'; }
			if (translatedesc=='light rain shower') { return 'Légère averse'; }
			if (translatedesc=='thunder') { return 'Tonnerre'; }
			if (translatedesc=='sand') { return 'Sable'; }
			if (translatedesc=='sandstorm') { return 'Tempête de sable'; }
			if (translatedesc=='squalls') { return 'Rafales'; }
			
			if (translatedesc=='drifting snow/windy') { return 'Neige poudreuse et vent'; }
			if (translatedesc=='mostly cloudy/windy') { return 'Très nuageux et vent'; }
			if (translatedesc=='squalls/windy') { return 'Rafales de vent'; }
			if (translatedesc=='sandstorm/windy') { return 'Tempête de sable et vent'; }
			if (translatedesc=='fair/windy') { return 'Ciel dégagé et vent'; }
			return t;
	break;
	default:
		return t;
		break;
	}
}
