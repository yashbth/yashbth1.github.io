import { Component, OnInit, AfterViewInit,AfterContentChecked, Inject} from '@angular/core';
import {Cluster} from '../Clusters';
import { Dropdown} from '../machine/dropdown'
import '../../assets/scripts/settings_functions.js';
import { CookieService } from 'angular2-cookie/core';
import { GlobalService } from '../global.service';
import { FetchWaterDispenseDataService } from '../fetch-water-dispense-data.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

declare var $ : any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  clusters: any = this.Cluster.clusters;
  message_success : string = this.cookieService.get('message_success'); // message alert's on performing wrong request
  message_failure : string = this.cookieService.get('message_failure');
  priv_boolean :boolean = false;
  userName : string=this.global.user["0"].Username; // username of current user
  UserName : string;// username of User who's priveldges has to be checked
  flag : boolean = true;
  flag1 : boolean;
  flagProperty:boolean=false; // if property checkboxes is ready to fill or not
  dropdown = Dropdown; // Side navigation bar Panels
  dropdownSettings = {};
  propertydropdownSettings = {};
  paneldropdownSettings = {};
  prevClusters = [];
  tables=['WaterDispenseData','RoData','CupDispenseData']  // tables in Cluster's file
  parameters=[];
  selDrop1=[];
  selDrop2=[];
  selectedparameter =[this.selDrop1,this.selDrop2];
  selectedpanel=[[],[]]
  
  // Configuration File Data
  config_data : any;
  config_info : any;
  config_table = 'ConfigurationFile';
  config_filename : string='configData.php';
  tableActive : boolean = false;


  // url = "http://localhost/~yashbahetiiitk/swajal_dashboard/src/assets/Php";
  // url = "http://localhost:8000/assets/Php";
  url = "/iiot/assets/Php"
  
  
  constructor(private Cluster: Cluster, private cookieService:CookieService,private global : GlobalService,private service : FetchWaterDispenseDataService,@Inject(SESSION_STORAGE) private storage : StorageService) { }

  ngOnInit() {
    this.config_data= this.Cluster.config_params;
    this.config_info=[];
    // Visible only to admin
    if(!this.storage.get('config') && this.global.admin){
      this.service.getConfigData(this.config_filename).subscribe(info=>this.config_info=info,(err)=>console.error(err),()=>{   
        this.storage.set('config',this.config_info);   
      });
    }
    else if(this.storage.get('config') && this.global.admin){
      this.config_info= this.storage.get('config');
    }
    // configuration table becomes visible
    setTimeout(()=>{
      this.tableActive=true;
      $(document).ready(function(){
        $('#table').DataTable({
          scrollX: true,
          dom: 'Bfrtip',
          buttons: ['csv', 'excel','print']
        });
      })
    },1000)
    // All the properties which are present in Cluster file are first created as obj then pushed in selectedparameter [0] array
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
    // checkall the checkboxes corresponding to properties
    var checkboxes = document.getElementsByName('property[]');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      (checkboxes[i] as HTMLInputElement).checked = true;
    }
    this.cookieService.put('prevDiv','Settings');
    // Dropdown Settings
    this.dropdownSettings = {
      singleSelection: false, // if single selection is allowed set to true
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.propertydropdownSettings = {
      idField: 'name', // if selected parameter is of type obj then idField and textField='to be shown to user'
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
    // if user's privledges is received make them visible (only in Admin's case)
    if(this.cookieService.get('priv-vis')=='1' && $('#get_user_form').length){
      (document.getElementById('priv') as HTMLDivElement).style.visibility = 'visible';
    }
            
    if($('#get_user_form').length){
      this.flag1 = true;
      this.flagProperty=true;
    }
    // 
    if(this.flag&&this.flag1){
      this.check(this,'panelP[]');
    }
  }

  // Dropdown select method, on selecting parameter in dropdown what to do
  onItemSelect(item:any,id){
    document.getElementById(item+id)["checked"] = true;
  }
  // Similarly on deselecting
  onDeSelect(item:any,id){
    document.getElementById(item+id)["checked"] = false;
  }
  // Property Select Dropdown (ex:'Total_Volume_dispensed')
  onpropertySelect(item:any,id){
    document.getElementById(item.name+id)["checked"] = true;
  }
  onpropertyDeSelect(item:any,id){
    document.getElementById(item.name+id)["checked"] = false;
  }
  // panel Select dropdown(ex:'waterDispensing')
  onpanelSelect(item:any,id){
    document.getElementById(item.columnName+id)["checked"] = true;
  }
  onpanelDeSelect(item:any,id){
    document.getElementById(item.columnName+id)["checked"] = false;
  }
  onSelectAll(item:any,name){
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

  // To select all parrameters of the checkboxes
  toggle(source,name) {
    var checkboxes = document.getElementsByName(name);
    for(var i=0, n=checkboxes.length;i<n;i++) {
      console.log((checkboxes[i] as HTMLInputElement).checked = true);
    }
  }

// Set's cookie of all the properties and cluster to 01 and then to 00, 11 corresponds to priveledged property for user

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
  // Clusters which are already priveldged by user is set into dropdown checkboxes 
  for(let cluster of this.clusters){
    if(document.getElementById(cluster)){
      var cluster_box = document.getElementById(cluster);
      if(this.cookieService.get(cluster)=='11'){
        console.log((cluster_box as HTMLInputElement).checked = true);
        this.cookieService.put(cluster, '01');
      }
      // this.flag= false;
      
    }
  }
  // properties which are already priveldged by user is set into dropdown checkboxes 
  for(let parameter of this.parameters){
    if(document.getElementById(parameter.name)){
      var parameter_box = document.getElementById(parameter.name);
      if(this.cookieService.get(parameter.name)=='11'){
        console.log((parameter_box as HTMLInputElement).checked = true);
        this.cookieService.put(parameter.name, '01');
      }
      // this.flag= false;
      
    }
  }

  // Same procedure but changing cookies to 00 because on reloading the checkboxes which were selected vanished
  if(this.cookieService.get('UN')){
    this.UserName = this.cookieService.get('UN');
    this.cookieService.put('UN', '');
  }
  if(this.cookieService.get('Water_Dispensing_Panel')=='01'){
    console.log((checkboxes[0] as HTMLInputElement).checked = true);
    this.cookieService.put('Water_Dispensing_Panel','00');
    // Panel's which are already priveldged by user is set into dropdown checkboxes 
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
  // Clusters which are already priveldged by user is set into dropdown checkboxes 
  for(let cluster of this.clusters){
    if(document.getElementById(cluster)){
      var cluster_box = document.getElementById(cluster);
      if(this.cookieService.get(cluster)=='01'){
        console.log((cluster_box as HTMLInputElement).checked = true);
        this.prevClusters.push(cluster);
        this.cookieService.put(cluster, '00');
      }

      
    }
  }
  // properties which are already priveldged by user is set into dropdown checkboxes 
  for(let parameter of this.parameters){
    if(document.getElementById(parameter.name)){
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
}
}
