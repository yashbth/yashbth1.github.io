import { Component, OnInit, OnChanges, AfterContentChecked,DoCheck } from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { operator } from '../water-dispense/test'
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
  id=[];
  data = operator;
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
  
  constructor(private service : FetchWaterDispenseDataService,private router:Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.dataAvailable=false;
        this.id[0] = route.snapshot.paramMap.get('id');

      }
    })
  }
  ngDoCheck(){
    if( this.checkOperators){     
      if(this.operators.length){
        for(let oper of this.operators){
          this.id[1]=oper.OperatorID.trim();
          this.id[2]='';
          this.getInfo('operatorPunch.php')              
        }
        this.checkOperators=false; 
      }
    }
    
 }
  ngOnInit() {
    this.date= this.date.getFullYear() + '-'+((this.date.getMonth()+1)/10>1 ? '':'0')+(this.date.getMonth()+1)+'-'+this.date.getDate();
    setTimeout(()=>{
      this.getOperators('operator.php');
      displayLocation(this.globalservice.lat,this.globalservice.lon,'place');
    },200)
  }
  getOperators(filename):void{
    console.log("called from operator")
    this.operators=[];    
    this.service.getData(this.id,filename).subscribe(operators=>this.operators=operators)
    this.cookieService.put('prevDiv','operator');    
    setTimeout(()=>{
      this.dataAvailable = true;
      if(Object.keys(this.operators).length==0){
        this.router.navigateByUrl('/device/'+this.id[0] +'/error')
      }
    },1000);
  }
  getInfo(filename):void{
    this.info=[];   
    this.service.getData(this.id,filename).subscribe(info=>this.info=info);
  }
  generateChart(operator,index){
    this.chart = false;
    this.presents=[];
    let dateArray = this.date.split('-');
    let dateString = dateArray[2] + '/'+dateArray[1]+'/'+dateArray[0];
    this.id[2] = dateString;
    this.id[1]= operator;
    this.service.getData(this.id,'operatorPunch.php').subscribe(presents=>this.presents=presents);
    setTimeout(()=>{
      if(!this.presents.length){
        dateString = dateArray[2] + '-'+dateArray[1]+'-'+dateArray[0];
        this.id[2] = dateString;
        this.service.getData(this.id,'operatorPunch.php').subscribe(presents=>this.presents=presents);
      }
      setTimeout(()=>{
        this.present = this.presents.length;
        this.absent = this.expected_attendance[index]-this.present;
        this.chart = true;
      },100);
    },100);

  }
}
