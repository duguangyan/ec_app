import {Component, OnInit} from '@angular/core';
import {Cookie} from 'angular2-cookies';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public username: string;
  constructor(
    public router: Router
  ) { }
  ngOnInit() {
    this.router.navigate(['home']);
    /*this.username = Cookie.load("username");
    if(this.username == null){
      this.router.navigate(['login']);
    }*/

  }
}



