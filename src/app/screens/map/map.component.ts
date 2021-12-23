import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
declare const panzoom:any;
declare const $:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map:any;
  zoomLevel = 5;
  constructor(
    private readonly sharedData : SharedDataService
  ) { }

  ngOnInit(): void {
    const container = document.querySelector('#mapContent');
    this.map = panzoom(container, {
			maxZoom: 1,
			minZoom: 0.1,
			zoomDoubleClickSpeed: 1,
      initialX: 0,
      initialY: 0,
      initialZoom: 0.5,
      beforeWheel: (e:any) => {
        this.updateZoomLevel(e.deltaY > 0 ? 1 : -1);
        return true;
      }
  });
  }

  updateZoomLevel(direction:number){
    this.zoomLevel = Math.min(Math.max(this.zoomLevel + direction, 0), 5);
    this.sharedData.setZoomLevel(this.zoomLevel);
  }

}
