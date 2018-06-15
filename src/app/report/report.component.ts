import { Component, OnInit ,AfterContentChecked} from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Cluster } from '../delhiCluster';
import {Sales} from './report';
import { filter, mergeMap } from 'rxjs/operators';
import {Property,dropdowntableSettings, charts, dropdownpolarSettings} from '../users';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'
import { GlobalService } from '../global.service';


declare var $:any;
declare var tableExport : any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  title: string= "Welcome To Dashboard";
  addInfo = new Date().toUTCString().slice(0,17);
  from:any=new Date();
  to =new Date().toISOString().slice(0,10);
  cluster : string="Select Cluster";
  ids: any;
  id: any;
  isActive:boolean;
  tableActive:boolean;
  chartsActive=[false,false];
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
  unit = [];
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

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster,private global : GlobalService ) { }

  ngOnInit() {  
    this.from.setDate(this.from.getDate()-7);
    this.from=this.from.toISOString().slice(0,10);
    for (var table of this.tables){
      var i=0;
      for(var property of this.Cluster['NISE'][table][0]){
        if(this.parameters[0].indexOf(property)==-1 && this.global.user["0"][property]==1){
          var obj = {
            name : property,
            title : this.Cluster['NISE'][table][1][i],
            unit : this.Cluster['NISE'][table][2][i]
          }
          this.parameters[0].push(obj);
        }
        i=i+1;
      }
    }
  }

  generateReport(){

  this.request=[];    
    for(var t of this.tables){
    var table = this.Cluster[this.cluster][t][3]; 
      this.request.push(this.service.getChartData('report.php',this.selectedIds,table,this.from,this.to));
    }
    forkJoin(this.request).subscribe(info=>this.info=info,(err)=>console.log(err),()=>{
        for( var id of this.selectedIds){
          this.parsedInfo[id]=[];        
          this.bubblechartData[id]=[];  
          for(var i=0;i<5;i++){ 
            this.parsedInfo[id][i]=this.info[i].filter(function(element){
              return (element["DeviceID"]==id);
          })
        } 
      }
      this.setChartData(this.selectedparameter[0],2);
      this.dataAvailable= true;           
      this.chartsActive[0]=true;
    })

  }
  getIds(){
    this.service.getIds('',this.cluster,'').subscribe(ids=>this.ids=ids,(err)=>this.ids=[],()=>{
    this.isActive=true;                     
    });
  }
  ngAfterContentChecked(){
    this.parameters[1]=this.selectedparameter[0];
    if(!this.chartsActive[0]){
     $('html').css({"height":"100%"});      
    } 
    else{
      $('html').css({"height":"auto"});
    } 

  }
  setChartData(item : any,chart){
    console.log("hi");
    if(chart==1||chart==2){
      this.polarchartData=[];
      for (var id of this.selectedIds){
        var temp=[];
        var extend=[]; 
        var prop=[] 
        var i=0;    
        for(var table of this.tables){
          prop[table]=this.selectedparameter[0].filter((element,index,option)=>{
            return ((this.Cluster[this.cluster][table][0].indexOf(element.name))>=0)
        })
          console.log(prop[table],"prop")
        
          temp[table]=this.dataRise(this.parsedInfo[id][i],prop[table]);
          console.log(temp,"temp",i)

          if(extend.length!=0){
            extend=this.mergeResult(extend,temp[table]); 
          }
          else{
            extend= temp[table];
          }
          i=i+1; 
        }
        if(chart==1){
          var element=this.parameters[0].filter(function(element){
            return (element.name==item.name)
          })
          this.polarchartData.push(extend.reduce((sum,element)=>sum +parseFloat(element[item.name]),0));

          this.chartData[1]=[this.selectedIds,this.polarchartData,element[0].unit,'polarArea'];
          console.log(this.chartData,"polar");
          this.chartsActive[1]=true;
        }
        this.unit=[];
        for(var parameter of this.selectedparameter[0]){
          if(parameter.name){
          this.bubblechartData[id][parameter.name]=(extend.reduce((sum,element)=>sum +parseFloat(element[parameter.name]),0));
            this.unit.push(this.parameters[0].filter(function(element){
              return (element.name==parameter.name)
            })[0].unit)
          }
          else{
          this.bubblechartData[id][parameter.name]=(extend.reduce((sum,element)=>sum +parseFloat(element[parameter]),0));
            this.unit.push(this.parameters[0].filter(function(element){
              return (element.name==parameter)
            })[0].unit)
          }

        }
        this.tableData[id]=extend;
        // this.chartData.push(this.parsedInfo[id].reduce((sum,element)=>sum +element[item.name],0));
      }
      this.parameters[1]=this.selectedparameter[0];  
      this.generate_data();  
    }
    else{
      this.chartsActive=[false,false];
      this.selectedparameter[1]=[];
    }
           
  }
  emptyChartData(){
    this.selectedparameter[0]=[];
    this.parameters[1]=[];
    this.selectedparameter[1]=[];
    this.tableActive=false;
  }
  onItemSelect(item:any){
    this.selectedIds.push(item.DeviceID);
    this.selectedparameter[0]=[];
    this.tableActive=false;
    this.chartsActive=[false,false];
  }
  onDeSelect(item:any){
    this.selectedparameter[0]=[];   
    this.chartsActive=[false,false];     
    this.selectedIds = this.selectedIds.filter(function(element) { 
      return element !== item.DeviceID
  })
  this.tableActive=false;
  }
  onSelectAll(item:any){
    this.selectedIds=[];
    this.selectedparameter[0]=[]; 
    this.chartsActive=[false,false];   
    this.tableActive=false;   
    item.forEach(element => {
        return this.selectedIds.push(element.DeviceID);
    });;
  }
  onDeSelectAll(item:any){
    this.selectedparameter[0]=[];
    this.chartsActive=[false,false];        
    this.selectedIds=[];
    this.tableActive=false; 
  }






  generate_data(){
    this.x_bubble =  [];
    this.y_bubble = [];
    this.r_bubble = [];
    this.r_bubble_row = [];
    this.data = [];
    this.x_bubble = this.selectedIds;
    for(var parameter of this.selectedparameter[0]){
      this.y_bubble.push(parameter.title);
      for(var divID of this.selectedIds){
        console.log(this.bubblechartData[divID][parameter.name])
        this.r_bubble_row.push(this.bubblechartData[divID][parameter.name]);
        //TODO: define get_r (outputs the total in the given data range)
      }
      this.r_bubble_row=this.normalise(this.r_bubble_row);
      this.r_bubble.push(this.r_bubble_row);
      console.log(this.r_bubble,'r_bubble');
      this.r_bubble_row = [];
      
    }
  
    this.x_index = 0;
    console.log(this.x_bubble,this.y_bubble,'X,y _buuble');
    for(var x_element of this.x_bubble){
      this.y_index = 0;
      for(var y_element of this.y_bubble){
        this.x_data = this.x_index+1;
        this.y_data = this.y_index+1;
        this.r_data = this.r_bubble[this.y_index][this.x_index];
        console.log(this.x_data,this.y_data,this.r_data,'x,y,r _data');
        this.y_index += 1;
        this.data.push({x:this.x_data,y: this.y_data,r :this.r_data});
        console.log(this.data,'data in for loop');
        //TODO: add labels as in x_bubble[y-index], y_bubble[y_index]
      }
      this.x_index += 1;
    }
    this.chartData[0]=[this.y_bubble,this.data,this.selectedIds,'bubble'];  
    console.log(this.chartData,"bubble");
  }
  
  normalise(r_bubble_row){
    var k=r_bubble_row[0];
    for(var temp of r_bubble_row){
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
    var normalised_array = [];
    r_bubble_row.filter(element => {return normalised_array.push(Math.abs(element/normalisation_index))});
    return normalised_array;
  
  }






  dataRise( inputArray : any,properties : any){
    var dates=[]
    if(properties.length==0){
      return dates;
    }
    var firstrowData=inputArray[0];
    var prevRowData=inputArray[0];
    console.log(inputArray,"input i");
    var i=0;
    var lastDay_rowIndex=0;
    for( var row of inputArray){
      i=i+1;
      if(prevRowData['date']!=row['date'] || inputArray.length==i){
        console.log(prevRowData['date'],row['date'],i,lastDay_rowIndex,'here');
        var temp={}
        console.log(properties,"properties i")
        for( var data of properties){
          // var prevData=dates.length?inputArray[lastDay_rowIndex][data.name]:0
          if(data.name.toLowerCase().search("total")==-1){
            temp[data.name]=prevRowData[data.name];
          }
          else{
            temp[data.name]=prevRowData[data.name]-firstrowData[data.name];
          }
          temp["date"]= prevRowData["date"];
        }
        // console.log(temp,prevData,prevRowData,"temp push dates i")
        dates.push(temp);       
        lastDay_rowIndex=i-2;
        firstrowData=row;
      }
    prevRowData = row; 
    }
    // dates.shift()
    console.log(dates,"dates i");
    return dates;
  }

  mergeResult(array1:any,array2:any){
    console.log(array1,array2,"1")
    var mergedArray=[];
    var i=0,j=0;
    if(array2.length==0){
      return array1;
    }
    if(array1.length==0){
      return array2
    }
    var array1_temp = array1;
    var array2_temp = array2;

    var keys1=Object.keys(array1[0]);
    var keys2= Object.keys(array2[0]);
    
    console.log(keys1,keys2,"ss")
    var tempObj={};
    for(var key of keys1){
      tempObj[key]=0;
    }
    array1_temp.push(tempObj);console.log(array1_temp,"2");
    array1 = array1_temp;
    var tempObj2={};
    for(var keyz of keys2){
      tempObj2[keyz]=0;
    }
    array2_temp.push(tempObj2);console.log(array2_temp,"3");
    array2 = array2_temp;
    while(!(array1.length-1==i || array2.length-1==j)){
      if(array1[i].date==array2[j].date){
        mergedArray.push($.extend( array1[i], array2[j] ));
        i=i+1;j=j+1;
      }
      else if(array1[i].date>array2[j].date){
        mergedArray.push($.extend( array1[array1.length-1],array2[j] ));
        debugger;
        j=j+1;
        array1.pop();
        tempObj={};
        for(var key of keys1){
          tempObj[key]=0;
        }

        array1.push(tempObj);
      }
      else{
        mergedArray.push($.extend( array2[array2.length-1],array1[i] ));
        i=i+1;
        array2.pop();
        tempObj2={};
        for(var keyz of keys2){
          tempObj2[keyz]=0;
        }
        array2.push(tempObj2);
      }              
    }    
    if(array1.length-1==i){
      while(array2.length-1>j){ 
        mergedArray.push($.extend( array1[array1.length-1],array2[j] ));
        j=j+1;
        array1.pop();
        tempObj={};
        for(var key of keys1){
          tempObj[key]=0;
        }
        array1.push(tempObj);
      }
    }
    else if(array2.length-1==j){
      while(array1.length-1>i){
        mergedArray.push($.extend( array2[array2.length-1],array1[i] ));
        i=i+1;
        array2.pop();
        tempObj2={};
        for(var keyz of keys2){
          tempObj2[keyz]=0;
        }
        array2.push(tempObj2);
      }

    }
    console.log(mergedArray,"4");
    return mergedArray;
  }

  print(id): void {
    var printContents, popupWin;
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
    <body onload="window.print() , window.close();">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}




