import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var  $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  timeout : boolean = true;
  router : any;
  constructor(private _router : Router){
    this.router = _router;
  }
  ngOnInit(){
    setTimeout(() => {
      this.timeout = false;
      $('#map').css({"visibility":"visible"}); 
    }, 5000);
    
  }

}
