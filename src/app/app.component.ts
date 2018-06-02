import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from './global.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
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
  users : any;
  date = new Date();
  url='http://localhost:8000/assets/Php/users.php';
  constructor(private _router : Router,private service: FetchWaterDispenseDataService,private global : GlobalService,private cookieService: CookieService,@Inject (SESSION_STORAGE) private storage :StorageService){
    this.router = _router;
  }
  ngOnInit(){
    setTimeout(() => {
      this.timeout = false;
      $('#map').css({"visibility":"visible"}); 
    }, 5000);
    this.date.setHours(this.date.getHours()+1);
    this.cookieService.put('token',this.storage.get('user').token);
  }
  requestAuth(){    
    let form = new FormData();
    form.append('uname',this.username);
    form.append('psw',this.password);   
    this.service.userAuthentication(form,'users.php').subscribe(users=>this.users=users,(err)=>console.log(err),()=>{
        if(this.users){
          this.storage.set('user',this.users);
          setTimeout(()=>{
            $('#id01').css({"display":"none"});                 
            window.location.href = window.location.href + this.cookieService.get('cluster')+'/'+this.cookieService.get('id')+'/WaterDispenser';     
          },1000);

        }
        else{
          this.cookieService.put('message','Authentication Failure',{expires:this.date});
        }
      
    });
  }
}
