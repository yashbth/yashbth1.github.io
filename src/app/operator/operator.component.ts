import { Component, OnInit, OnChanges, AfterContentChecked,DoCheck,AfterContentInit } from '@angular/core';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Cluster } from '../Clusters'
import { DatePipe } from '@angular/common';
import { GlobalService } from '../global.service';
import { CookieService,CookieOptionsArgs } from 'angular2-cookie/core';
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
  dataAvailable : boolean =false; // loading boolean
  table= "Operator_Attendence"
  id=[];
  panel : string;
  cluster :string;
  data: any;
  date : any=new Date().toISOString().slice(0,10);
  place:string;
  info :any; 
  operators = []; // Distinct operators
  expected_attendance=[]; // expected no. of attendance for each operator
  checkOperators:boolean=true;
  presents=[];  // Presents for each and every operator
  present: number;// no. of presents of particular operator
  absent: number;//no. of presents of particular operator
  chart:boolean=false; // boolean to show and hide doughnut chart
  location : string = this.cookieService.get('location');
  machineNo: string = this.cookieService.get('machineNo');
  jwtHelper = new JwtHelperService();

  constructor(private service : FetchWaterDispenseDataService,private Cluster : Cluster,private router:Router,private route: ActivatedRoute,private globalservice : GlobalService, private cookieService:CookieService) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.dataAvailable=false;
      }
    })
  }

  ngOnInit() {
    // Checking if jwttoken is expired or not, if yes then navigate to home (map)
    if(this.jwtHelper.isTokenExpired(this.globalservice.token)){
      window.location.href= 'https://swajal.in/iiot';
    }
      // setting date in yyyy-mm-dd format
    this.date= this.date.getFullYear() + '-'+((this.date.getMonth()+1)/10>1 ? '':'0')+(this.date.getMonth()+1)+'-'+this.date.getDate();
    // Information from url
    setTimeout(()=>{
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.panel = this.route.snapshot.paramMap.get('panel');
      this.cluster = this.route.snapshot.paramMap.get('cluster');
      this.data= this.Cluster[this.cluster].operator;
      // this.globalservice.isAllowed('Operator_Attendance');                       
      this.getOperators('operator.php');
    },500)
  }

  // Getting Informtaion of each operator at beginning of  page only
  getOperators(filename):void{
    this.operators=[];    
    this.service.getData(this.id,this.table,filename).subscribe(operators=>this.operators=operators,(err)=>console.error(err),()=>{  
    // Checks if user has permission for requested division ("Transaction Log") and if not set's access denied to cookie
      if(this.globalservice.user["0"]['Operator_Attendance']=="0"){
        var time = new Date();
        time.setSeconds(time.getSeconds() + 5);
        let opts: CookieOptionsArgs = {
          expires: time
        };
        this.cookieService.put("access_denied","Access Denied!",opts);
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
    // Navigate to error page if no operators is present
      if( !this.operators || Object.keys(this.operators).length==0 ){
        this.router.navigateByUrl('/'+this.cluster+'/'+this.id +'/error')              
      }
      let uniqueOperators=[];
      // trimming white spaces form beginning and end
      for(let operator of this.operators){
          operator.OperatorID = operator.OperatorID.trim();
          // Pushing unique operators into uniqueOperator array
          if(uniqueOperators.indexOf(operator.OperatorID)==-1){// checks if array contains that operator already or not
            uniqueOperators.push(operator.OperatorID);
          }
        }
      this.operators=uniqueOperators;
      if( this.checkOperators){     
        if(this.operators.length){
          for(let oper of this.operators){
            this.id[1]=oper;
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
  // function to call php file through service
  getInfo(filename):void{
    this.info=[];   
    this.service.getData(this.id,this.table,filename).subscribe(info=>this.info=info);

  }

  // Generating Chart for a particular operator
  generateChart(operator,index){
    this.chart = false;
    this.presents=[];
    let dateArray = this.date.split('-');
    //if date format is 'yyyy-mm-dd' in database
    let dateString = dateArray[2] + '/'+dateArray[1]+'/'+dateArray[0];
    this.id[2] = dateString;
    this.id[1]= operator;
    // Request for chart data for particular operator when user clicks analyse button
    this.service.getData(this.id,this.table,'operatorPunch.php').subscribe(presents=>this.presents=presents,(err)=>console.log(err),()=>{
      // if date format is yyyy/mm/dd in database
      if(!this.presents){
        dateString = dateArray[2] + '-'+dateArray[1]+'-'+dateArray[0];
        this.id[2] = dateString;
        this.service.getData(this.id,this.table,'operatorPunch.php').subscribe(presents=>this.presents=presents);
      }
      setTimeout(()=>{
        // calculating no.of presents and absents of operators
        try{
          this.present = 0 || this.presents.length;
        }
        catch(err){
          this.present=0;
        }
        this.absent = this.expected_attendance[index]-this.present;
        //Cookie set if expected punches are less no. of presents else chart becomes visible
        if(this.absent<0){
          var time = new Date();
          time.setSeconds(time.getSeconds() + 5);
          let opts: CookieOptionsArgs = {
            expires: time
          };
          this.cookieService.put('access_denied','Warning! Expected punches is less than number of actual presents(' + this.present+')',opts);
        }
        else{ 
          this.chart = true;
          this.cookieService.put('access_denied','');
        }
      },400);
    });

  }
}
