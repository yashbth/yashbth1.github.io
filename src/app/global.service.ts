import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Dropdown} from './machine/dropdown'
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  lat: number;
  lon:number;
  showSearchResult : boolean =false;
  user: any;
  token: any;
  DropDown = Dropdown; // side navigation divisions
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
  
  // function which takes an array as input and gives the difference in property for a respective day
  dataRise( inputArray : any,properties : any){
    var dates=[]
    if(properties.length==0){
      return dates;
    }
    var firstrowData=inputArray[0];
    var prevRowData=inputArray[0];
    var i=0;
    var lastDay_rowIndex=0;
    // iterates for each row of data
    for( var row of inputArray){
      i=i+1;
      // checks if there is change in date  or data point is last one, if yes then subtract last data point from first data point of that date
      if(prevRowData['date']!=row['date'] || inputArray.length==i){
        var temp={}
        //  Iterates over each property that has been given as input 
        for( var data of properties){
          // var prevData=dates.length?inputArray[lastDay_rowIndex][data.name]:0
          // checks for keyword 'total' if present subtract last from first else return last entry
          if(data.name.toLowerCase().search("total")==-1){
            temp[data.name]=prevRowData[data.name].replace(",","");
          }
          else{
            temp[data.name]=(prevRowData[data.name].replace(",","")-firstrowData[data.name].replace(",","")).toFixed(2);
          }
          temp["date"]= prevRowData["date"]; // setting date 
        }
        dates.push(temp);    // pushing subtracted values or required values in dates array    
        lastDay_rowIndex=i-2;
        firstrowData=row;
      }
    prevRowData = row; 
    }
    return dates; // return dates array with cummulative property(last-first) for no of dates
  }


}
