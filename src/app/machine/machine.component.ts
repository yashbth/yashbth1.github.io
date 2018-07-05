import { Component, OnInit,AfterContentChecked ,DoCheck,HostListener,Inject} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router'
import { Dropdown } from './dropdown'
import {CookieService,CookieOptionsArgs} from 'angular2-cookie/core'
import '../../assets/scripts/collapse.js'
import { GlobalService } from '../global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Location } from '@angular/common';
import {SESSION_STORAGE , StorageService} from 'angular-webstorage-service'
import { Cluster} from '../Clusters'

declare var jquery:any;
declare var $ :any;
declare var check : any; 
declare function class12() : any;
declare function class3_9() : any;

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit{
  user : any;
  title = 'DASHBOARD';
  param=[];
  url:string;
  id:string;
  dropdownlist = Dropdown; // list of navbar options
  currDiv: string;
  cluster: string;
  jwtHelper = new JwtHelperService();// service used to decode jwt token
  session_variable  : any; // Session Variables like jwt token
  privledges : boolean= true; // Priveldeged to particular cluster
  message_failure: string;
  
  constructor(private router : Router,private cookieService : CookieService,private route : ActivatedRoute,
    private global :GlobalService,private service : FetchWaterDispenseDataService,private location: Location,
    @Inject(SESSION_STORAGE) private storage : StorageService,private Cluster: Cluster) {}

  ngOnInit(){  

    $('html').css({"overflow-y":"auto"});
    // If no User Info is found navigate back to map after 5s
    setTimeout(()=>{
      if(!this.user){
        window.location.href='https://swajal.in/iiot';
      }
    },5000);    
  }
  // Logout User Session and navigate to map
  logout(){
    this.service.getSessionVariables('session.php/?action=destroy').subscribe(session_var=>this.session_variable=session_var,(err)=>console.log(err),()=>{ // Destroys Session information
      this.cookieService.removeAll(); // remove Cookies
      this.storage.remove("user"); // Remove User info
      window.location.href= 'https://swajal.in/iiot/'; // navigation to map
    })

  }
  // Mobile size Toggle of settings icon
  settingToggle(){
    $('.Settings').slideToggle();    
  }
  // Hide different elements in mobile size webpage ( mainly vertical navbar elements)
  hide(){
    if(window.innerWidth<600){
      $('#verticalCollapse').removeClass('col-sm-3');
      $('.verticalNav').animate({zIndex:-1,opacity:"0"},600);
      $('#verticalCollapse').animate({maxWidth:"0%"},500);
      setTimeout(()=>{
        class12();
      },500)             
      check = false;
    }
  }

// Toggling of vertical navbar in lower window size webpages
  toggle(){
      if(check){    
        $('#verticalCollapse').removeClass('col-sm-3');
        $('.verticalNav').animate({opacity:"0"},600);
        $('#verticalCollapse').animate({maxWidth:"0%"},500);
        setTimeout(()=>{
          class12();
        },500)             
        check = false;
      } 
      else {
        class3_9(); 
        $('.verticalNav').animate({opacity:"1"},1000);
        $('#verticalCollapse').animate({maxWidth:"100%"},500);
        if(window.innerWidth<600){
          $('#h3').css({"fontSize":"3vw"});
          $('h6').css({"fontSize":"2.5vw"});
          $(".verticalNav a").css({"fontSize":"2.8vw"});
          $('.verticalNav').css({"zIndex":"100","background":"#33334d","width":"100%"});
        }
        check = true;
      } 
  }

  ngDoCheck(){
      this.cluster = this.cookieService.get('cluster');  // Checking Cluster name
        
      if(window.innerWidth>1300){
        $('.components').addClass('col-sm-10');           
      }
      else if ( window.innerWidth<=1300){
        $('.components').addClass('col-sm-9').removeClass('col-sm-10');     
      }

      $('body ').css({'background':"whitesmoke"});   
  }


  ngAfterContentChecked(){
    this.user = this.global.user["0"];  // Saving users information its access priveldges into global variable user 
    if( this.user[this.cluster]=="0" && this.privledges){ // Checking if user is privledged for that cluster or not (in direct navigation)
      this.location.back();// (if not redirect back to previous page)
      var time = new Date();
      time.setSeconds(time.getSeconds() + 5);
      //expiry time 5s
      let opts: CookieOptionsArgs = {
        expires: time
      };
      this.cookieService.put("access_denied","Access Denied!",opts); // Setting cookie for access denied page
      this.privledges = false
    }
    this.message_failure=this.cookieService.get('access_denied'); // Recieving message failure cookie  
    let param=this.router.url.split('/');
    this.url= param[param.length-1];
    this.id = param[param.length-2];
    this.currDiv = this.cookieService.get('prevDiv'); // Geting the previous Division to highlight the navbar option when navigated to error page  
  }
  
}
