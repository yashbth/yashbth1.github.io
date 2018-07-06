import { Component, OnInit,} from '@angular/core';
import {  Router,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {Cluster} from '../Clusters'
import { GlobalService } from '../global.service';
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var jquery:any; // Used to use jquery symbols
declare var $ :any; 

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css'],
})
export class WaterDispenseComponent implements OnInit{
  dataAvailable : boolean=false; // to check if data has arrived or it is null 
  property1:string; // properties of chart
  property2:string;
  properties=[];
  filename: string; //php filename
  table: string; // data table name
  cluster : string;
  panel:string;
  id=[];
  info =[]; // total data of that machine
  chartData =[];
  dataChange : boolean = true; // check if routhing has changed graphdata or not
  checkRouteChange=['waterPanel'] ; // contains only the current page
  data = []; // main data
  fromDate: any=new Date('2018-03-13'); // date range for making chart
  toDate : any =new Date('2018-03-13');
  location : string ; // location of machine
  location_info : any;
  jwtHelper = new JwtHelperService(); // service to decode jwt token
  token : string; // jwt token
  columnName:string; // column Name used to show or hide data for users
  machineNo : string;
  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService,private Cluster : Cluster){
    // Same as ngOnInit except the fact that it occurs when route changed 
    router.events.subscribe(()=>{
      
      if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
        this.service.getSessionVariables('session.php/?action=destroy').subscribe(data=>this.data=data,(err)=>console.log(err),()=>{
          window.location.href= 'https://swajal.in/iiot';
        }); 
      }
      this.dataAvailable=false;
      this.panel = this.route.snapshot.paramMap.get('panel');  
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.id[0] = this.route.snapshot.paramMap.get('id'); 

      this.cookieService.put('cluster',this.cluster);
      this.cookieService.put('id',this.id[0]);
      this.panelParameters(); 

      // Checking if route changed to avoid requesting too much request to database        
      if(this.checkRouteChange.indexOf(this.property1)<0){
        this.service.getLocation(this.id[0],this.cluster).subscribe(location=>this.location_info=location,(err)=>console.log(err),()=>{
          this.cookieService.put('location',this.location_info[0].Location);
          this.cookieService.put('machineNo',this.location_info[0].MachineNo);
          this.location = this.cookieService.get('location');
          this.machineNo = this.cookieService.get('machineNo');

        });
        this.getWaterinfo();
        this.cookieService.put('prevDiv',this.panel);                                                                       
        this.checkRouteChange.pop();
        this.checkRouteChange.push(this.property1);
        } 
    })
  }
  ngOnInit(){
    $('html').css({"height":"auto"}); 
    // Checking if jwt token is expired or not
    setTimeout(()=>{
      if(this.jwtHelper.isTokenExpired(this.globalservice.token)){      
        this.service.getSessionVariables('session.php/?action=destroy').subscribe(data=>this.data=data,(err)=>console.log(err),()=>{
          window.location.href= 'https://swajal.in/iiot';
        }); 
      }
      // Getting page info from URL
      this.panel = this.route.snapshot.paramMap.get('panel');  
      this.id[0] = this.route.snapshot.paramMap.get('id');  
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.cookieService.put('cluster',this.cluster);
      this.cookieService.put('id',this.id[0]);   
      //Getting info related to data using information from url  
      this.panelParameters();
      // Checking if route changed to avoid requesting too much request to database
      if(this.checkRouteChange.indexOf(this.property1)<0){   
          this.service.getLocation(this.id[0],this.cluster).subscribe(location=>this.location_info=location,(err)=>console.log(err),()=>{
          this.cookieService.put('location',this.location_info[0].Location);
          this.cookieService.put('machineNo',this.location_info[0].MachineNo);
          this.location = this.cookieService.get('location');
          this.machineNo = this.cookieService.get('machineNo');

        });
        this.getWaterinfo();
        this.cookieService.put('prevDiv',this.panel);                                                                       
        } 
    })

  }
 //generateGraph subscribe data from database using chart_date.php for given dates using service fetchwaterdispensedata
  generateGraph(){
    this.dataChange = true;
    this.chartData=[];
    this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData,(err)=>console.log(err),()=>{
      this.chartData=this.globalservice.dataRise(this.chartData,this.properties);
    });  //getChartData in fetchWaterDispenseService  
  }
  // getWaterinfo subscribe data from database
  getWaterinfo():void{
    this.info=[];
    this.chartData=[];
    this.service.getData(this.id,this.table,this.filename).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{   
      // After Data Shows Check if user has priveledge to that data and setting cookie access denied for it   
      if(this.globalservice.user["0"][this.columnName]=="0"){
        var time = new Date();
        time.setSeconds(time.getSeconds() + 5);
        let opts: CookieOptionsArgs = {
          expires: time
        };
        this.cookieService.put("access_denied","Access Denied!",opts);
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      // navigate to error page if data is not found

      if(!this.info || Object.keys(this.info).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      this.formatParamters();  // function to format data of Ro log Parameter    
      // Setting dates for chart  data
      this.fromDate = this.info[0].date;
      this.toDate = this.info[0].date;
      let date = new Date(this.fromDate);
      this.fromDate=date.setDate(date.getDate()-7);
      this.fromDate = new Date(this.fromDate).toISOString().slice(0,10);
      //subscribing last 7 days data from the last updated date (Chart data)
      this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData,(err)=>console.log(err),()=>{
        this.chartData=this.globalservice.dataRise(this.chartData,this.properties);
      }); 
    }); 
    // Loading of page before showing up data
    setTimeout(()=>{
      this.dataAvailable = true;                    
    },1000);

  }
  // panelParameteers function set certain properties or which table to select from  url information
  panelParameters(){
    this.properties=[]; 
    switch (this.panel){
      case 'WaterDispenser' : this.data= this.Cluster[this.cluster].WaterDispenseData; // Taking data from Cluster file (Clusters) using cluster and panel
                          this.filename = 'Water.php'; //php to call for taking information from assets ( called from fetchWaterDispenseDataService)
                          this.property1 = 'Total_Volume_Dispensed';// Chart y axis property
                          this.property2 = 'date'; // Chart x axis property
                          this.table =  this.Cluster[this.cluster].WaterDispenseData[3]; // name of table in cluster
                          this.columnName = 'Water_Dispensing_Panel' //used for hiding and showing based on user's priveledges
                          break;
      case 'Ro' :  this.data = this.Cluster[this.cluster].RoData;
                        this.filename = 'Ro.php';
                        this.property1 = 'Backwash_cycle_count';
                        this.property2 = 'date';
                        this.table =  this.Cluster[this.cluster].RoData[3];
                        this.columnName = 'RO_Parameters'
                        break;
      case 'CupDispenser' :  this.data = this.Cluster[this.cluster].CupDispenseData;
                        this.filename = 'Cup.php';
                        this.property1 = 'TotalCupsDispensed';
                        this.property2 = 'date'
                        this.table =  this.Cluster[this.cluster].CupDispenseData[3];
                        this.columnName = 'Cup_Dispensing_Panel'
                        break;
      default  :    break;
    }
    let i=0;
    for(let property of this.data[1]){// data[1] from delhi Cluster
      this.properties.push({name:this.data[0][i]});
      i=i+1;
    } // setting properties to show different color for different property
  }

  // formatParamters function formats the data of Ro Log Parameter into readable data  
  formatParamters(){
    if(this.info[0]["Operational_Minutes"]){
      this.info[0]["Operational_Minutes"]=Math.floor(this.info[0]["Operational_Minutes"]/60)+' hrs '+ this.info[0]["Operational_Minutes"]%60; // Converts mins into hrs:: min
      // Uv state value decoding
      if(this.info[0]["UV_State"]==0) {
         this.info[0]["UV_State"] = "Off";
      }
      else{
        this.info[0]["UV_State"] = "On";          
      }   
      // Trip State value decoding
      switch (parseInt(this.info[0]["Trip_state"])){
        case 0 : this.info[0]["Trip_state"]="RO ON";break;
        case 1 : this.info[0]["Trip_state"]="TW Tank Full";break;
        case 2 : this.info[0]["Trip_state"]="RW Tank Empty";this.blink("Trip_state");break;  // blink certain states
        case 3 : this.info[0]["Trip_state"]="High Pressure Trip";this.blink("Trip_state");break;
        case 5 : this.info[0]["Trip_state"]="RWP Dry Run";this.blink("Trip_state");break;
        case 6 : this.info[0]["Trip_state"]="RWP Overload";this.blink("Trip_state");break;
        case 7 : this.info[0]["Trip_state"]="HPP Dry Run";this.blink("Trip_state");break;
        case 8 : this.info[0]["Trip_state"]="HPP Overload";this.blink("Trip_state");break;
        case 9 : this.info[0]["Trip_state"]="LOW Pressure";this.blink("Trip_state");break;
        case 10 : 
        case 11 : 
        case 12 : 
        case 13 : this.info[0]["Trip_state"]="Backwash ON";this.blink("Trip_state");break;
        default : this.info[0]["Trip_state"]="Out of Range";this.blink("Trip_state");break;
      }
      // Tank level Decoding
      switch (parseInt(this.info[0]["Tank_Level"])){
        
        case 0 : this.info[0]["Tank_Level"]="100";break;
        case 1 : this.info[0]["Tank_Level"]="<100";break;
        case 2 : if(this.info[0]["Trip_state"]=="RW Tank Empty"){this.info[0]["Tank_Level"]="0"}
                else{this.info[0]["Tank_Level"]="<80"};
                this.blink("Tank_Level");break;
        default : this.info[0]["Tank_Level"]="Out of Range";this.blink("Tank_Level");break;
      }
    }
  }
//  Blink function blinks the information of given parameter with given id (mainly used for trip state and tank level)
  blink(id){
    setInterval(()=>{  // After every 1000ms it calls the inner methods
      $('#'+id).fadeToggle(1000);   //Time interval of blinking
      $('#'+id).css({"color":"red"})   // color of blinking
    },1000)
  }

}

