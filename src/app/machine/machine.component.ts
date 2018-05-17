import { Component, OnInit,ElementRef } from '@angular/core';
import { Dropdown } from './dropdown'
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent  {
  user = 'Admin';
  title = 'DashBoard';
  dropdownlist = Dropdown; 
  constructor() { }
  toggle(this,id){
    $(id).slideToggle();
  }
}
