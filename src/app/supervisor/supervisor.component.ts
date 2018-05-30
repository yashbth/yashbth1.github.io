import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {Cluster} from '../delhiCluster'
import { GlobalService } from '../global.service'
import { CookieService } from 'angular2-cookie/core';
 
declare var jquery: any;
declare var $: any;
declare var displayLocation : any;

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
  dataAvailable :boolean = false;
  property1:string;
  filename: string; 
  id = [];
  cluster : string;
  place : string = 'New Delhi Cluster';
  info =[];
  checkRouteChange=['waterPanel'] ;
  data = [];
  location : string = this.cookieService.get('location');
  fromDate : any;
  toDate : any;
  chartData =[];
  table : string = 'SuperVisor_Login';
  dataChange :boolean=true;

  constructor( private service : FetchWaterDispenseDataService,private Cluster : Cluster,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService){
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) {
        this.dataAvailable= false;         
        displayLocation(this.globalservice.lat,this.globalservice.lon,'place');
        this.id[0] = route.snapshot.paramMap.get('id');   
        this.cluster = route.snapshot.paramMap.get('cluster');                                                    
        this.panelParameters();
        if(this.checkRouteChange.indexOf(this.property1)<0){
          this.getWaterinfo();
          this.checkRouteChange.pop();
          this.checkRouteChange.push(this.property1);
        } 
      }   
    })
  }
  ngOnInit() {    
  }
  generateGraph(){
    this.dataChange = true;
    this.chartData=[];
    this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData);    
  }

  getWaterinfo():void{ 
    this.info=[];
    this.service.getData(this.id,this.table,this.filename).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{
      this.fromDate = this.info[0].date;
      this.toDate = this.info[0].date
      this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData); 
    }); 
    this.cookieService.put('prevDiv','supervisor');    
    setTimeout(()=>{
      this.dataAvailable= true;
    },1000);
    


  }

  panelParameters(){
    this.data = this.Cluster[this.cluster].supervisorData;
    this.filename = 'supervisor.php';
    this.property1 = 'Total_Collection_Sale';
  }
}

