import { Component, OnInit, AfterViewInit,AfterContentChecked} from '@angular/core';
import {Cluster} from '../delhiCluster';
import '../../assets/scripts/settings_functions.js';
import { CookieService } from 'angular2-cookie/core';


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
  userName : string = '';
  flag : boolean = true;

  constructor(private Cluster: Cluster, private cookieService:CookieService) { }

  ngOnInit() {
    if(this.cookieService.get('priv-vis')=='1'){
      (document.getElementById('priv') as HTMLDivElement).style.visibility = 'visible';
      this.cookieService.put('priv-vis','0');
    }
  }
  ngAfterContentChecked(){

    if(this.flag){
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
    this.userName = this.cookieService.get('UN');
    this.cookieService.put('UN', '');
  }
  if(this.cookieService.get('Water_Dispensing_Panel')=='1'){
    console.log((checkboxes[0] as HTMLInputElement).checked = true);
    this.cookieService.put('Water_Dispensing_Panel','0');
  }
  if(this.cookieService.get('RO_Parameters')=='1'){
    console.log((checkboxes[1] as HTMLInputElement).checked = true);
    this.cookieService.put('RO_Parameters','0');
  }
  if(this.cookieService.get('Transaction_Log')=='1'){
    console.log((checkboxes[2] as HTMLInputElement).checked = true);
    this.cookieService.put('Transaction_Log','0');
  }
  if(this.cookieService.get('Operator_Attendance')=='1'){
    console.log((checkboxes[3] as HTMLInputElement).checked = true);
    this.cookieService.put('Operator_Attendance','0');
  }
  if(this.cookieService.get('Cup_Dispensing_Panel')=='1'){
    console.log((checkboxes[4] as HTMLInputElement).checked = true);
    this.cookieService.put('Cup_Dispensing_Panel','0');
  }
  if(this.cookieService.get('Supervisor_Data')=='1'){
    console.log((checkboxes[5] as HTMLInputElement).checked = true);
    this.cookieService.put('Supervisor_Data','0');
  }
  for(let cluster of this.clusters){
    if(document.getElementById(cluster)){
      console.log('called1');
      var cluster_box = document.getElementById(cluster);
      if(this.cookieService.get(cluster)=='1'){
        console.log((cluster_box as HTMLInputElement).checked = true);
        this.cookieService.put(cluster, '0');
      }
      this.flag= false;
      
    }
  }


}
}
