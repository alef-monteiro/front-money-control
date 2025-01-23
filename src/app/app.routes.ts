import {Routes} from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {CardsComponent} from './pages/cards/cards.component';
import {ProfileComponent} from './pages/profile/profile.component';

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
    component: HomeComponent
  }, {
    path: 'cards',
    component: CardsComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }
];
