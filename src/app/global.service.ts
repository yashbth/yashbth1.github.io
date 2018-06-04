import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  lat: number;
  lon:number;
  showSearchResult : boolean =false;
  user: any;
  token: any;
  constructor(private router : Router) { }
  setVar(lat,lon):void{
    this.lat=lat;
    this.lon=lon;
  }
  isAllowed(cluster,panel,id){
    if(!this.user["0"][cluster] || !this.user["0"][panel]){
      this.router.navigateByUrl('/'+cluster+'/'+id +'/error')
    }
  }
}
