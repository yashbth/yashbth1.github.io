import { Component, OnInit,Input, ViewChild,AfterViewInit,AfterContentChecked,OnChanges,AfterViewChecked,AfterContentInit} from '@angular/core';
import {Chart} from 'chart.js';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Cluster} from '../delhiCluster'
import { chartData } from '../water-dispense/waterDispenserparam';
import { Property } from '../users';
import { callbackify } from 'util';
import { DEFAULT_VALUE_ACCESSOR } from '@angular/forms/src/directives/default_value_accessor';
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
  _ids :string;
  @Input () set property(property : string){
    this._property = property;
    console.log(this._property)    
    this.checkGraph = true;
  } ;
  @Input () chartData : any;
  @Input () set ids(ids : string){
    this._ids = ids;
    this.checkGraph = true;
    console.log(this._ids)
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
    for( let id of this._ids){
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
      console.log(this.chartData);
    }
    console.log(this.datasets);
    this.Options();
    }
    else{
      this.datasets.push(
        { 
          label:this._ids,
          data:this.chartData,
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
      );
    }
      this.Chart(this.ty);
  }

  ngAfterContentChecked(){
    if(this.checkGraph&&this.ty=='polarArea'){
      console.log(this._property,this.chartData)
      this.datasets=[]; 
      let ids=this._ids ; 
      let chartData = this.chartData;   
      this.datasets.push(
        { 
          label:this._ids,
          data:this.chartData,
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
      this.options= {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin:-Math.max.apply(null, chartData),
                    suggestedMax:Math.max.apply(null, chartData),
                    callback : function(value,index,values){
                      if(value<0){
                        return -value+ids
                      }
                      else{
                        return value + ids;
                      }
                   }
                }
            }]
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

  Options(){
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
                  return  property[value-1] ;
                 }
              }
          }]
      }
  }
  }

  }





  
