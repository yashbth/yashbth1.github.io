
function initialize() {
    var earth = new WE.map('earth_div',{sky:true});
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
    var id = '\"VSDMDV11710AAG\"';
    var marker = WE.marker([28.4595, 77.0266]).addTo(earth);
    marker.bindPopup("<b>Device Located At <span id='loc'></span></b><br><br /><span style='font-size:10px;color:#999'>Device Id : VSDMDV11710AAG</span><button type='button' onclick='redirect("+ id +")'>Analyse</button>", {maxWidth: 150, closeButton: false});
   
    var marker2 = WE.marker([28.6139, 77.2090]).addTo(earth);
    marker2.bindPopup("<b>Device Located At New Delhi</b><br><span style='font-size:10px;color:#999'>Device Id : 1234567881</span>", {maxWidth: 120, closeButton: true});
    var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-black-100.png', 100, 24).addTo(earth);

    earth.setView([28.61, 77.6], 6);
}

function redirect(id){
    window.location.href = window.location.href + '/device/'+id+'/WaterDispenser';
}
function displayLocation(latitude,longitude,id){
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        document.getElementById(id).innerText= address.formatted_address;
      }
    };
    request.send();
  };
  $(document).ready(function(){
    displayLocation(28.4595, 77.0266,'loc') ;
      
  })