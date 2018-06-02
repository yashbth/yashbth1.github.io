import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { CookieService } from 'angular2-cookie/core';
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
  username : string;
  password: string;
  users :any;
  url='http://localhost:8000/assets/Php/users.php';
  constructor(private _router : Router,private service: FetchWaterDispenseDataService,private cookieService: CookieService){
    this.router = _router;
  }
  ngOnInit(){
    setTimeout(() => {
      this.timeout = false;
      $('#map').css({"visibility":"visible"}); 
    }, 5000);
    this.cookieService.removeAll();
  }
  requestAuth(){    
    let form = new FormData();
    form.append('uname',this.username);
    form.append('psw',this.password);   
    
    this.service.userAuthentication(form,'users.php').subscribe(users=>this.users=users,(err)=>console.log(err),()=>{
        if(this.users){
          setTimeout(()=>{
            $('#id01').css({"display":"none"});                 
            window.location.href = window.location.href + this.cookieService.get('cluster')+'/'+this.cookieService.get('id')+'/WaterDispenser';     
          },1000);

        }
        else{
          this.cookieService.put('message','Authentication Failure');
        }
      
    });
  }
}
