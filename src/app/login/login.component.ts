///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {

  }

  login() {
    Cookie.save('username','duguangyan');
    this.router.navigate(['']);
  }

}
