import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {supervisorData} from '../water-dispense/test'
import { GlobalService } from '../global.service'
 
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

  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute,private globalservice : GlobalService){
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

  }

  panelParameters(){
    this.data = supervisorData;
    this.filename = 'supervisor.php';
    this.property1 = 'Total_Collection_Sale';
  }
}

