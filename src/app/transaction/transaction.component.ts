import { Component, OnInit , AfterContentChecked,DoCheck,AfterContentInit,OnChanges} from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Cluster} from '../delhiCluster'
import { GlobalService } from '../global.service';
import { CookieService } from 'angular2-cookie/core';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  dataAvailable1 : Boolean = false;
  
  table = 'Transaction_logging';
  private id =[];
  private filename : string='transactionLog.php';
  info : any;
  cluster : string;
  data : any;
  panel : string;

  location : string = this.cookieService.get('location');
  dev : string = this.cookieService.get('id');

  jwtHelper = new JwtHelperService();
  trans_params : any = this.Cluster.trans_params;
  property1 : string = null;

  fromDate: any=new Date().toISOString().slice(0,10);
  toDate : any =new Date().toISOString().slice(0,10);
  
  param_count: number;
  param_name: string;

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster, private router : Router,private route : ActivatedRoute, private globalservice : GlobalService, private cookieService:CookieService ) { 
  }

  ngOnInit(){
    setTimeout(()=>{
      if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
        window.location.href= '/';
      }
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.panel = this.route.snapshot.paramMap.get('panel')
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.data= this.Cluster[this.cluster].transaction;
      this.globalservice.isAllowed(this.cluster,this.panel,this.id);                       
      this.cookieService.put('prevDiv','transactionLog');            
      
      // this.getInfo();      
    })
    setTimeout(()=>{
      this.dataAvailable =true;
      document.getElementById('options')["options"][0].selected = true;
      this.property1 = '0';

    },1000)
  }
  ngAfterContentChecked(){
    $('.paginate_button').css({"padding":"10px"});
    $('#table_filter').css({"display":"inline-block","float":"right"});
    $('#table_length').css({"display":"inline-block"});
    $('.dataTables_info').css({"visibility":"hidden"});

  }

  getInfo(){
    this.info=[];
    console.log(this.id[0], this.table,this.filename,this.property1,this.fromDate,this.toDate,'see here');
    this.service.getData_trans_params(this.id,this.table,this.filename,this.property1,this.fromDate,this.toDate).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{      
      // if( !this.info || Object.keys(this.info).length==0 ){
      //   this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
        $('#table').DataTable();
        // }
    this.dataAvailable1 = false;
    this.param_count = this.info.length;

    });
    setTimeout(()=>{
      if(this.property1 !== '00'){
        this.param_name = this.trans_params[0][this.property1];
      }
      else{
      this.param_name = "Machine Restart";
      }
      this.dataAvailable1 =true;
      $(document).ready(function(){
        $('#table').DataTable()
        $('.paginate_button').css({"padding":"10px","border":"none"});
      })
    },1000)
  }



}
