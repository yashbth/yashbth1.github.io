import { Component, OnInit, AfterViewInit,AfterContentChecked} from '@angular/core';
import {Cluster} from '../delhiCluster';
import { Dropdown} from '../machine/dropdown'
import '../../assets/scripts/settings_functions.js';
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from '../global.service';

declare var $ : any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  clusters: any = this.Cluster.clusters;
  message_success : string = this.cookieService.get('message_success');
  message_failure : string = this.cookieService.get('message_failure');
  priv_boolean :boolean = false;
  userName : string=this.global.user["0"].Username;
  UserName : string;
  flag : boolean = true;
  flag1 : boolean;
  dropdown = Dropdown;
  url = "http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php";
  // url = "http://localhost:8000/assets/Php";
  
  
  constructor(private Cluster: Cluster, private cookieService:CookieService,private global : GlobalService) { }

  ngOnInit() {
    this.cookieService.put('prevDiv','Settings');
    console.log("ngonit")

  }
  ngAfterContentChecked(){
    if(this.cookieService.get('priv-vis')=='1' && $('#get_user_form').length){
      (document.getElementById('priv') as HTMLDivElement).style.visibility = 'visible';
      console.log("after")
    }
            
      if($('#get_user_form').length){
        this.flag1 = true;
      }
      if(this.flag&&this.flag1){
        this.check(this,'panelP[]');
      }

  



  }

toggle(source,name) {
  var checkboxes = document.getElementsByName(name);
  for(var i=0, n=checkboxes.length;i<n;i++) {
    console.log((checkboxes[i] as HTMLInputElement).checked = true);
  }
}

// var theButton = document.getElementById('create_user_btn');

check(source,panel_name){
  
  var checkboxes = document.getElementsByName(panel_name);


  if(this.cookieService.get('UN')){
    this.UserName = this.cookieService.get('UN');
    // this.cookieService.put('UN', '');
  }
  if(this.cookieService.get('Water_Dispensing_Panel')=='11'){
    console.log((checkboxes[0] as HTMLInputElement).checked = true);
    this.cookieService.put('Water_Dispensing_Panel','01');
  }
  if(this.cookieService.get('RO_Parameters')=='11'){
    console.log((checkboxes[1] as HTMLInputElement).checked = true);
    this.cookieService.put('RO_Parameters','01');
  }
  if(this.cookieService.get('Transaction_Log')=='11'){
    console.log((checkboxes[2] as HTMLInputElement).checked = true);
    this.cookieService.put('Transaction_Log','01');
  }
  if(this.cookieService.get('Operator_Attendance')=='11'){
    console.log((checkboxes[3] as HTMLInputElement).checked = true);
    this.cookieService.put('Operator_Attendance','01');
  }
  if(this.cookieService.get('Cup_Dispensing_Panel')=='11'){
    console.log((checkboxes[4] as HTMLInputElement).checked = true);
    this.cookieService.put('Cup_Dispensing_Panel','01');
  }
  if(this.cookieService.get('Supervisor_Data')=='11'){
    console.log((checkboxes[5] as HTMLInputElement).checked = true);
    this.cookieService.put('Supervisor_Data','01');
  }
  for(let cluster of this.clusters){
    if(document.getElementById(cluster)){
      console.log('called1');
      var cluster_box = document.getElementById(cluster);
      if(this.cookieService.get(cluster)=='11'){
        console.log((cluster_box as HTMLInputElement).checked = true);
        this.cookieService.put(cluster, '01');
      }
      // this.flag= false;
      
    }
  }
  if(this.cookieService.get('UN')){
    this.UserName = this.cookieService.get('UN');
    this.cookieService.put('UN', '');
  }
  if(this.cookieService.get('Water_Dispensing_Panel')=='01'){
    console.log((checkboxes[0] as HTMLInputElement).checked = true);
    this.cookieService.put('Water_Dispensing_Panel','00');
  }
  if(this.cookieService.get('RO_Parameters')=='01'){
    console.log((checkboxes[1] as HTMLInputElement).checked = true);
    this.cookieService.put('RO_Parameters','00');
  }
  if(this.cookieService.get('Transaction_Log')=='01'){
    console.log((checkboxes[2] as HTMLInputElement).checked = true);
    this.cookieService.put('Transaction_Log','00');
  }
  if(this.cookieService.get('Operator_Attendance')=='01'){
    console.log((checkboxes[3] as HTMLInputElement).checked = true);
    this.cookieService.put('Operator_Attendance','00');
  }
  if(this.cookieService.get('Cup_Dispensing_Panel')=='01'){
    console.log((checkboxes[4] as HTMLInputElement).checked = true);
    this.cookieService.put('Cup_Dispensing_Panel','00');
  }
  if(this.cookieService.get('Supervisor_Data')=='01'){
    console.log((checkboxes[5] as HTMLInputElement).checked = true);
    this.cookieService.put('Supervisor_Data','00');
  }
  for(let cluster of this.clusters){
    if(document.getElementById(cluster)){
      console.log('called1');
      var cluster_box = document.getElementById(cluster);
      if(this.cookieService.get(cluster)=='01'){
        console.log((cluster_box as HTMLInputElement).checked = true);
        this.cookieService.put(cluster, '00');
      }
      this.flag= false;
      this.cookieService.put('priv-vis','0');      
      
      
    }
  }

}
}
