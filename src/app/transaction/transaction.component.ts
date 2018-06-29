import { Component, OnInit } from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Cluster} from '../delhiCluster'
import { GlobalService } from '../global.service';
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { utf8Encode } from '@angular/compiler/src/util';

declare var jquery : any;
declare var $ : any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  dataAvailable : Boolean = false; // First Check if document is ready or not ( for loading part)
  dataAvailable1 : Boolean = false; // Second check if required information is recieved or not
  
  table = 'Transaction_logging'; // table name in php
  private id =[];
  private filename : string='transactionLog.php';
  info : any;
  cluster : string;
  data : any;
  panel : string;
  cards:any;
  location : string = this.cookieService.get('location');
  dev : string = this.cookieService.get('id'); //DeviceID

  jwtHelper = new JwtHelperService();// Service to implement methods on Jwttoken
  trans_params : any = this.Cluster.trans_params;
  property1 : string = null;
  card:string;

  fromDate: any=new Date().toISOString().slice(0,10); // chart dates formated in yyyy-mm-dd
  toDate : any =new Date().toISOString().slice(0,10);
  
  param_count: number; // information rows count for certain option
  param_name: string;

  flagPriveledge : boolean= true;

  constructor(private router :Router ,private service : FetchWaterDispenseDataService,private Cluster : Cluster,private route : ActivatedRoute, private globalservice : GlobalService, private cookieService:CookieService ) { 
  }

  ngOnInit(){
    if(this.globalservice.user["0"]['Transaction_Log']=="0" ){
      var time = new Date();
      time.setSeconds(time.getSeconds() + 5);
      let opts: CookieOptionsArgs = {
        expires: time
      };
      this.cookieService.put("access_denied","Access Denied!",opts);
      this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')             
    }
    setTimeout(()=>{
      // Checking expiry of jwttoken
      if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
        window.location.href= 'https://swajal.in/iiot';
      }
      // information from url 
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.panel = this.route.snapshot.paramMap.get('panel')
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.data= this.Cluster[this.cluster].transaction;
      this.cookieService.put('prevDiv','transactionLog');            
      this.service.getData(this.id,this.data[3][0],'cards.php').subscribe(cards=>this.cards=cards,(err)=>console.log(err),()=>{
      console.log(this.cards);
      }); 
    })
    // setting dataAvailable after 1s ( for loading)
    setTimeout(()=>{
      // this.globalservice.isAllowed('Transaction_Log'); // Checks the authentication for direct url navigation (Function defined in Global Service)                       
      this.dataAvailable =true;
      this.property1 = '0';
      document.getElementById('options')["options"][0].selected = true; // Setting select parameter to first option 
    },1000)
  }
  // css Changes for table
  ngAfterContentChecked(){
    $('.paginate_button').css({"padding":"10px"});
    $('#table_filter').css({"display":"inline-block","float":"right"});
    $('#table_length').css({"display":"inline-block"});
    $('.dataTables_info').css({"visibility":"hidden"});
    // $('html').css({"height":"100%"});   
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
      // Defining certain values according to thier values
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
        $('.fas').css({"padding-left":"10px"});
      })
    },1000)
  }
  CardData(){
    // console.log("hel")
    $('#table_filter input').val(this.card);
    $(function() {
      $('#table_filter input').keyup();
  });

  }
  // Prints the table 
  print(): void {
    let printContents, popupWin;
    $('#table_length').css({"visibility":"hidden"});
    $('#table_filter').css({"visibility":"hidden"});
    $('#table_paginate').css({"visibility":"hidden"});


    printContents = document.getElementById('to_print').innerHTML;// id of element to be printed
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
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
    $('#table_length').css({"visibility":"visible"});
    $('#table_filter').css({"visibility":"visible"});
    $('#table_paginate').css({"visibility":"visible"});
}



}
