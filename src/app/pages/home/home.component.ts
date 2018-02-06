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

  constructor(
    private activatedRoute: ActivatedRoute,   //这里需要注入ActivatedRoute模块
    private router: Router,
    private httpService: HttpService,
    private totastService: TotastService
  ) {
    /*activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      let title = queryParams.title;
      console.log(title);
    });*/
  }

  ngOnInit() {
    console.log(1);
  }

  search() {
    if(!Cookie.load('username')){
      this.totastService.open('请先登陆',()=>{
        this.router.navigate(['login']);
      });
    }
  }
}
