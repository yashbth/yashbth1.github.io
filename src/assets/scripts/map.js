var devices=[];
var markers = [];
var infowindow = [];

function myMap() {

  getLocation();
  var myCenter = new google.maps.LatLng(28.7041,77.1025);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 5};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  setTimeout(()=>{
    var i=0
    for( var device of devices){
      var lat = lanAndlon(parseInt(device.Latitude));
      var lon = lanAndlon(parseInt(device.Longitude));
      var address = '\"'+device.Location+'\"';
      var id = '\"'+ device.DeviceID+'\"';
      var cluster = '\"'+ device.Cluster_Name+'\"';
      var deviceLoc = new google.maps.LatLng(lat,lon);
      markers.push(new google.maps.Marker({position:deviceLoc,id:i}));
      markers[markers.length-1].setMap(map);
      infowindow.push(new google.maps.InfoWindow({
            content: "<b>Device Located At <span><br>"+address+"</span></b><br><br /><span style='font-size:10px;color:#999'>Device Id : "+id+"</span><button type='button' onclick='redirect("+id+","+address+","+cluster+")'>Analyse</button>"
      }));
      google.maps.event.addListener(markers[markers.length-1],'click',function() {
        for(var marker of markers){
          infowindow[marker.id].close(map,markers[marker.id]);
        }
        infowindow[this.id].open(map,markers[this.id]);
      });

      i=i+1;
    }

  },2500)

}

function redirect(id,address,cluster){
    document.cookie="location="+address+"; path=/";
    document.cookie="cluster="+cluster+"; path=/";
    window.location.href = window.location.href + cluster+'/'+id+'/WaterDispenser';
}



function getLocation(){
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState==4 && this.status ==200){
      devices=JSON.parse(this.responseText);
		}	
  }
  
  xhttp.open("POST","http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php/machines.php",true);
  // xhttp.open("POST","http://localhost:8000/assets/Php/machines.php",true);
  // xhttp.open("POST","/iiot/assets/Php/machines.php",true);  
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
