import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {TotastService} from '../../service/totast.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLogin: boolean = false;
  constructor(
    public activatedRoute: ActivatedRoute,   //这里需要注入ActivatedRoute模块
    public router: Router,
    public httpService: HttpService,
    public totastService: TotastService
  ) {
    /*activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      let title = queryParams.title;
      console.log(title);
    });*/
  }

  ngOnInit() {
    //console.log(1);
  }

  search() {
    if(!Cookie.load('username')){
      this.isLogin = true;
    }else{
      this.router.navigate(['search']);
    }
  }

  toLogin(){
    this.isLogin = false;
    this.router.navigate(['login']);
  }
}
