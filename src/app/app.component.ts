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
    if(this.cookieService.get('PHPSESSID')){
      $('#id01').css({"display":"none"});
      this.locating=true;
      $('html').css({"overflow-y":"auto"});
      $('body').css({"background":"url('') #222"})
      setTimeout(() => {
        this.timeout = false; 
      }, 3000);
      this.service.getSessionVariables('session.php/?action=start').subscribe(session_var=>this.session_variable=session_var,(err)=>console.log(err),()=>{
        if(this.session_variable.JWTtoken){
          this.global.token= this.session_variable.JWTtoken;
          if(this.jwtHelper.isTokenExpired(this.global.token)){
            this.cookieService.put('PHPSESSID','');
          }
          this.global.user = this.jwtHelper.decodeToken(this.global.token);
          if(this.global.user["0"].Username=='Admin'){
            this.global.admin= true;
          }
          console.log(this.global.user);
          this.storage.set("user",this.global.user["0"]); 
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
    this.service.userAuthentication(form,'users.php').subscribe(users=>this.users=users,(err)=>console.log(err),()=>{
        if(this.users){
          console.log(this.users);
          this.locating=true;
          $('html').css({"overflow-y":"auto"});
          $('#id01').css({"display":"none"});     
          $('body').css({"background":"url('') #222"});
          this.global.token= this.users.jwttoken;
          console.log(this.global.token,this.users.jwttoken);
          this.global.user = this.jwtHelper.decodeToken(this.global.token);
          console.log(this.jwtHelper.decodeToken(this.global.token));
          // console.log(this.global.user);
          if(this.global.user["0"].Username=='Admin'){
            this.global.admin= true;
          }
          this.storage.set("user",this.global.user["0"]);
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
        else{
          this.cookieService.put('message','Authentication Failure');
        }
      
    });
  }
  deleteCookie(){
    this.cookieService.removeAll();
  }

}


