import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
declare const panzoom:any;
declare const $:any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map:any;
  zoomLevel = 5;
  $subscription1:any;
  lines:any = [];
  constructor(
    private readonly sharedData : SharedDataService,
    public readonly mapBuilder : MapBuilderService
  ) { }
  ngOnDestroy() {
    this.$subscription1.unsubscribe();
    this.mapBuilder.removeBeforeMapUpdate('mapScreen');
    this.mapBuilder.removeAfterMapUpdate('mapScreen');
  }

  ngOnInit(): void {
    const container = document.querySelector('#mapContent');
    this.map = panzoom(container, {
			zoomDoubleClickSpeed: 1,
      initialX: 0,
      initialY: 0,
      initialZoom: 1,
      beforeWheel: (e:any) => {
        this.updateZoomLevel(e.deltaY > 0 ? 1 : -1);
        return true;
      }
    }).on('pan', () => {
      const transform = this.map.getTransform();
      this.sharedData.setOrigin([transform.x, transform.y]);
    }).on('panend', async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    this.$subscription1 = this.sharedData.getZoomLevel.subscribe(zoomLevel => this.zoomLevel = zoomLevel);
    this.mapBuilder.beforeMapUpdate('mapScreen',(mapData:any, oldNodes:any, newNodes:any) => this.beforeMapUpdate(mapData, oldNodes, newNodes))
    this.mapBuilder.afterMapUpdate('mapScreen',(mapData:any) => this.afterMapUpdate(mapData))

  }

  beforeMapUpdate(mapData:any , oldNodes:any , newNodes:any){
    if(oldNodes.length){

    }

    if(newNodes.length){

    }
  }

  afterMapUpdate(mapData:any){
    console.log(mapData);
  }



  drawLine(connections:any){
  
  }


    
  updateZoomLevel(direction:number){
    this.zoomLevel = Math.min(Math.max(this.zoomLevel + direction, 0), 5);
    this.sharedData.setZoomLevel(this.zoomLevel);
  }

}
