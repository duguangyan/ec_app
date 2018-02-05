import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,   //这里需要注入ActivatedRoute模块
    private router: Router
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      let title = queryParams.title;
      console.log(title);
    });
  }

  ngOnInit() {
    console.log(1);
  }

  search() {
    this.router.navigate(['search']);
  }
}
