var devices=[];
var marker = [];
function initialize() {
    getLocation();
    setTimeout(()=>{
      
      var earth = new WE.map('earth_div',{sky:true});
      WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
      for(var device of devices ){
        var lat = lanAndlon(parseInt(device.Latitude));
        var lon = lanAndlon(parseInt(device.Longitude));
        var address = '\"'+device.Location+'\"';
        var id = '\"'+ device.DeviceID+'\"';
        var cluster = '\"'+ device.Cluster_Name+'\"';
        marker.push(WE.marker([lat, lon]).addTo(earth));  
        // displayLocation(lat,lon,device.DEVICEID) ; 
        document.cookie="test=call";
        marker[marker.length-1].bindPopup("<b>Device Located At <span><br>"+address+"</span></b><br><br /><span style='font-size:10px;color:#999'>Device Id : "+id+"</span><button type='button' onclick='redirect("+id+","+address+","+cluster+")'>Analyse</button>", {maxWidth: 150, closeButton: false});

      }
      
      // var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-black-100.png', 100, 24).addTo(earth);      
      earth.setView([28.61, 77.6], 6);
      
    },3000)

}

function redirect(id,address,cluster){
    document.cookie="location="+address;
    document.cookie="cluster="+cluster;
    window.location.href = window.location.href + cluster+'/'+id+'/WaterDispenser';
}



function getLocation(){
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState==4 && this.status ==200){
      devices=JSON.parse(this.responseText);
		}	
	}
  // xhttp.open("POST","http://localhost:8000/assets/Php/machines.php",true);
  xhttp.open("POST","/iiot/assets/Php/machines.php",true);  
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("table=Device_Data");
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
