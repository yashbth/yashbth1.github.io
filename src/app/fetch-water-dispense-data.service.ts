import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {waterDispenserParam} from './water-dispense/waterDispenserparam'
import {Data} from './water-dispense/test'

let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
@Injectable({
  providedIn: 'root'
})
export class FetchWaterDispenseDataService {
  private url = 'http://localhost:8080/testfile.php';
  
  constructor(private http : HttpClient) {
   }

  getData(id) : Observable<waterDispenserParam[]>{
    let data = new FormData();
    data.append('id',id);
    console.log(data);
    return this.http.post<waterDispenserParam[]>(this.url,data);
   
  }
}
