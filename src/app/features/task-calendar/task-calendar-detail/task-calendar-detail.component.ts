import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-calendar-detail',
  templateUrl: './task-calendar-detail.component.html',
  styleUrls: ['./task-calendar-detail.component.scss']
})
export class TaskCalendarDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date; tasks: any[] }) {}


}
