var devices=[];
var markers = [];
var infowindow = [];

var map;

function myMap() {

  if(window.location.href=='http://localhost:4200/#/' ||window.location.href=='http://swajal.in/iiot/#/'||window.location.href=='https://swajal.in/iiot/#/' ){
    getLocation();

    var myCenter = new google.maps.LatLng(28.7041,77.1025);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {center: myCenter, zoom: 5,
      mapTypeControl: true,
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    
    setTimeout(()=>{
      var i=0
      var previousCluster='';
      var currentCluster;
      var temp=-1;
      var html='';
      for( var device of devices){
        if(JSON.parse(sessionStorage.user)[device.Cluster_Name]==1){
          var lat = lanAndlon(parseInt(device.Latitude));
          var lon = lanAndlon(parseInt(device.Longitude));
          var address = '\"'+device.Location+'\"';
          var id = '\"'+ device.DeviceID+'\"';
          var cluster = '\"'+ device.Cluster_Name+'\"';
          var deviceLoc = new google.maps.LatLng(lat,lon);
          currentCluster = device.Cluster_Name;
          if(currentCluster!=previousCluster){
            temp=temp+1;
            previousCluster=currentCluster;            
            html=html+'<li><button class="btn" onclick="opacity('+"\'"+ currentCluster+"\'"+','+temp+')"style="width:100%;background:white;padding:1px">'+currentCluster+'</button></li>';
          }
          markers.push(new google.maps.Marker({position:deviceLoc,id:i,cluster:device.Cluster_Name,icon:'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•|'+iconSrc[temp%10]}));
          markers[markers.length-1].setMap(map);
          infowindow.push(new google.maps.InfoWindow({
                content: "Decive Location: <b><span style = \"display: flex; justify-content: center; font-size:15px;\">"+device.Location+" ("+device.Cluster_Name+
                ")</span><br></b>DeviceID: <b><span style = \"display: flex; justify-content: center; font-size:15px; color:#999\">  "+device.DeviceID+
                "</span></b><br><span style = \"display: flex; justify-content: center; font-size:15px;\"><button type='button' onclick='redirect("+id+","+address+","+cluster+
                ")'>Analyse</button></span>"
          }));
          google.maps.event.addListener(markers[markers.length-1],'click',function() {
            for(var marker of markers){
              infowindow[marker.id].close(map,markers[marker.id]);
            }
            infowindow[this.id].open(map,markers[this.id]);
          });
          i=i+1;
        }
     
      }
  
  
      var centerControlDiv = document.createElement('div');
      var centerControl = new CenterControl(centerControlDiv, map,html);
      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
      searchBar();
  
    },2500)
  
  }
 
}

function redirect(id,address,cluster){
  document.cookie="location="+address+"; path=/";
  document.cookie="cluster="+cluster+"; path=/";
  document.cookie="id="+id+"; path=/"; 
  window.location.href= window.location.href + cluster+'/'+id+'/WaterDispenser'
}

function opacity(cluster,temp){
  for(var marker of markers){
    if(cluster!=marker.cluster){   
      marker.setMap(null);
    }
    else{
      marker.setMap(map);
    }
  }
}

function getLocation(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState==4 && this.status ==200){
        devices=JSON.parse(this.responseText);
      }	
    } 
    // xhttp.open("POST","http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php/machines.php",true);
    xhttp.open("POST","http://localhost:8000/assets/Php/machines.php",true);
    // xhttp.open("POST","/iiot/assets/Php/machines.php",true);  
    // xhttp.open("POST","https://swajal.in/iiot/assets/Php/machines.php",true);  

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


function searchBar(){
    var input = document.getElementById('searchInput');
    var searchBox = new google.maps.places.SearchBox(input);
    if(window.innerWidth<550){
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);
    }
    else{
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);          
    }
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers1 = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers1 = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          // Create a marker for each place.
          markers1.push(new google.maps.Marker({
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
      });
      map.fitBounds(bounds);
    });
}


function CenterControl(controlDiv, map,html) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.style.marginTop = '8px';
  controlUI.style.marginRight = '16px';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  // controlText.style.paddingLeft = '5px';
  controlText.innerHTML = '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown" style="background:none;border:none">Filter by Cluster<span class="caret"></span></button><ul class="dropdown-menu">'+html+'</ul></div>';
  controlUI.appendChild(controlText);
  $('.dropdown-menu show').css({"display":"contents"})
}


var iconSrc=[
    "ff0000",
    "0033cc",
    "00cc00",
    "ffff33",
    "6600cc",
    "ff9900",
    "cc00cc",
    "663300",
    "00e6e6",
    "9999ff"
] // marker Colors


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
} // retrieving Cookie