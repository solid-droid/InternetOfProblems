import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrls: ['./zoom-control.component.scss']
})
export class ZoomControlComponent implements OnInit {

  value = 5;
  options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    vertical: true,
    showTicksValues: true
  };
  constructor() { }

  ngOnInit(): void {


  }

}
