import { Component, OnInit,DoCheck,HostListener, Inject,Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import {
  debounce,distinctUntilChanged,switchMap, debounceTime
} from 'rxjs/operators'
import {Cluster} from '../delhiCluster'
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from '../global.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

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
  user : any;
  private searchTerms = new Subject<string>();
  constructor(private router : Router,private service : FetchWaterDispenseDataService,private global:GlobalService,private route : ActivatedRoute,private cookieService: CookieService,private Cluster : Cluster,@Inject(SESSION_STORAGE) private storage : StorageService) { 
  }

 
  onmouseover(id){
    this.selectId = id;
  }
  ngOnInit() {
    this.user = this.global.user["0"];
    this.cluster=this.cookieService.get('cluster');                 
    this.table = this.Cluster[this.cluster].WaterDispenseData[3];   
    this.devices$ = this.searchTerms.pipe(debounceTime(300),distinctUntilChanged(),switchMap((term:string)=>
      this.service.getIds(term,this.cluster,this.table[0]))
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
      if(window.innerWidth>600){
        $('.nav-search').animate({"width":"350px"},300);
        setTimeout(()=>{
          var width = $('.nav-search').outerWidth();
          var padding =$('.dropdown').outerWidth();
          $('.search-result').css({"width":width,"visibility":"visible"}); 
          $('.tab').css({"padding-left":padding});
        },300)   
      }
       else{
        // $('.nav-search').animate({"width":"350px"},300);
        setTimeout(()=>{
          var width = $('.nav-search').outerWidth();
          // var padding =$('.dropdown').outerWidth();
          $('.search-result').css({"width":width,"visibility":"visible"}); 
          // $('.tab').css({"padding-left":padding});
        },300) 
       }  
      
                         

  }
}
