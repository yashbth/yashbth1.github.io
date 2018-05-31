import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {waterDispenserParam,chartData} from './water-dispense/waterDispenserparam'
import {Cluster} from './delhiCluster'
import {catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FetchWaterDispenseDataService {

  // private url = 'http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php/';
  private url = 'http://localhost:8000/assets/Php/';
  // private url = '/iiot/assets/Php/';
  
  cluster: string;
  id : string;
  
  constructor(private http : HttpClient,private cookieService : CookieService,private router : Router) {

   }

  getData(id,table,filename) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id[0]);
    data.append('table',table);
    data.append('operatorId',id[1]);
    data.append('date',id[2]);
    return this.http.post<waterDispenserParam[]>(this.url+filename,data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }
  getLocation(id,clusterName) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id);
    data.append('cluster',clusterName);
    data.append('table','Device_Data');
    return this.http.post<waterDispenserParam[]>(this.url+'location.php',data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }
  getIds(id:string,table: string):Observable<Cluster[]>{
    let term = new FormData();
    if(!id.trim()){
      return of([])
    }
    console.log(table);
    term.append('hint',id);
    term.append('table',table);
    return this.http.post<Cluster[]>(this.url+'ids.php',term)
  }
  getChartData(filename,id,table,from,to): Observable<waterDispenserParam[]>{
    let chartData = new FormData();
    chartData.append('id',id);
    chartData.append('table',table);
    chartData.append('from',from);
    chartData.append('to',to);
    return this.http.post<waterDispenserParam[]>(this.url + filename,chartData).pipe(
      catchError(this.handleError('getIds',[]))
      
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.

      return of(result as T);
    };
  }
}
