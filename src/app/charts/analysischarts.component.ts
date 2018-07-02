import { Component, OnInit,Input, ViewChild,AfterViewInit,AfterContentChecked,OnChanges,AfterViewChecked,AfterContentInit} from '@angular/core';
import {Chart} from 'chart.js';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Cluster} from '../Clusters'
import { chartData } from '../water-dispense/waterDispenserparam';
import { Property } from '../users';
import { callbackify } from 'util';
import { DEFAULT_VALUE_ACCESSOR } from '@angular/forms/src/directives/default_value_accessor';
import { ThrowStmt } from '@angular/compiler';
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
  _chartData : any;
  //Check change in properties selected
  @Input () set property(property : string){
    this._property = property;
    console.log(this._property)    
    this.checkGraph = true;
  } ;
  // Check change in chart Data
  @Input () set chartData(chartData :any){
    this._chartData=chartData
    this.checkGraph=true;
  }
  // Check Id change
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
  checkGraph : boolean=true; // checks if chart has to update or not
  label : string;
  labelString: string;
  flag=true;
  datasets=[];
  constructor(private Cluster : Cluster,private router : Router,private route : ActivatedRoute) { 
  }
  ngOnInit(){
    // If requested chart type is bubble splice the datasets into a group of length size of property array 
    if(this.ty=='bubble'){
      Chart.defaults.global.legend.display = false;
      // making datasets for each and every id selected
      for( let id of this._ids){
        this.datasets.push(
          { 
            label:'',
            data:this._chartData.splice(0,this._property.length),
            backgroundColor:this.backGroundColor // this enables the same property with same color
        }
        )
      }
      // Selecting options written below for bubble chart
      this.Options();
    }
    else{
      // for polar chart no need of splicing 
      Chart.defaults.global.legend.display = true;

      console.log(this.chartData);
      this.datasets.push(
        { 
          label:this._ids,
          data:this._chartData,
          backgroundColor: this.backGroundColor
      }
      );
    }
      this.Chart(this.ty);
  }

  ngAfterContentChecked(){
    // if type is polar chart update data and labels on changing property
    if(this.checkGraph&&this.ty=='polarArea'){
      console.log(this._property,this._chartData)
      this.datasets=[]; 
      let ids=this._ids ; 
      let chartData = this._chartData;   
      this.datasets.push(
        { 
          label:this._ids,
          data:this._chartData,
          backgroundColor: this.backGroundColor // setting background color
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
                        return -value+ids // side labels of value for (-)ve half
                      }
                      else{
                        return value + ids;// side labels of value (+)ve half
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
//  Refer Chart.js for more info
  Chart(type:string){
    this.type= type;
    this.data= {
      labels : this._property,
      datasets:this.datasets,  
    };
    this.options=this.options

  }
 // Chart.js option field
  Options(){
    let property = this._property;
    let ids =this._ids;
    this.options= {
      // labelling axes  with respective labels
      scales: {
        // x axis
        xAxes: [{
          scaleLabel:{
            display :true,
            labelString : ''
            },
            ticks: {
              min:1,
              stepSize: 1,
              callback: function(value, index, values) {
                return  ids[value-1] ; // name of id
               }
            }
        }]
    ,
        // yaxis
        yAxes: [{
          scaleLabel:{
            display :true,
            labelString : ''
            },
            ticks: {
              min:1,
              stepSize: 1,
              callback: function(value, index, values) {
                return  property[value-1] ; // name of prperty
                }
            }
        }]
      }
  }
  }

  // Different Background Color for different properties
  backGroundColor=[

    "#0033cc",
    "#00cc00",
    "#ffff33",
    "#6600cc",
    "#ff9900",
    "#cc00cc",
    "#663300",
    "#00e6e6",
    "#9999ff",

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
  ]

  }





  
