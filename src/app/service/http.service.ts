import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';

@Injectable()
export class HttpService {
  public API_ENDPOINT :any ;
  constructor(public http: HttpClient,
              public router: Router) {
    this.API_ENDPOINT = 'http://120.77.209.176:38000';
  }

  //是否登录
  isLogin(){
    if(Cookie.load('username')){
      this.router.navigate(['login']);
      return false;
    }
  }
  // get请求
  get(url,params){
    //this.isLogin();
    return this.http.get(this.API_ENDPOINT+url,params);
  }
  //post请求
  post(url,params){
    //this.isLogin();
    return this.http.post(this.API_ENDPOINT+url,params);
  }
}
