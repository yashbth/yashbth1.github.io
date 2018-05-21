import { Component, OnInit,Input, ViewChild,AfterViewInit,AfterContentChecked,OnChanges,AfterViewChecked,AfterContentInit} from '@angular/core';
import {Chart} from 'chart.js';
import {WaterDispenseComponent} from '../water-dispense/water-dispense.component'
import {waterDispenserParam} from '../water-dispense/waterDispenserparam'
import { Router, NavigationEnd } from '@angular/router';

declare var jquery:any;
declare var $ :any; 


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  private _property1: string;
  @Input() 
  set property1(property1:string){
    this._property1=property1;
    this.checkGraph = true;
  };
  @Input() property2:string;
  Data1=[];
  Data2=[];
  type : string;
  data : any;
  options: any;
  checkGraph : boolean=true;
  constructor(private chartData : WaterDispenseComponent,private router : Router) { 
  }
  ngOnInit(){
    setTimeout(()=>{
      this.ConvertIntoArray(this.chartData.info,this._property1,this.property2);
      this.Chart('bar');
    },1000);

  }
  ngAfterContentChecked(){
    console.log("ng");
    if(this.checkGraph){
      this.ConvertIntoArray(this.chartData.info,this._property1,this.property2);
      this.Chart('bar');
      if(this.chartData.info[0][this._property1]){
        this.checkGraph = false;
      }
    }
  }
  
  ngOnChanges(){
    this.ConvertIntoArray(this.chartData.info,this._property1,this.property2);
    this.Chart('bar');
  }

  Chart(type:string){
    this.type= type;
    this.data= {
      labels : this.Data2,
        datasets: [{
            label: this._property1,
            data: this.Data1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
          label: 'Line Dataset',
          data: [1500,0, 600, 1250, 500,0,0,0,200,0],
          backgroundColor: ['skyblue'],
          // Changes this dataset to become a line
          type: 'bar'
        }
      ]
      
    };
    this.options= {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  }

  ConvertIntoArray(data,property1:string,property2:string):void{  
    this.Data1=[];
    this.Data2=[];
    for(let obj of data){
      this.Data1.push(parseInt(obj[property1]));
      this.Data2.push(obj[property2]);
    }
  }
  
}
