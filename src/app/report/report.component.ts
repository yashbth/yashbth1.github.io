import { Component, OnInit ,AfterContentChecked} from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Cluster } from '../Clusters';
import {Sales} from './report';
import { filter, mergeMap } from 'rxjs/operators';
import {Property,dropdowntableSettings, charts, dropdownpolarSettings} from '../users';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'
import { GlobalService } from '../global.service';
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';
import { Router } from '@angular/router';


declare var $:any;
declare var tableExport : any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  title: string= "Welcome To Dashboard";
  addInfo = new Date().toUTCString().slice(0,17); // Date in jumbotron part
  from:any=new Date();
  to =new Date().toISOString().slice(0,10);
  cluster : string="Select Cluster";
  ids: any;
  id: any;
  isActive:boolean;
  tableActive:boolean; 
  specialtableActive:boolean;
  cummlativetableActive:boolean;
  chartsActive=[false,false];
  selectedIds=[]; // Ids which are selected from dropdown
  info =[];
  dataAvailable : boolean;
  dates =[];
  parsedInfo=[];// Array to store information for different ids
  tableData=[];// stores data for tables
  sales=Sales;
  dropdowntableSettings=dropdowntableSettings;// dropdown's setting available in user.ts file
  charts =charts // Type of charts in user.ts file
  tables=['WaterDispenseData','RoData','CupDispenseData','supervisorData','operator']  
  dropdown1=[];
  dropdown2=[];
  parameters=[this.dropdown1,this.dropdown2]; // first array contains all the properties in dropdown while second one are the selected(or checked ones)
  selDrop1=[];
  selDrop2=[];
  selectedparameter =[this.selDrop1,this.selDrop2]; // first array contains all selected  properties of multiple selected dropdown while second one are the single selected dropdown(or checked ones)
  unit = [];
  data = [];  
  bubblechartData=[];
  polarchartData=[];
  chartData=[];  
  request =[];
  button:string='report';
  // generate_data variables
  x_bubble =  [];
  y_bubble = [];
  r_bubble = [];
  r_bubble_row = [];
  x_index : number;
  y_index: number;

  x_data : number;
  y_data: number;
  r_data: number;

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster,private global : GlobalService,private cookieService : CookieService,private router : Router ) { }

  ngOnInit() {  
    this.from.setDate(this.from.getDate()-7);
    this.from=this.from.toISOString().slice(0,10);
    for (var table of this.tables){
      var i=0;
      //create obj of each property avialable for charts and push them into parameters array
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
    // if user is not authorised to use report panel, navigate to error page and set cookie for access denied
    if(this.global.user["0"]['Analysis_Panel']=="0" ){
      var time = new Date();
      time.setSeconds(time.getSeconds() + 5);
      let opts: CookieOptionsArgs = {
        expires: time
      };
      this.cookieService.put("access_denied","Access Denied!",opts);
      this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')             
    }
  }

// Function which requests data for charts and table for selected properties
generateReport(onlyreport,button){
  this.request=[];    
  // for each table push a request into an array request
  for(var t of this.tables){
  var table = this.Cluster[this.cluster][t][3]; 
    this.request.push(this.service.getChartData('report.php',this.selectedIds,table,this.from,this.to));
  }
  // Request all the requests asynchronously one by one
  forkJoin(this.request).subscribe(info=>this.info=info,(err)=>console.log(err),()=>{
    // For each id separate the data and clubbed according to ids
      for( var id of this.selectedIds){
        this.parsedInfo[id]=[];        
        this.bubblechartData[id]=[];  
        for(var i=0;i<5;i++){ 
          this.parsedInfo[id][i]=this.info[i].filter(function(element){
            return (element["DeviceID"]==id);
        })
      } 
    }
    // calls setChartData function to do calculation on data obtained
    this.setChartData(this.selectedparameter[0],2);
    // if report button is clicked show only reports, else show charts
    if(onlyreport){
      // in case of special table set specialtable visible
      if(button=='report'){
        this.tableActive= true;
        this.specialtableActive=false ;
        this.cummlativetableActive=false;
      }
      else if (button=='specialreport'){
        this.tableActive= false;
        this.specialtableActive=true;
        this.cummlativetableActive=false;
      }
      else{
        this.tableActive= false;
        this.specialtableActive=false ;
        this.cummlativetableActive=true;
      }
      $('html').css({"height":"auto"});
    }
    else{
      this.dataAvailable= true;           
      this.chartsActive[0]=true;
    }
  })
}

// Get Ids particular to the selected cluster
getIds(){ 
  this.service.getIds('',this.cluster,'').subscribe(ids=>this.ids=ids,(err)=>this.ids=[],()=>{
  this.ids.forEach(element => {
    element['dropdownText']= element.Location +" : ("+element.DeviceID+")";
  });
  this.isActive=true;                     
  });
}

ngAfterContentChecked(){
  this.parameters[1]=this.selectedparameter[0];
  if(!this.chartsActive[0] && (!this.tableActive && !this.specialtableActive && !this.cummlativetableActive) ){
   $('html').css({"height":"100%"});      
  } 
  else{
    $('html').css({"height":"auto"});
  } 
}

// Format Data for charts and table
setChartData(item : any,chart){
  // chart parameter decides whether it is bubble chart or polar chart, 1=polarchart
  if(chart==1||chart==2){
    this.polarchartData=[];
    for (var id of this.selectedIds){
      var temp=[];
      var extend=[]; 
      var prop=[] 
      var i=0;    
      for(var table of this.tables){
        // for each table separate data acc. to table 
        prop[table]=this.selectedparameter[0].filter((element,index,option)=>{
          return ((this.Cluster[this.cluster][table][0].indexOf(element.name))>=0)
        })
        // saves the cummulative data for a date for all the dates present
        temp[table]=this.dataRise(this.parsedInfo[id][i],prop[table]);
        // merging of temp arrays from different tables to make a one complete array of all properties with dates
        if(extend.length!=0){
          extend=this.mergeResult(extend,temp[table]); 
        }
        else{
          extend= temp[table];
        }
        i=i+1; 
      }
      // if chart is polar
      if(chart==1){
        // select obj for which polarchart has to be created
        var element=this.parameters[0].filter(function(element){
          return (element.name==item.name)
        })
        // Sums all the cumulative data for the date range
        this.polarchartData.push(extend.reduce((sum,element)=>sum +parseFloat(element[item.name]),0));
        // creates chart element by sending data to analysis chart component
        this.chartData[1]=[this.selectedIds,this.polarchartData,element[0].unit,'polarArea'];
        this.chartsActive[1]=true;
      }
      // sets bubble chart data with units
      this.unit=[];
      for(var parameter of this.selectedparameter[0]){
        // if textfield and id field is same, parameter will no longer be a object so if else condition
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

//Dropdown on click options/events
emptyChartData(){
  this.selectedparameter[0]=[];
  this.parameters[1]=[];
  this.selectedparameter[1]=[];
  this.tableActive=false;
}
// on selecting push element in selected parameter array and charts & tables should become invisible in case of changing properties
onItemSelect(item:any){
  this.selectedIds.push(item.DeviceID);
  this.selectedparameter[0]=[];
  this.tableActive=false;
  this.chartsActive=[false,false];
}
// on deselecting pop element in selected parameter array  and chart & tables should become invisible in case of changing properties
onDeSelect(item:any){
  this.selectedparameter[0]=[];   
  this.chartsActive=[false,false];     
  this.selectedIds = this.selectedIds.filter(function(element) { 
    return element !== item.DeviceID
})
this.tableActive=false;
}
// on selecting push all elements in selected parameter array
onSelectAll(item:any){
  this.selectedIds=[];
  this.selectedparameter[0]=[]; 
  this.chartsActive=[false,false];   
  this.tableActive=false;   
  item.forEach(element => {
      return this.selectedIds.push(element.DeviceID);
  });;
}
// on selecting push element in selected parameter array
onDeSelectAll(item:any){
  this.selectedparameter[0]=[];
  this.chartsActive=[false,false];        
  this.selectedIds=[];
  this.tableActive=false; 
}


// Special Table sums total sale for a day
getSale(i){
  let sale=0;
  for(let id of this.selectedIds){
    sale=sale+ parseInt(this.tableData[id][i]['Total_Collection_Sale']);
  }
  return sale;
}
// Cummlative Sum of property for date range
getCummlativeData(id,property){
  let sum=0;
  for(let row of this.tableData[id]){
    console.log(property.name.indexOf('total'));
    if(property.name.toLowerCase().indexOf('total')!=-1){
      sum=sum+parseInt(row[property.name]);
    }
    else{
      sum=row[property.name];
    }
  }
  return sum;
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
    //for each selected deviceId sets data into a larger array and normalise the data 
    for(var divID of this.selectedIds){
      this.r_bubble_row.push(this.bubblechartData[divID][parameter.name]);
    }
    this.r_bubble_row=this.normalise(this.r_bubble_row);
    // Normalise data set into r_bubble array for each parameter
    this.r_bubble.push(this.r_bubble_row);
    this.r_bubble_row = [];
    
  }

  this.x_index = 0;
  // Sets bubble chart data (normalised form and position of data point on chart)
  for(var x_element of this.x_bubble){
    this.y_index = 0;
    for(var y_element of this.y_bubble){
      this.x_data = this.x_index+1;
      this.y_data = this.y_index+1;
      this.r_data = this.r_bubble[this.y_index][this.x_index];
      this.y_index += 1;
      this.data.push({x:this.x_data,y: this.y_data,r :this.r_data});

    }
    this.x_index += 1;
  }
  // Setting chartData for bubble chart
  this.chartData[0]=[this.y_bubble,this.data,this.selectedIds,'bubble'];  

}

// Normalise function normalise the radius of bubble data point
normalise(r_bubble_row){
  var k=r_bubble_row[0];
  for(var temp of r_bubble_row){
    // find the max of array
    if(temp>k){
      k = temp;
    }
  }
  // sets normalisation index to 1 if k=0 otherwise max radius is 25px;
  if(k==0){
    var normalisation_index = 1;
  }
  else{
    var normalisation_index = k/25;    
  }
  var normalised_array = [];
  // For each element in r_bubble_row push normalisedvalue in normalised_array
  r_bubble_row.filter(element => {return normalised_array.push(Math.abs(element/normalisation_index))});
  return normalised_array;
}





// Refer in global.service.ts 
dataRise( inputArray : any,properties : any){
  var dates=[]
  if(properties.length==0){
    return dates;
  }
  var firstrowData=inputArray[0];
  var prevRowData=inputArray[0];
  var i=0;
  var lastDay_rowIndex=0;
  for( var row of inputArray){
    i=i+1;
    if(prevRowData['date']!=row['date'] || inputArray.length==i){
      var temp={}
      for( var data of properties){
        if(data.name.toLowerCase().search("total")==-1){
          temp[data.name]=prevRowData[data.name].replace(",","");
        }
        else{
          temp[data.name]=(prevRowData[data.name].replace(",","")-firstrowData[data.name].replace(",","")).toFixed(2);
        }
        temp["date"]= prevRowData["date"];
      }
      dates.push(temp);       
      lastDay_rowIndex=i-2;
      firstrowData=row;
    }
  prevRowData = row; 
  }
  return dates;
}
// Merging two arrays with json objects as row 
mergeResult(array1:any,array2:any){
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

  var keys1=Object.keys(array1[0]);// keys of two arrays
  var keys2= Object.keys(array2[0]);
  var tempObj={};
  // making temporary associative arrays with key names as above
  for(var key of keys1){
    tempObj[key]=0;
  }
  array1_temp.push(tempObj);
  array1 = array1_temp;
  var tempObj2={};
  // making temporary associative arrays with key names as above
  for(var keyz of keys2){
    tempObj2[keyz]=0;
  }
  array2_temp.push(tempObj2);
  array2 = array2_temp;
  // Looping untill dates in one of the arrays is over( going date wise in both arrays)
  while(!(array1.length-1==i || array2.length-1==j)){
    // Checking whether the row has  same date
    if(array1[i].date==array2[j].date){
      mergedArray.push($.extend( array1[i], array2[j] ));
      i=i+1;j=j+1;
    }
    // Checking whether the row of array1 has date higher than date of array2 then merge array1's last element to array2
    else if(array1[i].date>array2[j].date){
      mergedArray.push($.extend( array1[array1.length-1],array2[j] ));
      j=j+1;
      array1.pop();// poping last element and then again pushing another element
      tempObj={};
      for(var key of keys1){
        tempObj[key]=0;
      }

      array1.push(tempObj);
    }
    // Similar to above case ,but now merge array2's last element to array1
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
  // if one of the array finished first merge the array with last element of other array 
  if(array1.length-1==i){
    while(array2.length-1>j){ 
      mergedArray.push($.extend( array1[array1.length-1],array2[j] ));
      j=j+1;
      array1.pop();// poping last element and then again pushing another element
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
  return mergedArray;
}

// Print function to print table using id of table
print(id): void {
  var printContents, popupWin;
  printContents = document.getElementById(id).innerHTML; // element ot be selected for printing
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




