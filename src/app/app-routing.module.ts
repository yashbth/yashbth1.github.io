import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router' 
import {MachineComponent} from './machine/machine.component'
import {AppComponent} from './app.component'
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { OperatorComponent } from './operator/operator.component';
import { ErrorComponent } from './error/error.component';
import {SettingsComponent} from './settings/settings.component'
import {ReportComponent} from './report/report.component'

const routes: Routes = [
  { path: '', component: AppComponent },
  {path : ':cluster/:id' , component: MachineComponent},  
  {path : ':cluster/:id/report', component : ReportComponent},            
  {path : ':cluster/:id/settings' , component : SettingsComponent},    
  {path : ':cluster/:id/transactionLog', component : TransactionComponent},
  {path : ':cluster/:id/supervisor', component : SupervisorComponent},
  {path : ':cluster/:id/operator',component : OperatorComponent},
  {path : ':cluster/:id/error',component : ErrorComponent},
  {path : ':cluster/:id/:panel' , component : WaterDispenseComponent}, 
   
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
