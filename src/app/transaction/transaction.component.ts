import { Component, OnInit , AfterContentChecked,DoCheck,AfterContentInit,OnChanges} from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {transaction} from '../water-dispense/test'
import '../../assets/scripts/map.js'
import { GlobalService } from '../global.service';

declare var jquery : any;
declare var $ : any;
declare var displayLocation : any;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  private id =[];
  place: string = "Gurgaon, Haryana"
  private filename : string='transactionLog.php';
  info : any;
  data = transaction;
  constructor(private service : FetchWaterDispenseDataService, private router : Router,private route : ActivatedRoute,private globalservice : GlobalService) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){

       displayLocation(this.globalservice.lat,this.globalservice.lon,'place');
        
      }
    })
  }

  ngOnInit(){
    setTimeout(()=>{
      this.id[0] = this.route.snapshot.paramMap.get('id');
      this.getInfo();
    })
  }
  ngAfterContentChecked(){
    $('.paginate_button').css({"padding":"10px"})
  }

  getInfo(){
    this.info=[];
    console.log(this.info);
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info);
    setTimeout(()=>{
      $(document).ready(function(){
            $('#table').DataTable();
            $('.paginate_button').css({"padding":"10px"});
           

          })
    },100)
  }

}
