import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router' 
import {MachineComponent} from './machine/machine.component'
import {AppComponent} from './app.component'

const routes: Routes = [
  { path: '', component: AppComponent },
  {path : 'machineId' , component: MachineComponent}
  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
