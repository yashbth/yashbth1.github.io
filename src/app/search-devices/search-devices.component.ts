import { Component, OnInit,DoCheck} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import {
  debounce,distinctUntilChanged,switchMap, debounceTime
} from 'rxjs/operators'
import {Cluster} from '../delhiCluster'
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import { CookieService } from 'angular2-cookie/core';

declare var $ : any;

@Component({
  selector: 'app-search-devices',
  templateUrl: './search-devices.component.html',
  styleUrls: ['./search-devices.component.css']
})
export class SearchDevicesComponent implements OnInit {
  selectId:string;
  cluster : string;
  table : string = 'Water_Dispensing_Panel'
  devices$ : Observable<Cluster[]>;
  private searchTerms = new Subject<string>();
  constructor(private router : Router,private service : FetchWaterDispenseDataService,private route : ActivatedRoute,private cookieService: CookieService) { 
  }
  onmouseover(id){
    this.selectId = id;
  }
  ngOnInit() {
    this.devices$ = this.searchTerms.pipe(debounceTime(300),distinctUntilChanged(),switchMap((term:string)=>
      this.service.getIds(term,this.table))
  );
    
  }
  ngDoCheck(){
  }
  search(term:string){
    this.searchTerms.next(term);
  }
  selectOther(){   
     this.cluster=this.cookieService.get('cluster');    
    this.router.navigateByUrl('/'+this.cluster+'/'+this.selectId+'/WaterDispenser');
    window.location.reload();
  }
  largewidth(){
    $('.nav-search').animate({"width":"350px"},300);
    setTimeout(()=>{
      var width = $('.nav-search').outerWidth();
      $('.search-result').css({"width":width}); 
    },300)
  }
}
