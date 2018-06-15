import { Component, OnInit, OnChanges, AfterContentChecked,DoCheck,AfterContentInit } from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Cluster } from '../delhiCluster'
import { DatePipe } from '@angular/common';
import { GlobalService } from '../global.service';
import { CookieService } from 'angular2-cookie/core';
import { JwtHelperService } from '@auth0/angular-jwt';



declare var jquery : any;
declare var $ : any;
declare var displayLocation : any;

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  dataAvailable : boolean =false;
  table= "Operator_Attendence"
  id=[];
  panel : string;
  cluster :string;
  data: any;
  date : any=new Date(Date.now());
  place:string;
  info :any; 
  operators = [];
  expected_attendance=[];
  checkOperators:boolean=true;
  presents=[];
  present: number;
  absent: number;
  chart:boolean=false;
  location : string = this.cookieService.get('location');
  jwtHelper = new JwtHelperService();

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster,private router:Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.dataAvailable=false;
      }
    })
  }

  ngOnInit() {
    if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
      window.location.href= 'https://swajal.in/iiot';
    }
    this.date= this.date.getFullYear() + '-'+((this.date.getMonth()+1)/10>1 ? '':'0')+(this.date.getMonth()+1)+'-'+this.date.getDate();
    setTimeout(()=>{
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.panel = this.route.snapshot.paramMap.get('panel');
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.data= this.Cluster[this.cluster].operator;
      this.globalservice.isAllowed(this.cluster,this.panel,this.id);                       
      this.getOperators('operator.php');
    },500)
  }


  getOperators(filename):void{
    this.operators=[];    
    this.service.getData(this.id,this.table,filename).subscribe(operators=>this.operators=operators,(err)=>console.error(err),()=>{  
      if( !this.operators || Object.keys(this.operators).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      for(let operator of this.operators){
        //  console.log(operator,'2');
        //  console.log(operator.OperatorID.substr(0,3) ,'3');
  
  
          // var re = /3↵/gi; 
          operator.OperatorID = operator.OperatorID.substr(0,10);
        }
  
      if( this.checkOperators){     
        if(this.operators.length){
          this.operators.map(operator=>operator.OperatorID.trim());
          this.operators = this.operators.filter((x, i, a) => a.indexOf(x) == i)
          for(let oper of this.operators){
            console.log(oper.OperatorID.toString() ,'oper.openID');
            this.id[1]=oper.OperatorID;
            this.id[2]='';
            this.getInfo('operatorPunch.php');
          }
          this.checkOperators=false; 
        }
      }
    })
    this.cookieService.put('prevDiv','operator');    
    setTimeout(()=>{
      this.dataAvailable = true;
    },1000);
  }
  getInfo(filename):void{
    this.info=[];   
    this.service.getData(this.id,this.table,filename).subscribe(info=>this.info=info);

  }
  generateChart(operator,index){
    this.chart = false;
    this.presents=[];
    let dateArray = this.date.split('-');
    let dateString = dateArray[2] + '/'+dateArray[1]+'/'+dateArray[0];
    this.id[2] = dateString;
    this.id[1]= operator;
    this.service.getData(this.id,this.table,'operatorPunch.php').subscribe(presents=>this.presents=presents,(err)=>console.log(err),()=>{
      if(!this.presents){
        dateString = dateArray[2] + '-'+dateArray[1]+'-'+dateArray[0];
        this.id[2] = dateString;
        this.service.getData(this.id,this.table,'operatorPunch.php').subscribe(presents=>this.presents=presents);
      }
      setTimeout(()=>{
        this.present = 0 || this.presents.length;
        console.log(this.presents); 
        this.absent = this.expected_attendance[index]-this.present;

        this.chart = true;
      },400);
    });

  }
}
