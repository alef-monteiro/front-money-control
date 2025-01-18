import { Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DefaultHomeLayoutComponent} from './components/default-home-layout/default-home-layout.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: "landing-page",
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: DefaultHomeLayoutComponent
  }
];
