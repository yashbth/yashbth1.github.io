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
    Chart.defaults.global.legend.display = false;
    for( let property of this._property){
      this.datasets.push(
        { 
          label:'',
          data:this.chartData.splice(0,this._property.length),
          backgroundColor: [

            "#A93226",
            "#E74C3C",
            "#9B59B6",
            "#8E44AD",
            "#2980B9",
            "#3498DB",
            "#1ABC9C",
            "#16A085",
            "#27AE60",
            "#2ECC71",
            "#F1C40F",
            "#F39C12",
            "#E67E22",
            "#D35400",
            "#ECF0F1",
            "#BDC3C7",
            "#95A5A6",
            "#7F8C8D",
            "#34495E",
            "#2C3E50",

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
    this.Options();
    }
    else{
      Chart.defaults.global.legend.display = true;

      console.log(this.chartData);
      this.datasets.push(
        { 
          label:this._ids,
          data:this.chartData,
          backgroundColor: [

            "#A93226",
            "#E74C3C",
            "#9B59B6",
            "#8E44AD",
            "#2980B9",
            "#3498DB",
            "#1ABC9C",
            "#16A085",
            "#27AE60",
            "#2ECC71",
            "#F1C40F",
            "#F39C12",
            "#E67E22",
            "#D35400",
            "#ECF0F1",
            "#BDC3C7",
            "#95A5A6",
            "#7F8C8D",
            "#34495E",
            "#2C3E50",

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
      this.datasets=[];      
      this.datasets.push(
        { 
          label:this._ids,
          data:this.chartData,
          backgroundColor: [

            "#A93226",
            "#E74C3C",
            "#9B59B6",
            "#8E44AD",
            "#2980B9",
            "#3498DB",
            "#1ABC9C",
            "#16A085",
            "#27AE60",
            "#2ECC71",
            "#F1C40F",
            "#F39C12",
            "#E67E22",
            "#D35400",
            "#ECF0F1",
            "#BDC3C7",
            "#95A5A6",
            "#7F8C8D",
            "#34495E",
            "#2C3E50",

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
                  return  property[property.length-1-index] ;
                 }
              }
          }]
      }
  }
  }

  }





  
