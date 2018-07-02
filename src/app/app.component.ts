import { Component, OnInit,Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from './global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';


declare var  $ : any;
declare var myMap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  timeout : boolean = true;
  message_failure :string;
  router : any;
  username : string;
  password: string;
  jwtHelper = new JwtHelperService();
  users : any;
  date = new Date();
  session_variable:any;
  locating:boolean=false;
  constructor(private _router : Router,private service: FetchWaterDispenseDataService,private global : GlobalService,private cookieService: CookieService,@Inject(SESSION_STORAGE) private storage : StorageService){
    this.router = _router;
  }
  ngOnInit(){
    // if PHPSESSID is present don't request for authentication
    if(this.cookieService.get('PHPSESSID')){
      $('#id01').css({"display":"none"});
      // Loading animation comes
      this.locating=true;
      $('body').css({"background":"url('') #222"})
      setTimeout(() => {
        this.timeout = false; 
      }, 3000);
      // requesting session variable jwttoken sing session.php
      this.service.getSessionVariables('session.php/?action=start').subscribe(session_var=>this.session_variable=session_var,(err)=>console.log(err),()=>{
        // if jwttoken exist and not expired it decodes it and request for map on machines from map.js
        if(this.session_variable.JWTtoken){
          this.global.token= this.session_variable.JWTtoken;
          // if jwt token expired redirect to swajal.in
          if(this.jwtHelper.isTokenExpired(this.global.token)){
            this.cookieService.put('PHPSESSID','');
            window.location.href= 'https://swajal.in/iiot';
          }
          this.global.user = this.jwtHelper.decodeToken(this.global.token);
          if(this.global.user["0"].Username=='Admin'){
            this.global.admin= true;
          }
          // setting privledges in local storages
          this.storage.set("user",this.global.user["0"]); 
          // machines on map from (map.js)
          myMap();         
        }
        else{
          this.cookieService.removeAll();
        }
      });
    }

 
    
  }

  requestAuth(){    
    let form = new FormData();
    form.append('uname',this.username);
    form.append('psw',this.password);   
    //  Calls users.php to check if user is authorized or not and recieves all the priveledgesgiven to it
    this.service.userAuthentication(form,'users.php').subscribe(users=>this.users=users,(err)=>console.log(err),()=>{
      // if authentication is successful
        if(this.users){
          console.log(this.users);
          // shows loading and hide authentication display
          this.locating=true;
          $('#id01').css({"display":"none"});     
          $('body').css({"background":"url('') #222"});
          // recieves jwt token and decode it to get privledges of user
          this.global.token= this.users.jwttoken;
          this.global.user = this.jwtHelper.decodeToken(this.global.token);
          // console.log(this.global.user);
          if(this.global.user["0"].Username=='Admin'){
            this.global.admin= true;
          }
          // setting privledges in local storage for latter use of them without authentication
          this.storage.set("user",this.global.user["0"]);
          // Calling myMap function from map.js
          myMap();
          setTimeout(()=>{
            if(this.global.user["0"][this.cookieService.get('cluster')]==0){
              $('#message_failure').html('<div class="alert alert-danger" style="justify-content: center; text-align: center;margin-bottom:0px"><span style="justify-content: center">Access Denied!</span></div>');           
            } 
            else{
              $('#message_failure').html('');
              setTimeout(() => {
                this.timeout = false; 
              }, 3000);                    
            }           
          },1000);
        }
        // if authentication fails message throught cookie
        else{
          this.cookieService.put('message','Authentication Failure');
        }
      
    });
  }
  // Delete All Cookie
  deleteCookie(){
    this.cookieService.removeAll();
  }

}


