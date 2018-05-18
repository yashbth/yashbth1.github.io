import { Component, OnInit } from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {waterDispenserParam} from './waterDispenserparam'
import {Data} from './test'

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css']
})
export class WaterDispenseComponent implements OnInit{
  place : string = 'GuruGram , Haryana';
  water_info :waterDispenserParam[];
  
  data = Data;
  constructor( private service : FetchWaterDispenseDataService){
    
  }

  ngOnInit(){
    this.getWaterinfo();
  }
  getWaterinfo():void{
    this.service.getData().subscribe(water_info=>this.water_info=water_info);

  }
  
}
