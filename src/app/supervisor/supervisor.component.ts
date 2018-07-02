import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {Cluster} from '../delhiCluster'
import { GlobalService } from '../global.service'
import { CookieService } from 'angular2-cookie/core';
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
  dataAvailable :boolean = false; //boolean to show/hide tables in html
  property1:string; //the default value in dropdown
  filename: string; //php filename from which data will be recieved
  id = [];
  panel : string; 
  cluster : string;
  place : string;
  info =[];
  checkRouteChange=['waterPanel'] ;//set current panel
  data = [];
  location : string = this.cookieService.get('location'); 
  fromDate : any; //date range to plot the graph
  toDate : any;
  chartData =[];
  table : string = 'SuperVisor_Login'; //table name in database
  dataChange :boolean=true;
  jwtHelper = new JwtHelperService() //jwtHelper decodes jwt token
  constructor( private service : FetchWaterDispenseDataService,private Cluster : Cluster,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService){
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) {
      this.dataAvailable= false;         
        
      }   
    })
  }
  ngOnInit() { 
    if(this.jwtHelper.isTokenExpired(this.globalservice.token)){ //redirect to home page when token is expired
      window.location.href= 'https://swajal.in/iiot';    
    }
    this.id[0] = this.route.snapshot.paramMap.get('id');
    this.panel = this.route.snapshot.paramMap.get('panel');       
    this.cluster = this.route.snapshot.paramMap.get('cluster');     
    this.globalservice.isAllowed(this.cluster,this.panel,this.id); //prevent url mishandling                                                                   
    this.panelParameters();
    if(this.checkRouteChange.indexOf(this.property1)<0){ //detect a route change and update info if route was changed
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
      if( !this.info || Object.keys(this.info).length==0 ){ //if no data is recieved from database then redirect to error page
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      this.fromDate = this.info[0].date;
      this.toDate = this.info[0].date;
      this.service.getChartData('chart_date.php',this.id,this.table,this.fromDate,this.toDate).subscribe(chartData=>this.chartData=chartData); 
    }); 
    this.cookieService.put('prevDiv','supervisor');  //detect the current panel (the current panel will be highlighted in navbar)  
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

