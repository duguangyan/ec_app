import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var layer: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(".dd").click(()=>{
      layer.alert('内容');
    })
  }

}
