import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "../../shared/guards/auth.guard";
import {TaskListComponent} from "../task/task-list/task-list.component";
import { CalendarComponent } from '../task-calendar/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
      { path: 'calendar', component: CalendarComponent,canActivate: [authGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
