import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  lat: number;
  lon:number;

  constructor() { }
  setVar(lat,lon):void{
    this.lat=lat;
    this.lon=lon;
  }
}
