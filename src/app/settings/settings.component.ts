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
  flagProperty:boolean=false;
  dropdown = Dropdown;
  dropdownSettings = {};
  propertydropdownSettings = {};
  paneldropdownSettings = {};
  prevClusters = [];
  tables=['WaterDispenseData','RoData','CupDispenseData']  
  parameters=[];
  selDrop1=[];
  selDrop2=[];
  selectedparameter =[this.selDrop1,this.selDrop2];
  selectedpanel=[[],[]]
  // url = "http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php";
  // url = "http://localhost:8000/assets/Php";
  url = "/iiot/assets/Php"
  
  
  constructor(private Cluster: Cluster, private cookieService:CookieService,private global : GlobalService) { }

  ngOnInit() {

    for (var table of this.tables){
      let i=0;
      for(var property of this.Cluster['NISE'][table][1]){
        if(this.parameters.indexOf(property)==-1){
          let obj = {
            name : this.Cluster['NISE'][table][0][i],
            title : property,
          }
          this.parameters.push(obj);
          this.selectedparameter[0].push(obj)
        }
        i=i+1;
      }
    }
    this.cookieService.put('prevDiv','Settings');
    console.log(this.parameters)
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
  };
  this.propertydropdownSettings = {
    idField: 'name',
    textField: 'title',
    singleSelection:false,
    allowSearchFilter : true,
    itemsShowLimit: 1,
};
this.paneldropdownSettings = {
  idField: 'columnName',
  textField: 'panelName',
  singleSelection:false,
  allowSearchFilter : true,
  itemsShowLimit: 1,
};
  }
  ngAfterContentChecked(){
    if(this.cookieService.get('priv-vis')=='1' && $('#get_user_form').length){
      (document.getElementById('priv') as HTMLDivElement).style.visibility = 'visible';
      console.log("after")
    }
            
      if($('#get_user_form').length){
        this.flag1 = true;
        this.flagProperty=true;
      }
      if(this.flag&&this.flag1){
        this.check(this,'panelP[]');
      }



  }

  onItemSelect(item:any,id){
    document.getElementById(item+id)["checked"] = true;
  }
  onDeSelect(item:any,id){
    document.getElementById(item+id)["checked"] = false;
  }
  onpropertySelect(item:any,id){
    document.getElementById(item.name+id)["checked"] = true;
  }
  onpropertyDeSelect(item:any,id){
    document.getElementById(item.name+id)["checked"] = false;
  }
  onpanelSelect(item:any,id){
    document.getElementById(item.columnName+id)["checked"] = true;
  }
  onpanelDeSelect(item:any,id){
    document.getElementById(item.columnName+id)["checked"] = false;
  }
  onSelectAll(item:any,name){
    console.log(item);
    var checkboxes = document.getElementsByName(name);
    for(var i=0, n=checkboxes.length;i<n;i++) {
      (checkboxes[i] as HTMLInputElement).checked = true;
    }
  }
  onDeSelectAll(item:any,name){
    var checkboxes = document.getElementsByName(name);
    for(var i=0, n=checkboxes.length;i<n;i++) {
      (checkboxes[i] as HTMLInputElement).checked = false;
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
  if(this.cookieService.get('Analysis_Panel')=='11'){
    console.log((checkboxes[6] as HTMLInputElement).checked = true);
    this.cookieService.put('Analysis_Panel','01');
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
  for(let parameter of this.parameters){
    if(document.getElementById(parameter.name)){
      console.log('called1');
      var parameter_box = document.getElementById(parameter.name);
      if(this.cookieService.get(parameter.name)=='11'){
        console.log((parameter_box as HTMLInputElement).checked = true);
        this.cookieService.put(parameter.name, '01');
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
    this.selectedpanel[1].push(
      {
        columnName: 'Water_Dispensing_Panel',
        panelName : 'Water Dispensing Panel'
      }
    )
  }
  if(this.cookieService.get('RO_Parameters')=='01'){
    console.log((checkboxes[1] as HTMLInputElement).checked = true);
    this.cookieService.put('RO_Parameters','00');
    this.selectedpanel[1].push(
      {
        columnName: 'RO_Parameters',
        panelName : 'RO Parameters'
      }
    )
  }
  if(this.cookieService.get('Transaction_Log')=='01'){
    console.log((checkboxes[2] as HTMLInputElement).checked = true);
    this.cookieService.put('Transaction_Log','00');
    this.selectedpanel[1].push(
      {
        columnName: 'Transaction_Log',
        panelName : 'Transaction Log'
      }
    )
  }
  if(this.cookieService.get('Operator_Attendance')=='01'){
    console.log((checkboxes[3] as HTMLInputElement).checked = true);
    this.cookieService.put('Operator_Attendance','00');
    this.selectedpanel[1].push(
      {
        columnName: 'Operator_Attendance',
        panelName : 'Operator Attendance'
      }
    )
  }
  if(this.cookieService.get('Cup_Dispensing_Panel')=='01'){
    console.log((checkboxes[4] as HTMLInputElement).checked = true);
    this.cookieService.put('Cup_Dispensing_Panel','00');
    this.selectedpanel[1].push(
      {
        columnName: 'Cup_Dispensing_Panel',
        panelName : 'Cup Dispensing Panel'
      }
    )
  }
  if(this.cookieService.get('Supervisor_Data')=='01'){
    console.log((checkboxes[5] as HTMLInputElement).checked = true);
    this.cookieService.put('Supervisor_Data','00');
    this.selectedpanel[1].push(
      {
        columnName: 'Supervisor_Data',
        panelName : 'Supervisor Data'
      }
    )
  }
  if(this.cookieService.get('Analysis_Panel')=='01'){
    console.log((checkboxes[6] as HTMLInputElement).checked = true);
    this.cookieService.put('Analysis_Panel','00');
    this.selectedpanel[1].push(
      {
        columnName: 'Analysis_Panel',
        panelName : 'Analysis Panel'
      }
    )
  }
  for(let cluster of this.clusters){
    if(document.getElementById(cluster)){
      console.log('called1');
      var cluster_box = document.getElementById(cluster);
      if(this.cookieService.get(cluster)=='01'){
        console.log((cluster_box as HTMLInputElement).checked = true);
        this.prevClusters.push(cluster);
        this.cookieService.put(cluster, '00');
      }

      
    }
  }
  for(let parameter of this.parameters){
    if(document.getElementById(parameter.name)){
      console.log('called1');
      var parameter_box = document.getElementById(parameter.name);
      if(this.cookieService.get(parameter.name)=='01'){
        console.log((parameter_box as HTMLInputElement).checked = true);
        this.selectedparameter[1].push(parameter);
        this.cookieService.put(parameter.name, '00');
      }
      this.flag= false;
      this.cookieService.put('priv-vis','0');      
      
      
    }
  }
  console.log(this.selectedparameter[1]);
}
}
