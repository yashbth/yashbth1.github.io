import { Component, Input, OnInit,OnChanges, AfterContentChecked,DoCheck, AfterContentInit, Inject} from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {waterDispenserParam} from './waterDispenserparam'
import {Cluster} from '../delhiCluster'
import { GlobalService } from '../global.service';
import { CookieService } from 'angular2-cookie/core';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var jquery:any;
declare var $ :any; 
declare var displayLocation : any;

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css'],
})
export class WaterDispenseComponent implements OnInit{
  dataAvailable : boolean=false;
  property1:string;
  property2:string;
  filename: string; 
  table: string;
  cluster : string;
  panel:string;
  id=[];
  info =[];
  chartData =[];
  dataChange : boolean = true;
  checkRouteChange=['waterPanel'] ;
  data = [];
  fromDate: any=new Date('2018-03-13');
  toDate : any =new Date('2018-03-13');
  location : string ;
  location_info : any;
  jwtHelper = new JwtHelperService();
  token : string;
  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService,private Cluster : Cluster){
    router.events.subscribe(()=>{
      if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
        this.service.getSessionVariables('session.php/?action=destroy').subscribe(data=>this.data=data,(err)=>console.log(err),()=>{
          window.location.href= '/';
        }); 
      }
      this.dataAvailable=false;
      this.panel = this.route.snapshot.paramMap.get('panel');  
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.id[0] = this.route.snapshot.paramMap.get('id'); 
      this.cookieService.put('cluster',this.cluster);
      this.cookieService.put('id',this.id[0]);
      this.panelParameters();        
      if(this.checkRouteChange.indexOf(this.property1)<0){
        this.service.getLocation(this.id[0],this.cluster).subscribe(location=>this.location_info=location,(err)=>console.log(err),()=>{
          this.cookieService.put('location',this.location_info[0].Location);
          this.location = this.cookieService.get('location');          
        });
        this.getWaterinfo();
        this.cookieService.put('prevDiv',this.panel);                                                                       
        this.checkRouteChange.pop();
        this.checkRouteChange.push(this.property1);
        } 
    })
  }
  ngOnInit(){ 
    setTimeout(()=>{
      if(this.jwtHelper.isTokenExpired(this.globalservice.token)){      
        this.service.getSessionVariables('session.php/?action=destroy').subscribe(data=>this.data=data,(err)=>console.log(err),()=>{
          window.location.href= '/';
        }); 
      }
      this.panel = this.route.snapshot.paramMap.get('panel');  
      this.id[0] = this.route.snapshot.paramMap.get('id');  
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.cookieService.put('cluster',this.cluster);
      this.cookieService.put('id',this.id[0]);     
      this.panelParameters();
      if(this.checkRouteChange.indexOf(this.property1)<0){   
          this.service.getLocation(this.id[0],this.cluster).subscribe(location=>this.location_info=location,(err)=>console.log(err),()=>{
          this.cookieService.put('location',this.location_info[0].Location);
          this.location = this.cookieService.get('location');
        });
        this.getWaterinfo();
        this.cookieService.put('prevDiv',this.panel);                                                                       
        } 
    })

  }


  generateGraph(){
    this.dataChange = true;
    this.chartData=[];
    this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData);    
  }
  getWaterinfo():void{
    this.info=[];
    this.chartData=[];
    this.service.getData(this.id,this.table,this.filename).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{      
      if( !this.info || Object.keys(this.info).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      this.formatParamters();      
      this.fromDate = this.info[0].date;
      this.toDate = this.info[0].date;
      this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData); 
    }); 
    setTimeout(()=>{
      this.dataAvailable = true;                    
    },1000);

  }

  panelParameters(){
    switch (this.panel){
      case 'WaterDispenser' : this.data= this.Cluster[this.cluster].WaterDispenseData;
                          this.filename = 'Water.php';
                          this.property1 = 'Total_Volume_Dispensed';
                          this.property2 = 'date';
                          this.table =  this.Cluster[this.cluster].WaterDispenseData[3];
                          break;
      case 'Ro' :  this.data = this.Cluster[this.cluster].RoData;
                        this.filename = 'Ro.php';
                        this.property1 = 'Operational_Minutes';
                        this.property2 = 'date'
                        this.table =  this.Cluster[this.cluster].RoData[3];                        
                        break;
      case 'CupDispenser' :  this.data = this.Cluster[this.cluster].CupDispenseData;
                        this.filename = 'Cup.php';
                        this.property1 = 'TotalCupsDispensed';
                        this.property2 = 'date'
                        this.table =  this.Cluster[this.cluster].CupDispenseData[3];                        
                        break;
      default  :    break;
    }
  }

  formatParamters(){
    if(this.info[0]["Operational_Minutes"]){
      this.info[0]["Operational_Minutes"]=Math.floor(this.info[0]["Operational_Minutes"]/60)+' hrs '+ this.info[0]["Operational_Minutes"]%60;
      if(this.info[0]["UV_State"]==0) {
         this.info[0]["UV_State"] = "Off";
      }
      else{
        this.info[0]["UV_State"] = "On";          
      }                 
    }
    switch (parseInt(this.info[0]["Trip_state"])){
      case 0 : this.info[0]["Trip_state"]="RO ON";break;
      case 1 : this.info[0]["Trip_state"]="TW Tank Full";break;
      case 2 : this.info[0]["Trip_state"]="RW Tank Empty";this.blink();break;
      case 3 : this.info[0]["Trip_state"]="High Pressure Trip";this.blink();break;
      case 5 : this.info[0]["Trip_state"]="RWP Dry Run";this.blink();break;
      case 6 : this.info[0]["Trip_state"]="RWP Overload";this.blink();break;
      case 7 : this.info[0]["Trip_state"]="HPP Dry Run";this.blink();break;
      case 8 : this.info[0]["Trip_state"]="HPP Overload";this.blink();break;
      case 9 : this.info[0]["Trip_state"]="LOW Pressure";this.blink();break;
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : this.info[0]["Trip_state"]="Backwash ON";this.blink();break;
      default : this.info[0]["Trip_state"]="Out of Range";this.blink();break;
    }

    switch (parseInt(this.info[0]["Tank_Level"])){
      
      case 0 : this.info[0]["Tank_Level"]="100";break;
      case 1 : this.info[0]["Tank_Level"]="<100";break;
      case 2 : this.info[0]["Tank_Level"]="0";this.blink();break;
      default : this.info[0]["Tank_Level"]="Out of Range";this.blink();break;
    }
  }
  blink(){
    setInterval(()=>{
      $('#Trip_state').fadeToggle(1000);
      $('#Trip_state').css({"color":"red"})
    },1000)
  }
}

