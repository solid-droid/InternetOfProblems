import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
declare const panzoom:any;
declare const LeaderLine:any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map:any;
  zoomLevel = 5;
  $subscription1:any;
  lines:any = {};
  dataMap:any = [];

  constructor(
    private readonly sharedData : SharedDataService,
    public readonly mapBuilder : MapBuilderService
  ) { }
  ngOnDestroy() {
    this.$subscription1.unsubscribe();
    this.mapBuilder.removeBeforeMapUpdate('mapScreen');
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
      this.updateLinePosition();
    }).on('panend', async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
      this.updateLinePosition();
    });
    
    this.$subscription1 = this.sharedData.getZoomLevel.subscribe(zoomLevel => this.zoomLevel = zoomLevel);
    this.mapBuilder.beforeMapUpdate('mapScreen',(mapData:any, oldNodes:any, newNodes:any) => this.beforeMapUpdate(mapData, oldNodes, newNodes));
  }

  beforeMapUpdate(mapData:any , oldNodes:any , newNodes:any){

      const oldConnections = new Set();
      const newConnections = new Set();

      oldNodes.forEach((node:any) => {
          node.content.parents.forEach((id:number) => {
            oldConnections.add(`${id}-${node.content.id}`);
          });
          node.content.children.forEach((id:number) => {
            oldConnections.add(`${node.content.id}-${id}`);
          });
      });


      newNodes.forEach((node:any) => {
        node.content.parents.forEach((id:number) => {
          newConnections.add(`${id}-${node.content.id}`);
        });
        node.content.children.forEach((id:number) => {
          newConnections.add(`${node.content.id}-${id}`);
        });

      });
      this.removeOldConnections([...oldConnections]);
      this.dataMap = mapData;
      this.drawNewConnections([...newConnections]);
  }

  updateLinePosition(){
    Object.values(this.lines).forEach((line:any) => {
      try{
        line.position();
      } catch(e){

      }

    });
  }

  removeOldConnections(connections:any){
    connections.forEach((line:any) => {
      if(this.lines[line]) {
        try{
          this.lines[line].remove();
        }catch(e){
        }
      }
    });

  }

  async drawNewConnections(connections:any){
    await new Promise(r => setTimeout(r, 10));
    const getRef = (id:string) => document.getElementById(id);
    connections.forEach((line:any) => {
      const [start, end] = line.split('-');
      try{
        this.lines[line] = new LeaderLine(getRef(start) , getRef(end));
      } catch(e){

      }

    });
  }
    
  updateZoomLevel(direction:number){
    this.zoomLevel = Math.min(Math.max(this.zoomLevel + direction, 0), 5);
    this.sharedData.setZoomLevel(this.zoomLevel);
  }

}
