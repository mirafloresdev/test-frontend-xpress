import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskCalendarDetailComponent } from './task-calendar-detail/task-calendar-detail.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    CalendarComponent,
    TaskCalendarDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  exports: [
    CalendarComponent,
    TaskCalendarDetailComponent
  ]
})
export class TaskCalendarModule { }
