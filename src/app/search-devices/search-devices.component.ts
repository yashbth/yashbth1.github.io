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
  table : string ;
  devices$ : Observable<Cluster[]>;
  private searchTerms = new Subject<string>();
  constructor(private router : Router,private service : FetchWaterDispenseDataService,private route : ActivatedRoute,private cookieService: CookieService,private Cluster : Cluster) { 
    this.cluster=this.cookieService.get('cluster'); 
  }
  onmouseover(id){
    this.selectId = id;
  }
  ngOnInit() {
    this.table = this.Cluster[this.cluster].WaterDispenseData[3];   
    this.devices$ = this.searchTerms.pipe(debounceTime(300),distinctUntilChanged(),switchMap((term:string)=>
      this.service.getIds(term,this.table[0]))
  );
    
  }
  ngDoCheck(){
  }
  search(term:string){
    console.log(this.cluster);
    this.table= this.Cluster[this.cluster].WaterDispenseData[3];
    this.searchTerms.next(term);
  }
  selectOther(){       
    this.router.navigateByUrl('/'+this.cluster+'/'+this.selectId+'/WaterDispenser');
    window.location.reload();
  }
  largewidth(){
    $('.nav-search').animate({"width":"350px"},300);
    setTimeout(()=>{
      var width = $('.nav-search').outerWidth();
      var padding =$('.dropdown').outerWidth();
      $('.search-result').css({"width":width}); 
      $('.tab').css({"padding-left":padding});
    },300)
  }
}
