import { Component, OnInit,Input,AfterContentChecked,OnChanges, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { OperatorComponent } from '../operator/operator.component';

declare var jquery:any;
declare var $ :any; 


@Component({
  selector: 'app-other-chart',
  templateUrl: './operatorcharts.component.html',
  styleUrls: ['./charts.component.css']
})
export class OperatorChartsComponent implements OnInit {
  private _property1: string;
  @Input() // check if property1 has changed or not, if changed sets checkGraph=true to update chart
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
  constructor(private router : Router,private route : ActivatedRoute,private chartData :OperatorComponent) { 
  }
  ngOnInit(){
    setTimeout(()=>{     
      this.ConvertIntoArray(this.chartData,this._property1,this.property2);
      this.Chart('doughnut');
    },100);

  }
  
  ngOnChanges(){
    this.ConvertIntoArray(this.chartData,this._property1,this.property2);
    this.Chart('doughnut');
  }
//  Refer Char.js for more info about charts
  Chart(type:string){
    this.type= type;
    this.data= {
      labels : ['Presents','Absents'],
        datasets: [{
            data: this.Data1, // no.of  presents and absents
            backgroundColor: [
              '#00cc00',
                '#cc3300',

            ],
            borderColor: [

            ],
            borderWidth: 1
        }

      ]
      
    };
    this.options= {
      tooltips:{
        titleFontSize:25,
        bodyFontSize:25,
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue/total*100).toFixed(1));
            return currentValue + ' (' + percentage + '%)';
          },
          title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
    
      }

    }
  }

  ConvertIntoArray(data,property1:string,property2:string):void{  
    this.Data1=[];
    this.Data2=[];
      this.Data1.push(data[property1]);
      this.Data1.push(data[property2]);
    
  }
  
}
