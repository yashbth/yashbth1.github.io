import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from 'angular2-chartjs'
import { AppComponent } from './app.component';
import { MachineComponent } from './machine/machine.component';
import { AppRoutingModule } from './/app-routing.module';
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { ChartsComponent } from './charts/charts.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorChartsComponent } from './charts/operatorcharts.component';
import { SupervisorChartsComponent } from './charts/supervisorcharts.component';

import { GlobalService } from './global.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SearchDevicesComponent } from './search-devices/search-devices.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { Cluster } from './delhiCluster';





@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    WaterDispenseComponent,
    ChartsComponent,
    SupervisorComponent,
    TransactionComponent,
    OperatorComponent,
    OperatorChartsComponent,
    SupervisorChartsComponent,
    SearchDevicesComponent,
    ErrorComponent,
    LoadingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    FormsModule
  ],
  providers: [FetchWaterDispenseDataService,GlobalService,CookieService,Cluster],
  bootstrap: [AppComponent]                                                                                                                                                                                                                                                                                                                                                                                                     
})

export class AppModule { }
