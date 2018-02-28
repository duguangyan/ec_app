import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.css']
})
export class TopsComponent implements OnInit {
  @Input() msg;
  @Output() topsCloseOutput = new EventEmitter<any>();
  @Output() topsRightOutput = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  topsClose(){
    this.topsCloseOutput.emit();
  }

  topsRight(){
    this.topsRightOutput.emit();
  }
}
