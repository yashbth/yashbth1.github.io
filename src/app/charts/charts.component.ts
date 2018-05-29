import { Component, OnInit,Input, ViewChild,AfterViewInit,AfterContentChecked,OnChanges,AfterViewChecked,AfterContentInit} from '@angular/core';
import {Chart} from 'chart.js';
import {WaterDispenseComponent} from '../water-dispense/water-dispense.component'
import {waterDispenserParam} from '../water-dispense/waterDispenserparam'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Cluster } from '../delhiCluster';
import { ThrowStmt } from '@angular/compiler';


declare var jquery:any;
declare var $ :any; 


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  private _property1: string;
  private chartData : any;
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
  label : string;
  labelString:string;
  checkGraph : boolean=true;
  cluster :string

  constructor(private water : WaterDispenseComponent,private Cluster : Cluster,private router : Router,private route: ActivatedRoute) { 
    this.cluster = route.snapshot.paramMap.get('cluster');
  }
  ngOnInit(){
    this.chartData = this.water;
    if(this.chartData.chartData.length){
      this.ConvertIntoArray(this.chartData.chartData,this._property1,this.property2);
      this.Chart('line');
    }

  }
  ngAfterContentChecked(){
    if(this.checkGraph || this.chartData.dataChange){
      if(this.Cluster[this.cluster].WaterDispenseData[0].indexOf(this._property1)>=0){
        let index = this.Cluster[this.cluster].WaterDispenseData[0].indexOf(this._property1); 
        this.label = this.Cluster[this.cluster].WaterDispenseData[1][index];  
        this.labelString = this.Cluster[this.cluster].WaterDispenseData[1][index]+(this.Cluster[this.cluster].WaterDispenseData[2][index]?' (in ':'')+this.Cluster[this.cluster].WaterDispenseData[2][index]+(this.Cluster[this.cluster].WaterDispenseData[2][index]?')':'');
      }
      else if(this.Cluster[this.cluster].RoData[0].indexOf(this._property1)>=0){
        let index = this.Cluster[this.cluster].RoData[0].indexOf(this._property1);
        this.label = this.Cluster[this.cluster].RoData[1][index];          
        this.labelString =  this.Cluster[this.cluster].RoData[1][index]+(this.Cluster[this.cluster].RoData[2][index]?' (in ':'')+this.Cluster[this.cluster].RoData[2][index]+(this.Cluster[this.cluster].RoData[2][index]?')':'');
      }
      else if (this.Cluster[this.cluster].CupDispenseData[0].indexOf(this._property1)>=0){
        let index = this.Cluster[this.cluster].CupDispenseData[0].indexOf(this._property1);
        this.label = this.Cluster[this.cluster].CupDispenseData[1][index];          
        this.labelString =  this.Cluster[this.cluster].CupDispenseData[1][index]+(this.Cluster[this.cluster].CupDispenseData[2][index]?' (in ':'')+this.Cluster[this.cluster].CupDispenseData[2][index]+(this.Cluster[this.cluster].CupDispenseData[2][index]?')':'');
      }
      this.ConvertIntoArray(this.chartData.chartData,this._property1,this.property2);
      this.Chart('line');
      if(this.chartData.chartData.length){
        this.checkGraph = false;
        this.chartData.dataChange = false;
      }
    }
  }
  
  ngOnChanges(){
    this.ConvertIntoArray(this.chartData.chartData,this._property1,this.property2);
    this.Chart('line');
  }

  Chart(type:string){
    this.type= type;
    this.data= {
      labels : this.Data2,
        datasets: [{
            label: this.label,
            data: this.Data1,
            backgroundColor: [
              "rgba(255,255,255,0)"
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            lineTension : 0
        }
      ]
      
    };
    this.options= {
        scales: {
            yAxes: [{
              scaleLabel:{
                display :true,
                labelString : this.labelString
                },
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
