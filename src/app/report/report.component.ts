import { Component, OnInit ,AfterContentChecked} from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Cluster } from '../delhiCluster';
import {Sales} from './report';
import { filter, mergeMap } from 'rxjs/operators';
import {Property,dropdowntableSettings, charts, dropdownpolarSettings} from '../users';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'


declare var $:any;
declare var tableExport : any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  title: string= "Welcome To Dashboard";
  addInfo = new Date().toUTCString();
  from ='2018-06-01';
  to ='2018-06-07';
  cluster : string="Select Cluster";
  ids: any;
  id: any;
  isActive:boolean;
  tableActive:boolean;
  chartsActive: boolean;
  selectedIds=[];
  info =[];
  dataAvailable : boolean;
  dates =[];
  parsedInfo=[];
  tableData=[];
  sales=Sales;
  dropdowntableSettings=dropdowntableSettings;
  charts =charts
  tables=['WaterDispenseData','RoData','CupDispenseData','supervisorData','operator']  
  dropdown1=[];
  dropdown2=[];
  parameters=[this.dropdown1,this.dropdown2];
  selDrop1=[];
  selDrop2=[];
  selectedparameter =[this.selDrop1,this.selDrop2];

  data = [];  
  bubblechartData=[];
  polarchartData=[];
  chartData=[];  
  request =[];
  x_bubble =  [];
  y_bubble = [];
  r_bubble = [];
  r_bubble_row = [];
  x_index : number;
  y_index: number;

  x_data : number;
  y_data: number;
  r_data: number;

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster) { }

  ngOnInit() {                   
    for (var table of this.tables){
      let i=0;
      for(var property of this.Cluster['NISE'][table][1]){
        if(this.parameters[0].indexOf(property)==-1){
          let obj = {
            name : this.Cluster['NISE'][table][0][i],
            title : property
          }
          this.parameters[0].push(obj);
        }
        i=i+1;
      }
    }
  }

  generateReport(){

    let date= new Date(this.from);
    date.setDate(date.getDate()-1);
    for(var t of this.tables){
    let table = this.Cluster[this.cluster][t][3]; 
      this.request.push(this.service.getChartData('report.php',this.selectedIds,table,date.toISOString().slice(0,10),this.to));
    }
    forkJoin(this.request).subscribe(info=>this.info=info,(err)=>console.log(err),()=>{
        for( var id of this.selectedIds){
          this.parsedInfo[id]=[];        
          this.bubblechartData[id]=[];  
          for(let i=0;i<5;i++){ 
            this.parsedInfo[id][i]=this.info[i].filter(function(element){
              return (element["DeviceID"]==id);
          })
        } 
      }
      this.setChartData(this.selectedparameter[0],0);
      this.dataAvailable= true;           
      this.chartsActive=true;
    })

  }
  getIds(){
    this.service.getIds('',this.cluster,'').subscribe(ids=>this.ids=ids,(err)=>this.ids=[],()=>{
    this.isActive=true;                     
    });
  }
  ngAfterContentChecked(){
    this.parameters[1]=this.selectedparameter[0];        
  }
  setChartData(item : any,chart){
    console.log(this.selectedparameter[0]);  
    this.polarchartData=[];
    for (var id of this.selectedIds){
      let temp=[];
      let extend=[];      
      for(let table of this.tables){
        temp[table]=this.selectedparameter[0].filter((element,index,option)=>{
          return ((this.Cluster[this.cluster][table][0].indexOf(element.name))>=0)
      })
        temp[table]=this.dataRise(this.parsedInfo[id][0],temp[table]);
        extend=this.mergeResult(extend,temp[table]); 
      }
      if(chart==1){
        this.polarchartData.push(extend.reduce((sum,element)=>sum +element[item.name],0));
        this.chartData[1]=[this.selectedIds,this.polarchartData,this.selectedparameter[1],'polarArea'];
      }
      for(let parameter of this.selectedparameter[0]){
        this.bubblechartData[id][parameter.name]=(extend.reduce((sum,element)=>sum +element[parameter.name],0));
      }
      this.tableData[id]=extend;
      // this.chartData.push(this.parsedInfo[id].reduce((sum,element)=>sum +element[item.name],0));
    }
    this.parameters[1]=this.selectedparameter[0];  
    this.generate_data();             
  }
  emptyChartData(){
    this.selectedparameter[0]=[];
    this.parameters[1]=[];this.selectedparameter[1]=[];
    this.tableActive=false;
  }
  onItemSelect(item:any){
    this.selectedIds.push(item.DeviceID);
    this.selectedparameter[0]=[];
    this.tableActive=false;
  }
  onDeSelect(item:any){
    this.selectedparameter[0]=[];    
    this.selectedIds = this.selectedIds.filter(function(element) { 
      return element !== item.DeviceID
  })

  this.tableActive=false;
  }
  onSelectAll(item:any){
    this.selectedIds=[];
    this.selectedparameter[0]=[];    
    item.forEach(element => {
        return this.selectedIds.push(element.DeviceID);
    });;
  }
  onDeSelectAll(item:any){
    this.selectedparameter[0]=[];    
    this.selectedIds=[];
  }






  generate_data(){
    this.x_bubble =  [];
    this.y_bubble = [];
    this.r_bubble = [];
    this.r_bubble_row = [];
    this.data = [];
    console.log(this.bubblechartData,"1");
    this.x_bubble = this.selectedIds;
    for(let parameter of this.selectedparameter[0]){
      this.y_bubble.push(parameter.title);
      for(let divID of this.selectedIds){
       console.log(this.bubblechartData,"2");

        this.r_bubble_row.push(this.bubblechartData[divID][parameter.name]);
        console.log(this.x_bubble,this.y_bubble,this.r_bubble_row,'3');
        //TODO: define get_r (outputs the total in the given data range)
      }
      this.r_bubble_row=this.normalise(this.r_bubble_row);
      console.log(this.r_bubble_row,'6');
      
      this.r_bubble.push(this.r_bubble_row);
      this.r_bubble_row = [];
      
    }
    console.log(this.r_bubble,'5');
  
    this.x_index = 0;
    for(let x_element of this.x_bubble){
      this.y_index = 0;
      for(let y_element of this.y_bubble){
        this.x_data = this.x_index+1;
        this.y_data = this.y_index+1;
        this.r_data = this.r_bubble[this.y_index][this.x_index];
        console.log(this.r_data,'4');
        this.y_index += 1;
        this.data.push({x:this.x_data,y: this.y_data,r :this.r_data});
        
        //TODO: add labels as in x_bubble[y-index], y_bubble[y_index]
      }
      this.x_index += 1;
    }
    this.chartData[0]=[this.y_bubble,this.data,this.selectedIds,'bubble'];  
  }
  
  normalise(r_bubble_row){
    var k=r_bubble_row[0];
    for(let temp of r_bubble_row){
      if(temp>k){
        k = temp;
      }
    }
    if(k==0){
      var normalisation_index = 1;
    }
    else{
      var normalisation_index = k/25;    

    }
    console.log(normalisation_index,'index');
    var normalised_array = [];
    r_bubble_row.filter(element => {return normalised_array.push(Math.abs(element/normalisation_index))});
    return normalised_array;
  
  }










  dataRise(inputArray,properties){
    let dates=[]
    let prevRowData=inputArray[0];
    // console.log(prevRowData,properties);
    let i=0;
    let lastDay_rowIndex=0;
    for( var row of inputArray){
      i=i+1;
      if(prevRowData['date']!=row['date'] || inputArray.length==i){
        var temp={}
        for( var data of properties){
          var prevData=dates.length?inputArray[lastDay_rowIndex][data.name]:0
          temp["date"]= prevRowData["date"];
          temp[data.name]=prevRowData[data.name]-prevData;
        }
        dates.push(temp);       
        lastDay_rowIndex=i-2;                    
      }
    prevRowData = row; 
    }
    dates.shift()
    return dates;
  }

  mergeResult(array1,array2){
    let mergedArray=[];
    let i=0;
    for(let row of array2){
      mergedArray.push($.extend( array1[i], array2[i] ));
      i=i+1;              
    }    
    // console.log(mergedArray)
    return mergedArray;
  }

  print(id): void {
    let printContents, popupWin;
    printContents = document.getElementById(id).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">    
          <style>

            @media print {
              body {-webkit-print-color-adjust: black !important;}
              th{
                color: black !important;
              }
              }
          </style>
        </head>
    <body onload="window.print();">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}




