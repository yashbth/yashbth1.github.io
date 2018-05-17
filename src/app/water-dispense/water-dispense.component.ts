import { Component, OnInit } from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import {waterDispenserParam} from './waterDispenserparam'

@Component({
  selector: 'app-water-dispense',
  templateUrl: './water-dispense.component.html',
  styleUrls: ['./water-dispense.component.css']
})
export class WaterDispenseComponent implements OnInit{
  place : string = 'GuruGram , Haryana';
  id : string = 'ABCDEF1237';
  today = Date.now();
  water_info :waterDispenserParam[];
  constructor( private service : FetchWaterDispenseDataService){

  }
  ngOnInit(){
    this.getWaterinfo();
  }
  getWaterinfo():void{
    this.service.getData().subscribe(water_info=>this.water_info=water_info);
  }
  // water_info=[{
  //     name : 'Total Volume Dispensed',
  //     value: '100000'
  //   },
  //   {
  //     name : 'Total Collection From Card (Till Date)',
  //     value: 'Rs. 10000'
  //   },
  //   {
  //     name : 'Total Collection From Coin (Till Date)',
  //     value: 'Rs. 2000'
  //   },
  //   {
  //     name : 'Total Coin Count (Till Date)',
  //     value: '780'
  //   },
  //   {
  //     name : 'PH Of Water',
  //     value: '7.2'
  //   },
  //   {
  //     name : 'Total Collection',
  //     value: '3000'
  //   },
  // ]
}
