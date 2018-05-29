import { Component, OnInit,Input, ViewChild,AfterViewInit,AfterContentChecked,OnChanges,AfterViewChecked,AfterContentInit} from '@angular/core';
import {Chart} from 'chart.js';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SupervisorComponent } from '../supervisor/supervisor.component';
import {Cluster} from '../delhiCluster'
declare var jquery:any;
declare var $ :any; 


@Component({
  selector: 'app-supervisor-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class SupervisorChartsComponent implements OnInit {
  private _property1: string;
  private chartData : any;
  cluster : string;
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
  label : string;
  labelString: string;
  constructor(private supervisor : SupervisorComponent,private Cluster : Cluster,private router : Router,private route : ActivatedRoute) { 
  }
  ngOnInit(){
    setTimeout(()=>{
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.chartData = this.supervisor;
      this.ConvertIntoArray(this.chartData.chartData,this._property1,this.property2);
      this.Chart('line');
    },100);

  }
  ngAfterContentChecked(){
    if(this.checkGraph || this.chartData.dataChange){
      let index = this.Cluster[this.cluster].supervisorData[0].indexOf(this._property1); 
      this.label = this.Cluster[this.cluster].supervisorData[1][index];  
      this.labelString = this.Cluster[this.cluster].supervisorData[1][index]+(this.Cluster[this.cluster].supervisorData[2][index]?' (in ':'')+this.Cluster[this.cluster].supervisorData[2][index]+(this.Cluster[this.cluster].supervisorData[2][index]?')':'');
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
                'rgba(255, 255,255,0)',
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
        },
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
