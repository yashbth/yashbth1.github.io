import { Component, OnInit , AfterContentChecked} from '@angular/core';
import {FetchWaterDispenseDataService} from '../fetch-water-dispense-data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {transaction} from '../water-dispense/test'

declare var jquery : any;
declare var $ : any;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  private id :string;
  place: string = "Gurgaon, Haryana"
  private filename : string='transactionLog.php';
  info : any;
  data = transaction;
  constructor(private service : FetchWaterDispenseDataService, private router : Router,private route : ActivatedRoute) { 
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.id = route.snapshot.paramMap.get('id');
        this.getInfo();
      }
    })
  }
  ngOnChanges(){
    $('#table').DataTable();   
  }
  ngOnInit() {
    $(document).ready(function() {
      $('#table').DataTable();
  } );
  }
  getInfo(){
    this.service.getData(this.id,this.filename).subscribe(info=>this.info=info);
  }

}
