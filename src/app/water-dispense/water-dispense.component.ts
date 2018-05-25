import { Component, Input, OnInit,OnChanges, AfterContentChecked,DoCheck, AfterContentInit} from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'
import  '../../assets/scripts/map.js'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {waterDispenserParam} from './waterDispenserparam'
import {WaterDispenseData,RoData,CupDispenseData} from './test'
import { GlobalService } from '../global.service';
import { CookieService } from 'angular2-cookie/core';

declare var jquery:any;
declare var $ :any; 
declare var displayLocation : any;

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css'],
})
export class WaterDispenseComponent implements OnInit{
  property1:string;
  property2:string;
  filename: string; 
  table: string;
  panel:string;
  id=[];
  place : string = 'New Delhi Cluster';
  info =[];
  chartData =[];
  dataChange : boolean = true;
  checkRouteChange=['waterPanel'] ;
  data = [];
  fromDate: any=new Date('2018-03-13');
  toDate : any =new Date('2018-03-13');
  location : string = this.cookieService.get('location');

  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService){
    this.fromDate = this.changeDateFormat(this.fromDate);
    this.toDate = this.changeDateFormat(this.toDate);
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) {

        this.panel = route.snapshot.paramMap.get('panel');  
        this.id[0] = route.snapshot.paramMap.get('id');  
        this.panelParameters();
        if(this.checkRouteChange.indexOf(this.property1)<0){
          this.getWaterinfo();
          this.cookieService.put('prevDiv',this.panel);                                                                       
          this.checkRouteChange.pop();
          this.checkRouteChange.push(this.property1);
        } 
      }   
    })
  }
  ngOnInit(){ 

  }


  changeDateFormat(date){
    return date= date.getFullYear() + '-'+((date.getMonth()+1)/10>1 ? '':'0')+(date.getMonth()+1)+'-'+date.getDate();    

  }
  generateGraph(){
    this.dataChange = true;
    this.chartData=[];
    this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData);    
  }
  getWaterinfo():void{ 
    this.info=[];
    this.chartData=[];
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info); 
    this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData);
    setTimeout(()=>{
      if(Object.keys(this.info).length==0){
        
        this.router.navigateByUrl('/device/'+this.id[0] +'/error')
      }
      let lat = parseInt(this.info[0].Lattitude)
      let lon = parseInt(this.info[0].Longitude)
      while(Math.abs(lat)>100){
        if(lat/100<1) {break};
        lat = lat/10;
      }
      while(Math.abs(lon)>100){
        if(lon/100<1) {break};
        lon = lon/10;
      }
      if(this.info[0].Lattitude){
        this.globalservice.lat=lat;
        this.globalservice.lon =lon;
        
        displayLocation(lat,lon,'place');
        
      }

    },500)

  }

  panelParameters(){
    switch (this.panel){
      case 'WaterDispenser' : this.data= WaterDispenseData;
                          this.filename = 'Water.php';
                          this.property1 = 'Total_Volume_Dispensed';
                          this.property2 = 'date';
                          this.table = 'Water_Dispensing_Panel';
                          break;
      case 'Ro' :  this.data = RoData;
                        this.filename = 'Ro.php';
                        this.property1 = 'Operational_Minutes';
                        this.property2 = 'date'
                        this.table = 'RO_Log_Parameter';                        
                        break;
      case 'CupDispenser' :  this.data = CupDispenseData;
                        this.filename = 'Cup.php';
                        this.property1 = 'TotalCupsDispensed';
                        this.property2 = 'date'
                        this.table = 'CupDispensing';                        
                        break;
      default  :    break;
    }
  }

  
}
