import { Component, OnInit } from '@angular/core';
declare const panzoom:any;
declare const $:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map:any;
  constructor() { }

  ngOnInit(): void {
    const container = document.querySelector('#mapContent');
    this.map = panzoom(container, {
			maxZoom: 1,
			minZoom: 0.1,
			zoomDoubleClickSpeed: 1,
      initialX: 0,
      initialY: 0,
      initialZoom: 0.5,
  });
  }

}
