import { Component, OnInit , AfterContentChecked,DoCheck,AfterContentInit,OnChanges} from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {transaction} from '../water-dispense/test'
import '../../assets/scripts/map.js'
import { Globals } from '../global';

declare var jquery : any;
declare var $ : any;
declare var displayLocation: any;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers : [Globals]
})
export class TransactionComponent implements OnInit {
  private id =[];
  place: string = "New Delhi Cluster"
  private filename : string='transactionLog.php';
  info : any;
  data = transaction;
  constructor(private service : FetchWaterDispenseDataService, private router : Router,private route : ActivatedRoute,private address : Globals) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){


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
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info);
  
    setTimeout(()=>{
      console.log("called"); 
      console.log(this.address.lat);
      $(document).ready(function(){
            $('#table').DataTable();
            $('.paginate_button').css({"padding":"10px"})
            console.log(this.address.lat)
            displayLocation(this.address.lat,this.address.lon,'place');
          })
    },100)
  }

}
