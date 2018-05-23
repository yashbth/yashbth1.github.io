import { Component, Input, OnInit,OnChanges, AfterContentChecked,DoCheck, AfterContentInit} from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'
import  '../../assets/scripts/map.js'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {waterDispenserParam} from './waterDispenserparam'
import {WaterDispenseData,RoData,CupDispenseData} from './test'
import {Globals} from '../global';
declare var jquery:any;
declare var $ :any; 
declare var displayLocation : any;

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css'],
  providers:[Globals]
})
export class WaterDispenseComponent implements OnInit{
  property1:string;
  filename: string; 
  panel:string;
  id=[];
  place : string = 'New Delhi Cluster';
  info =[];
  checkRouteChange=['waterPanel'] ;
  data = [];


  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute,public address : Globals){

    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) {
        this.panel = route.snapshot.paramMap.get('panel');  
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
  ngOnInit(){ 

  }
  ngAfterContentInit(){

  }
  getWaterinfo():void{ 
    this.info=[];
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info); 
    setTimeout(()=>{
      let lat = parseInt(this.info[0].Lattitude)/1000000;
      let lon = parseInt(this.info[0].Longitude)/1000000;
      this.address.lat = lat;
      this.address.lon = lon;
      console.log(this.address.lat);
      $(document).ready(function(){
        displayLocation(lat,lon,'place');   
      })
    },500)

  }

  panelParameters(){
    switch (this.panel){
      case 'WaterDispenser' : this.data= WaterDispenseData;
                          this.filename = 'Water.php';
                          this.property1 = 'Total_Volume_Dispensed';
                          break;
      case 'Ro' :  this.data = RoData;
                        this.filename = 'Ro.php';
                        this.property1 = 'Operational_Minutes';
                        break;
      case 'CupDispenser' :  this.data = CupDispenseData;
                        this.filename = 'Cup.php';
                        this.property1 = 'TotalCupsDispensed';
                        break;
      default  :    break;
    }
  }

  
}
