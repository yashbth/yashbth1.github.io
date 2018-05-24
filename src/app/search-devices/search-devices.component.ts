import { Component, OnInit,HostListener, ElementRef ,DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import {
  debounce,distinctUntilChanged,switchMap, debounceTime
} from 'rxjs/operators'
import {Device} from '../water-dispense/test'
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'

declare var $ : any;

@Component({
  selector: 'app-search-devices',
  templateUrl: './search-devices.component.html',
  styleUrls: ['./search-devices.component.css']
})
export class SearchDevicesComponent implements OnInit {
  selectId:string;
  devices$ : Observable<Device[]>;
  private searchTerms = new Subject<string>();
  constructor(private router : Router,private service : FetchWaterDispenseDataService,private el : ElementRef) { }
  @HostListener('mouseover') onmouseover(id){
    this.selectId = id;
  }
  ngOnInit() {
    this.devices$ = this.searchTerms.pipe(debounceTime(300),distinctUntilChanged(),switchMap((term:string)=>
      this.service.getIds(term))
  );
  }
  ngDoCheck(){

  }
  search(term:string){
    this.searchTerms.next(term);
  }
  selectOther(){
    this.router.navigateByUrl('/device/'+this.selectId+'/WaterDispenser');
    window.location.reload();
  }
  largewidth(){
    $('input').animate({"width":"350px"});
    var width = $('input').outerWidth();
    $('.search-result').css({"width":width}); 
  }
  smallwidth(){
    $('input').animate({"width":"191px"});
    
  }
}
