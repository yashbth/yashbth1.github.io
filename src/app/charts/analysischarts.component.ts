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
export class AnalysisChartsComponent{
  cluster : string; 
  _property : string;
  _ids :string;s
  @Input () set property(property : string){
    this._property = property;
    console.log(this._property)    
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
  flag=true;
  datasets=[];
  constructor(private Cluster : Cluster,private router : Router,private route : ActivatedRoute) { 
  }
  ngOnInit(){
    if(this.ty=='bubble'){
    for( let property of this._property){
      this.datasets.push(
        { 
          label:'',
          data:this.chartData.splice(0,this._property.length),
          backgroundColor: [
            "#0033cc",
            "#00cc00",
            "#ffff33",
            "#6600cc",
            "#ff9900",
            "#cc00cc",
            "#663300",
            "#00e6e6",
            "#9999ff"
          ]
      }
      )
    }
    console.log(this.datasets)
    let property = this._property;
    let ids =this._ids;

      this.options= {
        scales: {
          xAxes: [{
            scaleLabel:{
              display :true,
              labelString : ''
              },
              ticks: {
                min:1,
                stepSize: 1,
                callback: function(value, index, values) {
                  return  ids[ids.length-1-index] ;
                 }
              }
          }]
      ,
            yAxes: [{
              scaleLabel:{
                display :true,
                labelString : ''
                },
                ticks: {
                  min:1,
                  stepSize: 1,
                  callback: function(value, index, values) {
                    return  property[property.length-1-index] ;
                   }
                }
            }]
        }
    }
    }
      this.Chart(this.ty);
  }
  ngAfterContentChecked(){  
    if(this.checkGraph){
      let property = this._property;
      let ids =this._ids;
      if(this.ty=='bubble'){
        this.options= {
          scales: {
            xAxes: [{
              scaleLabel:{
                display :true,
                labelString : ''
                },
                ticks: {
                  min:1,
                  stepSize: 1,
                  callback: function(value, index, values) {
                    return  ids[ids.length-1-index] ;
                   }
                }
            }]
        ,
              yAxes: [{
                scaleLabel:{
                  display :true,
                  labelString : ''
                  },
                  ticks: {
                    min:1,
                    stepSize: 1,
                    callback: function(value, index, values) {
                      return  property[property.length-1-index] ;
                     }
                  }
              }]
          }
      }
      }
      this.Chart(this.ty);
      this.checkGraph=false;
    }
  }


  Chart(type:string){

    this.type= type;
    this.data= {
      labels : this._property,
        datasets:this.datasets,  
    };
    this.options=this.options

  }

  }





  
