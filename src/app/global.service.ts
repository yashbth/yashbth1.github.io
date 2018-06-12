import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Dropdown} from './machine/dropdown'

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
  constructor(private router : Router) { }
  setVar(lat,lon):void{
    this.lat=lat;
    this.lon=lon;
  }
  isAllowed(cluster,panel,id){
    for ( var dropdown of this.DropDown ){
      if(dropdown['id']==panel){
        if(this.user["0"][cluster]=='0' || this.user["0"][dropdown['division']]=='0'){
          this.router.navigateByUrl('/'+cluster+'/'+id +'/error')
        }
      }
    }

  }
}
