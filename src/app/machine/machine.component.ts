import { Component, OnInit,AfterContentChecked ,DoCheck} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { Dropdown } from './dropdown'
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent{
  user = 'Admin';
  title = 'DashBoard';
  param=[];
  url:string;
  id:string;
  dropdownlist = Dropdown; 
  constructor(private router : Router) { }
  ngDoCheck(){
    $('app-home').addClass('col-sm-10');     
    $('app-water-dispense').addClass('col-sm-10'); 
    $('app-transaction').addClass('col-sm-10');   
    $('app-supervisor').addClass('col-sm-10');
    $('app-operator').addClass('col-sm-10');   
  }
  ngAfterContentChecked(){
    let param=this.router.url.split('/');
    this.url= param[param.length-1];
    this.id = param[param.length-2];
  }
  
  toggle(this,id){
    $(id).slideToggle();    
  }
}
