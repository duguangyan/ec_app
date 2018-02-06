import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public navNumber: any;
  public lists: any;
  public navOrders: number[];
  public navs: string[];

  constructor(public httpService: HttpService, public router: Router) {
    this.navs = ['全部订单','待付款','找料中','已完成'];
    this.navOrders = [5,4,6,7];
    this.navNumber = 0;
    this.lists = [];
    this.getListDetail();
  }

  ngOnInit() {
  }
  // 返回上一级
  goback() {
    window.history.go(-1);
  }

  // 切换头部navs
  checkNavs(i) {
    this.navNumber = i;
  }
// 获取列表信息
  getListDetail() {
    if(!Cookie.load('userId')){
      return false;
    }
    const params = {
      user_id: Cookie.load('userId')
    }
    this.httpService.get('/find/demand/get', {params} ).subscribe((res: any)=>{
      if(res.code>=0){
        console.log(res);
        this.lists = res.data;
      }
    });
  }

  // 去列表详情
  goListDetail(id) {
    this.router.navigate(['orderlistdetail'],{queryParams:{id}});
  }
}
