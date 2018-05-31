import { Component, OnInit,DoCheck,HostListener} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import {
  debounce,distinctUntilChanged,switchMap, debounceTime
} from 'rxjs/operators'
import {Cluster} from '../delhiCluster'
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from '../global.service';

declare var $ : any;

@Component({
  selector: 'app-search-devices',
  templateUrl: './search-devices.component.html',
  styleUrls: ['./search-devices.component.css']
})
export class SearchDevicesComponent implements OnInit {
  selectId:string;
  cluster : string;
  table : string ;
  devices$ : Observable<Cluster[]>;
  private searchTerms = new Subject<string>();
  constructor(private router : Router,private service : FetchWaterDispenseDataService,private global:GlobalService,private route : ActivatedRoute,private cookieService: CookieService,private Cluster : Cluster) { 
  }

 
  onmouseover(id){
    this.selectId = id;
  }
  ngOnInit() {
    this.cluster=this.cookieService.get('cluster');                 
    this.table = this.Cluster[this.cluster].WaterDispenseData[3];   
    this.devices$ = this.searchTerms.pipe(debounceTime(300),distinctUntilChanged(),switchMap((term:string)=>
      this.service.getIds(term,this.table[0]))
  );
    
  }
  ngDoCheck(){  
                                                          
  }
  search(term:string){ 
    this.table= this.Cluster[this.cluster].WaterDispenseData[3];
    this.searchTerms.next(term);
  }
  selectOther(){       
    this.cookieService.put('cluster',this.cluster);
    this.cookieService.put('id',this.selectId);                
    this.router.navigateByUrl('/'+this.cluster+'/'+this.selectId+'/WaterDispenser');
    window.location.reload();
  }
  largewidth(){  
    this.global.showSearchResult= true;                                       
    $('.nav-search').animate({"width":"350px"},300);
    setTimeout(()=>{
      var width = $('.nav-search').outerWidth();
      var padding =$('.dropdown').outerWidth();
      $('.search-result').css({"width":width,"visibility":"visible"}); 
      $('.tab').css({"padding-left":padding});
    },300)
  }
}
