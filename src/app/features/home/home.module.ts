import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HomeRoutingModule} from "./home-routing.module";
import {TaskModule} from "../task/task.module";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TaskModule,
  ]
})
export class HomeModule { }
