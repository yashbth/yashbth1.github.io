import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Dropdown} from './machine/dropdown'
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';

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
  panel : string;
  id: string;
  cluster :string;
  constructor(private router : Router,private cookieService : CookieService,private route : ActivatedRoute) {
   }
  setVar(lat,lon):void{
    this.lat=lat;
    this.lon=lon;
  }
  

}
