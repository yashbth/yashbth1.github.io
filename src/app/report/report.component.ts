import { Component, OnInit ,AfterContentChecked} from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Cluster } from '../delhiCluster';
import {Sales} from './report';
import { filter, mergeMap } from 'rxjs/operators';
import {Property,dropdowntableSettings, charts, dropdownpolarSettings} from '../users'
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

  bubblechartData=[];
  polarchartData=[];
  request =[];
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
          for(let i=0;i<5;i++){ 
            this.parsedInfo[id][i]=this.info[i].filter(function(element){
              return (element["DeviceID"]==id);
          })
        } 
      }
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
  setChartData(item:any){  
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
      this.polarchartData.push(extend.reduce((sum,element)=>sum +element[item.name],0));       
      this.tableData[id]=extend;
      // this.chartData.push(this.parsedInfo[id].reduce((sum,element)=>sum +element[item.name],0));
    }
    this.parameters[1]=this.selectedparameter[0];  
    this.tableActive=true;          
  }
  onItemSelect(item:any){
    this.selectedIds.push(item.DeviceID);
    console.log(this.selectedIds)
    this.tableActive=false;
  }
  onDeSelect(item:any){
    this.selectedIds = this.selectedIds.filter(function(element) { 
      return element !== item.DeviceID
  })

  this.tableActive=false;
    console.log(this.selectedIds);
  }
  onSelectAll(item:any){
    this.selectedIds=[];
    item.forEach(element => {
        return this.selectedIds.push(element.DeviceID);
    });;
  }
  onDeSelectAll(item:any){
    this.selectedIds=[];
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




