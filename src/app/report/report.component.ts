import { Component, OnInit } from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Cluster } from '../delhiCluster';
import {Sales} from './report';


declare var $:any;
declare var tableExport : any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  title: string= "Welcome To Dashboard";
  addInfo = Date();
  from : any;
  to : Date;
  cluster : string="Select Cluster";
  ids: any;
  isActive:boolean;
  tableActive:boolean;
  selectedIds:any;
  info : any;
  dataAvailable : boolean;
  dates =[];
  parsedInfo=[];
  sales=Sales;
  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster) { }

  ngOnInit() {
  }

  generateReport(){
    let table = this.Cluster[this.cluster]["WaterDispenseData"][3];
    let date= new Date(this.from);
    date.setDate(date.getDate()-1);
    this.selectedIds=$('#sel2').val();  
    this.service.getChartData('report.php',this.selectedIds,table,date.toISOString().slice(0,10),this.to).subscribe(info=>this.info=info,(err)=>console.log(err),()=>{
      this.dataAvailable= true;  
      for( var id of this.selectedIds){
        this.parsedInfo[id]=this.info.filter(function(element){
          return (element["DeviceID"]==id);
        })
        this.parsedInfo[id]=this.dataRise(this.parsedInfo[id]);

        
      }  
      this.tableActive=true;
      $(document).ready(function() {
        $('#'+this.selectedIds[0]).DataTable( {
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        } );
    } );
    });
  }
  getIds(){
    this.service.getIds('',this.cluster,'').subscribe(ids=>this.ids=ids,(err)=>this.ids=[],()=>{
      this.isActive=true;                  
    });
  }

  dataRise(inputArray){
    let dates=[]
    let prevRowData=inputArray[0];
    let i=0;
    let lastDay_rowIndex=0;
    for( var row of inputArray){
      i=i+1;
      if(prevRowData['date']!=row['date'] || inputArray.length==i){
        var temp={}
        for( var data of Sales[0]){
          var prevData=dates.length?inputArray[lastDay_rowIndex][data]:0
          temp["date"]= prevRowData["date"];
          temp[data]=prevRowData[data]-prevData;
        }
        dates.push(temp);       
        lastDay_rowIndex=i-2;                    
      }
    prevRowData = row; 
    }
    dates.shift()
    return dates;
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
          <title>Report:`+id+`</title>
          <style>
            title{
              font-weight : bolder;
              font-size:30px;
            }
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




