import { Component, OnInit,Input, ViewChild,AfterViewInit,AfterContentChecked,OnChanges,AfterViewChecked,AfterContentInit} from '@angular/core';
import {Chart} from 'chart.js';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Cluster} from '../delhiCluster'
import { chartData } from '../water-dispense/waterDispenserparam';
import { Property } from '../users';
declare var jquery:any;
declare var $ :any; 


@Component({
  selector: 'app-analysis-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class AnalysisChartsComponent implements OnInit {
  cluster : string; 
  _property : string;
  _ids :string;s
  @Input () set property(property : string){
    this._property = property;
    this.checkGraph = true;
  } ;
  @Input () chartData : any;
  @Input () set ids(ids : string){
    this._ids = ids;
    this.checkGraph = true;
  } ;
  @Input () ty;
  Data1=[];
  Data2=[];
  type: string;
  data : any;
  options: any;
  checkGraph : boolean=true;
  label : string;
  labelString: string;
  constructor(private Cluster : Cluster,private router : Router,private route : ActivatedRoute) { 
  }
  ngOnInit(){
      this.Chart(this.ty);
  }
  ngAfterContentChecked(){
    if(this.checkGraph){
      this.Chart(this.ty);
      this.checkGraph=false;
    }
  }


  Chart(type:string){
    this.type= type;
    this.data= {
      labels : this._property,
        datasets: [{
            label: this._ids,
            data:this.chartData,
            backgroundColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ]
        }
      ],

      
    };
    this.options= {
        // scales: {
        //     yAxes: [{
        //       scaleLabel:{
        //         display :true,
        //         labelString : this.labelString
        //         },
        //         ticks: {
        //             beginAtZero:true
        //         }
        //     }]
        // }
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
