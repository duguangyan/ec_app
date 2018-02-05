import {SettingsComponent} from '../app/pages/settings/settings.component';
import {Routes} from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {MainComponent} from '../app/main/main.component';
import {HomeComponent} from '../app/pages/home/home.component';
import {SearchComponent} from '../app/pages/search/search.component';
import {ExplainComponent} from '../app/pages/home/explain/explain.component';
import {ForgetPasswordComponent} from '../app/login/forget-password/forget-password.component';
import {RegisterComponent} from '../app/login/register/register.component';
import {ProtocolComponent} from '../app/login/register/protocol/protocol.component';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'protocol',
    component: ProtocolComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'home-explain', component: ExplainComponent },
      { path: 'search', component: SearchComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }

];
