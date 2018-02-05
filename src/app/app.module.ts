import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {ROUTES} from '../router/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { ExplainComponent } from './pages/home/explain/explain.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {HttpService} from './service/http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TotastService} from './service/totast.service';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { RegisterComponent } from './login/register/register.component';
import { ProtocolComponent } from './login/register/protocol/protocol.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    MainComponent,
    SearchComponent,
    ExplainComponent,
    FooterComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    ProtocolComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    HttpService,
    TotastService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
