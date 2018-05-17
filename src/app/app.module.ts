import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { MachineComponent } from './machine/machine.component';
import { AppRoutingModule } from './/app-routing.module';
import { WaterDispenseComponent } from './water-dispense/water-dispense.component';
import { FetchWaterDispenseDataService } from './fetch-water-dispense-data.service';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    WaterDispenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [FetchWaterDispenseDataService],
  bootstrap: [AppComponent,MachineComponent]
})

export class AppModule { }
