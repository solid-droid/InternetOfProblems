import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrls: ['./zoom-control.component.scss']
})
export class ZoomControlComponent implements OnInit, OnDestroy {

  value = 5;
  options = {
    floor: 0,
    ceil: 5,
    step: 1,
    showTicks: true,
    vertical: true,
    showTicksValues: true
  };

  $subscription1:any;

  constructor(
    private readonly sharedData : SharedDataService
  ) { }

  ngOnDestroy() {
   this.$subscription1.unsubscribe();
  }

  ngOnInit(): void {
    this.$subscription1 = this.sharedData.getZoomLevel.subscribe(zoomLevel => {
      this.value = zoomLevel;
    });
  }

  updateZoom(){
    this.sharedData.setZoomLevel(this.value);
  }

}
