var devices=[];
var marker = [];
function initialize() {
    getLocation();
    setTimeout(()=>{
      
      var earth = new WE.map('earth_div',{sky:true});
      WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
      for(var device of devices ){
        var lat = lanAndlon(parseInt(device.Lattitude));
        var lon = lanAndlon(parseInt(device.Longitude));
        
        var id = '\"'+ device.DEVICEID+'\"';
        marker.push(WE.marker([lat, lon]).addTo(earth));  
        displayLocation(lat,lon,device.DEVICEID) ; 
        document.cookie="test=call";
        marker[marker.length-1].bindPopup("<b>Device Located At <span id='"+ device.DEVICEID +"'>"+getCookie('location')+"</span></b><br><br /><span style='font-size:10px;color:#999'>Device Id : "+id+"</span><button type='button' onclick='redirect("+id+")'>Analyse</button>", {maxWidth: 150, closeButton: false});

      }
      
      // var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-black-100.png', 100, 24).addTo(earth);      
      earth.setView([28.61, 77.6], 6);
      
    },500)

}

function redirect(id){
    window.location.href = window.location.href + '/device/'+id+'/WaterDispenser';
}

function displayLocation(latitude,longitude,id){
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, false);

    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        var location = address.formatted_address;
        var devId = String(id);
        document.getElementById(id).innerText= location;
        document.cookie = "location="+location;
      }
    };
    request.send();
  };


function getLocation(){
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState==4 && this.status ==200){
      devices=JSON.parse(this.responseText);
		}	
	}
  xhttp.open("POST","http://localhost/~yashbahetiiitk/yashbth.github.io/src/assets/Php/machines.php",true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("table=Water_Dispensing_Panel");
}

function lanAndlon(param){
  while(Math.abs(param)>100){
    if(param/100<1) {break};
    param = param/10;
  }
  return param;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
