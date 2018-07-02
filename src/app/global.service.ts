import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Dropdown} from './machine/dropdown'
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  lat: number;
  lon:number;
  showSearchResult : boolean =false;
  user: any;
  token: any;
  DropDown = Dropdown;
  admin : boolean;
  clusters : any;
  panel : string;
  id: string;
  cluster :string;
  constructor(private router : Router,private cookieService : CookieService,private route : ActivatedRoute) {
   }
  setVar(lat,lon):void{
    this.lat=lat;
    this.lon=lon;
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
        console.log(properties,"propertiess i")
        for( var data of properties){
          // var prevData=dates.length?inputArray[lastDay_rowIndex][data.name]:0
          if(data.name.toLowerCase().search("total")==-1){
            temp[data.name]=prevRowData[data.name].replace(",","");
          }
          else{
            temp[data.name]=(prevRowData[data.name].replace(",","")-firstrowData[data.name].replace(",","")).toFixed(2);
          }
          temp["date"]= prevRowData["date"];
        }
        console.log(temp,"temp push dates i");
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
}
