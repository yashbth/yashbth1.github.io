import { Component, OnInit , AfterContentChecked,DoCheck,AfterContentInit,OnChanges} from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Cluster} from '../delhiCluster'
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
  dataAvailable : Boolean = false;
  table = 'Transaction_logging';
  private id =[];
  private filename : string='transactionLog.php';
  info : any;
  cluster : string;
  data : any;
  location : string = this.cookieService.get('location');

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster, private router : Router,private route : ActivatedRoute, private globalservice : GlobalService, private cookieService:CookieService) { 
  }

  ngOnInit(){
    setTimeout(()=>{
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.data= this.Cluster[this.cluster].transaction;
      this.getInfo();      
    })
  }
  ngAfterContentChecked(){
    $('.paginate_button').css({"padding":"10px"})
  }

  getInfo(){
    this.info=[];
    this.service.getData(this.id,this.table,this.filename).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{      
      if( !this.info || Object.keys(this.info).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }

    });
    this.cookieService.put('prevDiv','transactionLog');            
    setTimeout(()=>{
      this.dataAvailable =true;
      $(document).ready(function(){
        $('#table').DataTable();
        $('.paginate_button').css({"padding":"10px"});
      })
    },1000)
  }

}
