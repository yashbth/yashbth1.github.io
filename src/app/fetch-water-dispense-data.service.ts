import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {waterDispenserParam} from './water-dispense/waterDispenserparam'
import {Device} from './water-dispense/test'
import { catchError, map, tap } from 'rxjs/operators';
let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
@Injectable({
  providedIn: 'root'
})
export class FetchWaterDispenseDataService {

  private url = 'http://localhost:8080/';

  
  constructor(private http : HttpClient) {
   }

  getData(id,filename) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id[0]);
    data.append('operatorId',id[1]);
    return this.http.post<waterDispenserParam[]>(this.url+filename,data).pipe(
      catchError(this.handleError('getData',[]))
    );
  }
  getIds(id:string):Observable<Device[]>{
    let term = new FormData();
    if(!id.trim()){
      return of([])
    }
    term.append('hint',id);
    return this.http.post<Device[]>(this.url+'ids.php',term).pipe(
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
