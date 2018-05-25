import { Component, OnInit } from '@angular/core';
import {  Router,NavigationEnd, ActivationStart,ActivatedRoute} from '@angular/router'

import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  id = [];
  location : string = this.cookieService.get('location');
  place : string = '404 #Not_Found';
  constructor(private cookieService:CookieService, private route: ActivatedRoute) {
    this.id[0] = route.snapshot.paramMap.get('id'); 
   }

  ngOnInit() {
  }

}
