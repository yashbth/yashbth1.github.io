import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {supervisorData} from '../water-dispense/test'
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

  property1:string;
  filename: string; 
  id = [];
  place : string = 'New Delhi Cluster';
  info =[];
  checkRouteChange=['waterPanel'] ;
  data = [];
  location : string = this.cookieService.get('location');

  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService){
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) { 
        displayLocation(this.globalservice.lat,this.globalservice.lon,'place');
        this.id[0] = route.snapshot.paramMap.get('id');                                                       
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

  getWaterinfo():void{ 
    this.info=[];
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info); 
    // console.log(this.id);
    setTimeout(()=>{
      // console.log(this.info);
      // console.log(Object.keys(this.info).length);
      if(Object.keys(this.info).length==0){
        this.router.navigateByUrl('/device/'+this.id[0] +'/error')
      }
    },100);
    


  }

  panelParameters(){
    this.data = supervisorData;
    this.filename = 'supervisor.php';
    this.property1 = 'Total_Collection_Sale';
  }
}

