import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
declare var jquery : any;
declare var $ : any;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css','./loading.map.css']
})
export class LoadingComponent implements OnInit {
  @Input () timeout : boolean;
  constructor( private router :Router) { }

  ngOnInit() {
    
  }

}
