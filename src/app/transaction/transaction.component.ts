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
        window.location.href= 'https://swajal.in/iiot';
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
      this.property1 = '0';
      document.getElementById('options')["options"][0].selected = true;
    },1000)
  }
  ngAfterContentChecked(){
    $('.paginate_button').css({"padding":"10px"});
    $('#table_filter').css({"display":"inline-block","float":"right"});
    $('#table_length').css({"display":"inline-block"});
    $('.dataTables_info').css({"visibility":"hidden"});
    // $('html').css({"height":"100%"});   

  }

  getInfo(){
    this.info=[];
    // console.log(this.id[0], this.table,this.filename,this.property1,this.fromDate,this.toDate,'see here');
    this.service.getData_trans_params(this.id,this.table,this.filename,this.property1,this.fromDate,this.toDate).subscribe(info=>this.info=info,(err)=>console.error(err),()=>{      
      // if( !this.info || Object.keys(this.info).length==0 ){
      //   this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
        $('#table').DataTable();
        // }
    this.dataAvailable1 = false;
    if(this.info){
      this.param_count = this.info.length;
    }
    else{
      this.param_count = 0;
    }

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
        // $('#table_length').html($('#table_length').html()+'<i id="to_print">');
        // $('#table_paginate').html($('#table_paginate').html()+'</i>here');
        $('.fas').css({"padding-left":"10px"});
      })
    },1000)
  }

  print(): void {
    let printContents, popupWin;
    $('#table_length').css({"display":"none"});
    $('#table_filter').css({"visibility":"hidden"});
    $('#table_paginate').css({"visibility":"hidden"});


    printContents = document.getElementById('to_print').innerHTML;
    popupWin = window.open('', '_blank', 'top=10,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <br>
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">    
          <style>

            @media print {
              body {-webkit-print-color-adjust: black !important;}
              th{
                color: black !important;
              }
              }
          </style>
        </head>
    <body onload="window.print(),window.close();">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
    // $('#table_length').css({"visibility":"visible"});
    $('#table_filter').css({"visibility":"visible"});
    $('#table_paginate').css({"visibility":"visible"});
}



}
