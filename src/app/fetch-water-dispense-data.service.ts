import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {waterDispenserParam,chartData} from './water-dispense/waterDispenserparam'
import {Cluster} from './Clusters'
import {catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import {Users,Token} from './users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FetchWaterDispenseDataService {

  private url = 'http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php/';
  // private url = 'http://localhost:8000/assets/Php/';
  // private url = '/iiot/assets/Php/';
  
  cluster: string;
  id : string;
  constructor(private http : HttpClient,private cookieService : CookieService,private router : Router) {

   }

  //  All the function recieves data in the form of json and asynchoronously using observable

  // get basic data of all the tables 
  getData(id,table,filename) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id[0]);
    data.append('table',table);
    data.append('operatorId',id[1]);
    data.append('date',id[2]);
    console.log(id,table);
    return this.http.post<waterDispenserParam[]>(this.url+filename,data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }
  // All the data corresponding to configuration table is requested through this post request , call from 'settings component'
  getConfigData(filename) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    // data.append('table',table);
    return this.http.post<waterDispenserParam[]>(this.url+filename,data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }
  // calls from transaction component, recieves all the data for requested division
  getData_trans_params(id,table,filename,tor,fromDate,toDate) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id[0]);
    data.append('table',table);
    data.append('operatorId',id[1]);
    data.append('date',id[2]);
    data.append('tor',tor);
    data.append('fromDate',fromDate);
    data.append('toDate',toDate);
    return this.http.post<waterDispenserParam[]>(this.url+filename,data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }

  // Used to recieve location of device from 'Device_Data' Cluster
  getLocation(id,clusterName) : Observable<waterDispenserParam[]>{
    // Sending data in post request as formdata(id,cluster.tablename)
    let data = new FormData();
    data.append('id',id);
    data.append('cluster',clusterName);
    data.append('table','Device_Data');
    return this.http.post<waterDispenserParam[]>(this.url+'location.php',data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }
  // Used to recieve all the ids related to one particular cluster, call from (search devices component)
  getIds(id:string,cluster: string,table: string):Observable<Cluster[]>{
    let term = new FormData();
    if(!id.trim()&&table=='Device_Data'){
      return of([])
    } 
    // hint : the letter which are typed in
    term.append('hint',id);
    term.append('cluster',cluster);
    term.append('table',table);
    return this.http.post<Cluster[]>(this.url+'ids.php',term)
  }
  // This function collects data related to charts from start date to last date 
  getChartData(filename,id,table,from,to): Observable<waterDispenserParam[]>{
    // post all required information id,tablename,date1,date2
    let chartData = new FormData();
    chartData.append('id',id);
    chartData.append('table',table);
    chartData.append('from',from);
    chartData.append('to',to);
    return this.http.post<waterDispenserParam[]>(this.url + filename,chartData).pipe(
      catchError(this.handleError('getIds',[]))
      
    );
  }

  // This checks whether the user is authorised or not ; recieves form data from authentication form ( Call in app.component.ts)
  userAuthentication(form,filename):Observable<Users[]>{
    return this.http.post<Users[]>(this.url+filename,form,{withCredentials:true}).pipe(
      catchError(this.handleError('userAuthentication',[]))
      
    );
  }
  // This function is used to get session data(primarily jwt token) from session.php 
  getSessionVariables(filename):Observable<Token[]>{
    return this.http.get<Token[]>(this.url+filename,{withCredentials:true}).pipe(
      catchError(this.handleError('getSessionVariables',[])) 
    );
  }

  // Handles Error of service , if there is some problem it log it down
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
