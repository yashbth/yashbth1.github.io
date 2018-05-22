import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router' 
import {MachineComponent} from './machine/machine.component'
import {AppComponent} from './app.component'
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';
import { TransactionComponent } from './transaction/transaction.component';

import { SupervisorComponent } from './supervisor/supervisor.component';

import { OperatorComponent } from './operator/operator.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  {path : 'device/:id' , component: MachineComponent},
  {path : 'device/:id/transactionLog', component : TransactionComponent},

  {path : 'device/:id/supervisor', component : SupervisorComponent},
  {path : 'device/:id/operator',component : OperatorComponent},
  {path : 'device/:id/:panel' , component : WaterDispenseComponent},

  // {path : 'device/:id/transactionLog', component : TransactionComponent}
  
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
