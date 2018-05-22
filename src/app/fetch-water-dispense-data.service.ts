import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {waterDispenserParam} from './water-dispense/waterDispenserparam'

let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
@Injectable({
  providedIn: 'root'
})
export class FetchWaterDispenseDataService {

  private url = 'http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php/';

  
  constructor(private http : HttpClient) {
   }

  getData(id,filename) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id);
    return this.http.post<waterDispenserParam[]>(this.url+filename,data);
   
  }
}
