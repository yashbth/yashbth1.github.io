import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from 'angular2-chartjs'
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { MachineComponent } from './machine/machine.component';
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';
import { ChartsComponent } from './charts/charts.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorChartsComponent } from './charts/operatorcharts.component';
import { SupervisorChartsComponent } from './charts/supervisorcharts.component';
import {AnalysisChartsComponent} from './charts/analysischarts.component';

import { GlobalService } from './global.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SearchDevicesComponent } from './search-devices/search-devices.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { Cluster } from './delhiCluster';
import { ClickDetectionDirective } from './click-detection.directive';
import {StorageServiceModule} from 'angular-webstorage-service'
import { AuthService } from './auth.service';
import { AnalysisComponent } from './analysis/analysis.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportComponent } from './report/report.component';





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
    ClickDetectionDirective,
    AnalysisComponent,
    AnalysisChartsComponent,
    SettingsComponent,
    ReportComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    StorageServiceModule
    
  ],
  providers: [AuthService,FetchWaterDispenseDataService,GlobalService,CookieService,Cluster],
  bootstrap: [AppComponent]                                                                                                                                                                                                                                                                                                                                                                                                     
})

export class AppModule { }
