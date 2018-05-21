import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router' 
import {MachineComponent} from './machine/machine.component'
import {AppComponent} from './app.component'
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {path : 'device/:id' , component: MachineComponent},
  {path : 'device/:id/:panel' , component : WaterDispenseComponent}
  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{enableTracing:true})
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
