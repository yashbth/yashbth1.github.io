import { Component, OnInit, OnChanges, AfterContentChecked,DoCheck,AfterContentInit } from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Cluster } from '../delhiCluster'
import { DatePipe } from '@angular/common';
import { GlobalService } from '../global.service';
import { CookieService } from 'angular2-cookie/core';



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
  cluster :string;
  data: any;
  date : any=new Date(Date.now());
  place:string = "New Delhi Cluster";
  info :any; 
  operators = [];
  expected_attendance=[];
  checkOperators:boolean=true;
  presents=[];
  present: number;
  absent: number;
  chart:boolean=false;
  location : string = this.cookieService.get('location');
  
  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster,private router:Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.dataAvailable=false;
      }
    })
  }
  ngDoCheck(){

    
 }
  ngOnInit() {
    this.date= this.date.getFullYear() + '-'+((this.date.getMonth()+1)/10>1 ? '':'0')+(this.date.getMonth()+1)+'-'+this.date.getDate();
    setTimeout(()=>{
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.data= this.Cluster[this.cluster].operator;
      this.getOperators('operator.php');
    },500)
  }


  getOperators(filename):void{
    this.operators=[];    
    this.service.getData(this.id,this.table,filename).subscribe(operators=>this.operators=operators,(err)=>console.error(err),()=>{       
      if( !this.operators || Object.keys(this.operators).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      if( this.checkOperators){     
        if(this.operators.length){
          for(let oper of this.operators){
            this.id[1]=oper.OperatorID.trim();
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
    this.service.getData(this.id,this.table,'operatorPunch.php').subscribe(presents=>this.presents=presents);
    setTimeout(()=>{
      if(!this.presents.length){
        dateString = dateArray[2] + '-'+dateArray[1]+'-'+dateArray[0];
        this.id[2] = dateString;
        this.service.getData(this.id,this.table,'operatorPunch.php').subscribe(presents=>this.presents=presents);
      }
      setTimeout(()=>{
        this.present = this.presents.length;
        console.log(this.presents); 
        this.absent = this.expected_attendance[index]-this.present;
        this.chart = true;
      },400);
    },500);

  }
}
