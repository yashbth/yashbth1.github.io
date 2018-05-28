import { Component, OnInit , AfterContentChecked,DoCheck,AfterContentInit,OnChanges} from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {transaction} from '../water-dispense/test'
import '../../assets/scripts/map.js'
import { GlobalService } from '../global.service';
import { CookieService } from 'angular2-cookie/core';

declare var jquery : any;
declare var $ : any;
declare var displayLocation : any;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  dataAvailable : Boolean = false
  private id =[];
  place: string = "New Delhi Cluster"
  private filename : string='transactionLog.php';
  info : any;
  data = transaction;
  location : string = this.cookieService.get('location');

  constructor(private service : FetchWaterDispenseDataService, private router : Router,private route : ActivatedRoute, private globalservice : GlobalService, private cookieService:CookieService) { 
  }

  ngOnInit(){
    setTimeout(()=>{
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.getInfo();
      displayLocation(this.globalservice.lat,this.globalservice.lon,'place');      
    })
  }
  ngAfterContentChecked(){
    $('.paginate_button').css({"padding":"10px"})
  }

  getInfo(){
    this.info=[];
    console.log("called from transaction");
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info);
    this.cookieService.put('prevDiv','transactionLog');            
    setTimeout(()=>{
      this.dataAvailable =true;
      if(Object.keys(this.info).length==0){
        this.router.navigateByUrl('/device/'+this.id[0] +'/error')
      }
      $(document).ready(function(){
            $('#table').DataTable();
            $('.paginate_button').css({"padding":"10px"});
           

          })
    },1000)
  }

}
