import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {waterDispenserParam} from './water-dispense/waterDispenserparam'
@Injectable({
  providedIn: 'root'
})
export class FetchWaterDispenseDataService {
  private url = 'localhost:8080/test.php'
  constructor(private http : HttpClient) { }
  getData() : Observable<waterDispenserParam[]>{
    return this.http.get<waterDispenserParam[]>(this.url);
  }
}
