import { Component, Input, OnInit,OnChanges, AfterContentChecked,DoCheck} from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {waterDispenserParam} from './waterDispenserparam'
import {WaterDispenseData,RoData} from './test'
declare var jquery:any;
declare var $ :any; 

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css']
})
export class WaterDispenseComponent implements OnInit{
  property1:string;
  filename: string; 
  panel:string;
  id: string;
  place : string = 'GuruGram , Haryana';
  info =[];
  checkRouteChange=['waterPanel'] ;
  data = [];


  constructor( private service : FetchWaterDispenseDataService,private router : Router,private route: ActivatedRoute){
    router.events.subscribe((val)=>{    
      if (val instanceof NavigationEnd) {
        this.panel = route.snapshot.paramMap.get('panel');  
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
  ngOnInit(){
  }

  getWaterinfo():void{ 
    this.info=[];
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info); 

  }

  panelParameters(){
    switch (this.panel){
      case 'WaterDispenser' : this.data= WaterDispenseData;
                          this.filename = 'testfile.php';
                          this.property1 = 'Total_Volume_Dispensed';
                          break;
      case 'Ro' :  this.data = RoData;
                        this.filename = 't2.php';
                        this.property1 = 'Operational_Minutes';
                        break;
      default  :    break;
    }
  }

  
}
