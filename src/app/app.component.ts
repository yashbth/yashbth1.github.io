import { Component, OnInit,DoCheck,Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from './global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  message_failure :string;
  router : any;
  username : string;
  password: string;
  jwtHelper = new JwtHelperService();
  users : any;
  date = new Date();
  session_variable:any;
  constructor(private _router : Router,private service: FetchWaterDispenseDataService,private global : GlobalService,private cookieService: CookieService,@Inject(SESSION_STORAGE) private storage : StorageService){
    this.router = _router;
  }
  ngOnInit(){
    if(this.cookieService.get('PHPSESSID')){
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
          this.storage.set("user",this.global.user["0"]);          
        }
        else{
          this.cookieService.removeAll();
        }
      });
    }
    setTimeout(() => {
      this.timeout = false;
      $('#map').css({"visibility":"visible"}); 
    }, 5000);
 
    
  }

  requestAuth(){    
    let form = new FormData();
    form.append('uname',this.username);
    form.append('psw',this.password);   
    this.service.userAuthentication(form,'users.php').subscribe(users=>this.users=users,(err)=>console.log(err),()=>{
        if(this.users){
          this.session_variable=[];
          this.service.getSessionVariables('session.php/?action=start').subscribe(session_var=>this.session_variable=session_var,(err)=>console.log(err),()=>{
            this.global.token= this.session_variable.JWTtoken;
            this.global.user = this.jwtHelper.decodeToken(this.global.token);
            if(this.global.user["0"].Username=='Admin'){
              this.global.admin= true;
            }
            this.storage.set("user",this.global.user["0"]);
            setTimeout(()=>{
              $('#id01').css({"display":"none"});     
              if(this.global.user["0"][this.cookieService.get('cluster')]==0){
                $('#message_failure').html('<div class="alert alert-danger" style="justify-content: center; text-align: center;margin-bottom:0px"><span style="justify-content: center">Access Denied!</span></div>');           
              } 
              else{
                $('#message_failure').html('');
                window.location.href = window.location.href + this.cookieService.get('cluster')+'/'+this.cookieService.get('id')+'/WaterDispenser';                     
              }           
            },1000);
          });
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
