import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';

@Component({
  selector: 'app-order-list-detail',
  templateUrl: './order-list-detail.component.html',
  styleUrls: ['./order-list-detail.component.css']
})
export class OrderListDetailComponent implements OnInit {
  public queryParams: any;
  public id: any;
  public data: any = {};

  constructor(public activatedRoute: ActivatedRoute,
              public httpService: HttpService,
              public router: Router,
              public totastService: TotastService) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
      const params = {
        user_id:Cookie.load('userId'),
        id:this.id,
        salesman_id:''
      }
      this.httpService.get('/find/demand/info',{params}).subscribe((res:any)=>{
        console.log(res);
        if(res.code>=0) {
          this.data = res.data;
          if(this.data.sampling_type === 1){
            this.data.sampling_type_new = '在线图片';
          }else if(this.data.sampling_type === 2){
            this.data.sampling_type_new = '上门取样';
          }else if(this.data.sampling_type === 3){
            this.data.sampling_type_new = '寄送样品';
          }
        }else{
          this.totastService.waring('数据请求失败');
        }
      })
    });
  }

  ngOnInit() {

  }
  //返回上一页
  goback(){
    window.history.go(-1);
  }

  goPayment() {
    this.router.navigate(['paydo'],{ queryParams : {id:this.data.id}});
  }

}
