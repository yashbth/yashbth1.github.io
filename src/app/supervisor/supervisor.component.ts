import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {Cluster} from '../Clusters'
import { GlobalService } from '../global.service'
import { CookieService , CookieOptionsArgs} from 'angular2-cookie/core';
import { JwtHelperService } from '@auth0/angular-jwt';
 
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
  panel : string;
  cluster : string;
  place : string;
  info =[];
  checkRouteChange=['waterPanel'] ;
  data = [];
  location : string = this.cookieService.get('location');
  machineNo: string= this.cookieService.get('machineNo');
  fromDate : any;
  toDate : any;
  chartData =[];
  table : string = 'SuperVisor_Login';
  dataChange :boolean=true;
  jwtHelper = new JwtHelperService()
  constructor( private service : FetchWaterDispenseDataService,private Cluster : Cluster,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService){
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) {
      this.dataAvailable= false;         
        
      }   
    })
  }
  ngOnInit() { 
    if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
      window.location.href= 'https://swajal.in/iiot';
    }
    this.id[0] = this.route.snapshot.paramMap.get('id');
    this.panel = this.route.snapshot.paramMap.get('panel');       
    this.cluster = this.route.snapshot.paramMap.get('cluster');     
    this.panelParameters();
    if(this.checkRouteChange.indexOf(this.property1)<0){
      this.getWaterinfo();
      this.checkRouteChange.pop();
      this.checkRouteChange.push(this.property1);
    }    
  }
  generateGraph(){
    this.dataChange = true;
    this.chartData=[];
    this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData);    
  }

  getWaterinfo():void{ 
    this.info=[];
    this.service.getData(this.id,this.table,this.filename).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{   
      if(this.globalservice.user["0"]['Supervisor_Data']=="0"){
        var time = new Date();
        time.setSeconds(time.getSeconds() + 5);
        let opts: CookieOptionsArgs = {
          expires: time
        };
        this.cookieService.put("access_denied","Access Denied!",opts);
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
    
      if( !this.info || Object.keys(this.info).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
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
    // this.globalservice.isAllowed('Supervisor_Data');                                                                    
    this.data = this.Cluster[this.cluster].supervisorData;
    this.filename = 'supervisor.php';
    this.property1 = 'Total_Collection_Sale';
  }
}

