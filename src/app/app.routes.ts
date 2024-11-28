import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { canActivateGuard } from './core/guards/auth-guard';
import { UserComponent } from './pages/user/user.component';
import { TimesheetComponent } from '@pages/timesheet/timesheet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/signup',

    component: SignUpComponent,
  },
  {
    path: 'home',
    canActivate: [canActivateGuard],

    component: UserComponent,
  },
  {
    path: 'timesheet',

    component: TimesheetComponent,
  },
  { path: '**', redirectTo: '/home' },
];
