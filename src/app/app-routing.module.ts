import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginFormComponent} from "./features/auth/login-form/login-form.component";
import {RegistrationFormComponent} from "./features/auth/registration-form/registration-form.component";
import {DashboardComponent} from "./features/home/dashboard/dashboard.component";
import {authGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'register',
    component: RegistrationFormComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
