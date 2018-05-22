import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {supervisorData} from '../water-dispense/test'

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  property1:string;
  filename: string; 
  id: string;
  place : string = 'GuruGram , Haryana';
  info =[];
  checkRouteChange=['waterPanel'] ;
  data = [];

  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute){
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) { 
        this.id = route.snapshot.paramMap.get('id');                                                       
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
    $('#table').DataTable();
    
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

