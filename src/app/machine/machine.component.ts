import { Component, OnInit,AfterContentChecked ,DoCheck,HostListener} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router'
import { Dropdown } from './dropdown'
import {CookieService} from 'angular2-cookie/core'
import '../../assets/scripts/collapse.js'
import { GlobalService } from '../global.service';

declare var jquery:any;
declare var $ :any;
declare var check : any; 
declare function class10() : any;
declare function class12() : any;
declare function class3_9() : any;

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent{
  user = 'Admin';
  title = 'DASHBOARD';
  param=[];
  url:string;
  id:string;
  dropdownlist = Dropdown; 
  currDiv: string;
  cluster: string;
  constructor(private router : Router,private cookieService : CookieService,private route : ActivatedRoute,private global : GlobalService) {

   }

  ngOnIt(){


  }
  ngDoCheck(){
    this.cluster = this.cookieService.get('cluster');    
    if(window.innerWidth>1300){
      $('app-error').addClass('col-sm-10');     
      $('app-water-dispense').addClass('col-sm-10'); 
      $('app-transaction').addClass('col-sm-10');   
      $('app-supervisor').addClass('col-sm-10');
      $('app-operator').addClass('col-sm-10');
      $('app-settings').addClass('col-sm-10');
      
      
    }
    else if ( window.innerWidth<=1300){
      $('app-error').addClass('col-sm-9').removeClass('col-sm-10');     
      $('app-water-dispense').addClass('col-sm-9').removeClass('col-sm-10'); 
      $('app-transaction').addClass('col-sm-9').removeClass('col-sm-10');   
      $('app-supervisor').addClass('col-sm-9').removeClass('col-sm-10');
      $('app-operator').addClass('col-sm-9').removeClass('col-sm-10');
      $('app-settings').addClass('col-sm-9').removeClass('col-sm-10');
      
    }
    $('body ').css({'background':"whitesmoke"});   
  }
  ngAfterContentChecked(){
    let param=this.router.url.split('/');
    this.url= param[param.length-1];
    this.id = param[param.length-2];
    this.currDiv = this.cookieService.get('prevDiv');

  }
  
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
      $('#verticalCollapse').animate({maxWidth:"40%"},500);  
      check = true;
    }
         
  }

}
