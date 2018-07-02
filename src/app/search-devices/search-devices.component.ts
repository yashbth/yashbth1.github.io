import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import {
  debounce,distinctUntilChanged,switchMap, debounceTime
} from 'rxjs/operators'
import {Cluster} from '../Clusters'
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service'
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from '../global.service';

declare var $ : any;

@Component({
  selector: 'app-search-devices',
  templateUrl: './search-devices.component.html',
  styleUrls: ['./search-devices.component.css']
})

//  Refer Angular.io search example in http = "https://angular.io/tutorial/toh-pt6#search-by-name"
export class SearchDevicesComponent implements OnInit {

  selectId:string;// selected Id
  cluster : string;
  table : string ;
  devices$ : Observable<Cluster[]>; // Observable type data
  user : any; // Information of user
  private searchTerms = new Subject<string>();
  constructor(private router : Router,private service : FetchWaterDispenseDataService,private global:GlobalService,private route : ActivatedRoute,private cookieService: CookieService,private Cluster : Cluster) { 
  }

 
  onmouseover(id){
    this.selectId = id;// Setting input id on mouse hover the id
  }
  ngOnInit() {
    this.user = this.global.user["0"];
    this.cluster=this.cookieService.get('cluster');                 
    this.table = this.Cluster[this.cluster].WaterDispenseData[3];   
    // Request Ids for the given hint when there is a pause of some ms in typing
    this.devices$ = this.searchTerms.pipe(debounceTime(300),distinctUntilChanged(),switchMap((term:string)=>
      this.service.getIds(term,this.cluster,this.table[0])) // fecthing from database
  );
    
  }

  search(term:string){ 
    this.table= this.Cluster[this.cluster].WaterDispenseData[3];
    this.searchTerms.next(term);// Pushing hint into search query to request ids
  }
  // Navigation of page by clicking on id and setting cluster and id in cookie
  selectOther(){       
    this.cookieService.put('cluster',this.cluster);
    this.cookieService.put('id',this.selectId);                
    this.router.navigateByUrl('/'+this.cluster+'/'+this.selectId+'/WaterDispenser'); // navigate to another id 
    window.location.reload();
  }
  // Changing the width of search bar on focus and simultaneously increasing result section part only and making it visible
  largewidth(){
      this.global.showSearchResult= true;   // Setting result section to be visible  
      if(window.innerWidth>600){
        $('.nav-search').animate({"width":"350px"},300);// increasing width of search bar
        // Setting result section width after some ms
        setTimeout(()=>{
          var width = $('.nav-search').outerWidth();
          var padding =$('.dropdown').outerWidth();
          $('.search-result').css({"width":width,"visibility":"visible"}); 
          $('.tab').css({"padding-left":padding});
        },300)   
      }
       else{
        setTimeout(()=>{
          var width = $('.nav-search').outerWidth();
          $('.search-result').css({"width":width,"visibility":"visible"}); 
        },300) 
       }  
      
                         

  }
}
