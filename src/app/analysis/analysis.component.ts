import { Component, OnInit,HostListener, ElementRef } from '@angular/core';
import {AnalysisOptions} from '../analysis'
import {Cluster} from '../delhiCluster'
import {Observable, Subject} from 'rxjs'
import {
  debounce,distinctUntilChanged,switchMap, debounceTime,throttleTime
} from 'rxjs/operators'
import {Property} from '../users'
declare var $ : any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {
  title : string = 'Welcome to the Swajal Dashboard'
  addInfo =  Date();
  checkfill = '';
  checkfillObject: any;
  y1 : string='';
  y2 : string='';
  y=[];
  x : string='';
  type : string='';
  chartData : any;
  options = AnalysisOptions;
  parameters =[];
  tables=['WaterDispenseData','RoData','CupDispenseData','supervisorData','operator']  
  parameter$ = [];
  private searchTerms = new Subject<string>();
  constructor( private cluster : Cluster) { }

  @HostListener('document:click', ['$event.target.className'])
    public onClick(targetElement) {
      console.log(targetElement.search('parameterX'));
      const clickedInside = targetElement.search('parameterX');
      if (clickedInside==-1) {
        this.parameter$ = [];  
      }
    }
  ngOnInit() {
    for (var table of this.tables){
      for(var property of this.cluster['NISE'][table][1]){
        if(this.parameters.indexOf(property)==-1){
          this.parameters.push(property);
        }

      }
    }
  
  }

  showresults(input){

    if(input!=''){
      this.parameter$ = this.findProperty(input); 
    }
    else{
      this.parameter$=[]
    }
    // console.log(this.parameter$);
  }
  fill(option){
    this.checkfill=option.value
    this.checkfillObject = option;
  }
  findProperty(term){
    let items=[];
    // console.log(term);    
    this.parameters.forEach(function(item){
      if(item.search(term)==-1){
        return ''
      }
      return items.push(item)
    })
    return items
  }
  

}
