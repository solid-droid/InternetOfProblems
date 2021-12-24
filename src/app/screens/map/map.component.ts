import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
declare const panzoom:any;
declare const $:any;
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
      this.updateLinePosition();
      const transform = this.map.getTransform();
      this.sharedData.setOrigin([transform.x, transform.y]);
    }).on('panend', async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      this.updateLinePosition();
    });
    
    this.$subscription1 = this.sharedData.getZoomLevel.subscribe(zoomLevel => this.zoomLevel = zoomLevel);
    this.mapBuilder.beforeMapUpdate('mapScreen',(mapData:any, garbage:any) => this.beforeMapUpdate(mapData, garbage))
    this.mapBuilder.afterMapUpdate('mapScreen',(mapData:any) => this.afterMapUpdate(mapData))

  }

  beforeMapUpdate(mapData:any , garbage:any){
    const connections:any = [];
    garbage.forEach((item:any) => {
      if(['problem','solution'].includes(item.content.type)){
        if(item.content.connectTo.length){
          connections.push({id : item.content.id , toID : item.content.connectTo}) 
        }
      }
    });
    const garbageIDs = garbage.map((item:any) => item.content.id);
    this.clearConnections(connections , garbageIDs);
  }

  async afterMapUpdate(mapData:any){
    this.addConnection(mapData);
  }

  addConnection(mapData:any){
    const connections:any = [];
    mapData.forEach((item:any) => {
      if(['problem','solution'].includes(item.content.type)){
        if(item.content.connectTo.length){
          connections.push({id : item.content.id , toID : item.content.connectTo}) 
        }
      }
    });
    this.drawLine(connections);
  };

  updateLinePosition(){
    let remove = false;
    const removeList:any = [];
    this.lines.forEach((item:any, index:number) => {
      for( let i = 0 ; i < item.lines.length ; i++){
        try{
          item.lines[i].position();
        }catch(e){
          //removing line since from to connection is not found
          // remove = true;
          // removeList.push(index);
          break;
        }
      }
    });
    if(remove){
      removeList.forEach((index:number) => {
        this.lines[index].lines.forEach((line:any) => {
          line.remove();
        });
        this.lines.splice(index,1);
      });
    }
  }

drawLine(connections:any){
    connections.forEach((item:any) => {
      if(!this.lines.find((item2:any) => item2.id === item.id)){
        const lines:any = [];
        item.toID.forEach(async (toID:any) => {
          let from = document.getElementById(item.id);
          let to = document.getElementById(item.toID);
          let counter = 100;
          while(!from || !to){
            await new Promise(resolve => setTimeout(resolve, 10));
            from = document.getElementById(item.id);
            to = document.getElementById(item.toID);
            if(counter-- === 0){
              break;
            }
          }

          if(from && to){
            lines.push(new LeaderLine(from,to));
          }
        });
        console.log('test');
        lines.forEach((line:any) => {
          line.position();
        });
        this.lines.push({id : item.id , toID : item.toID, lines : lines});
      }
    });
  }


  clearConnections(connections:any , fromIDs:any = []){
    if(connections.length){
      connections.forEach((item:any) => {
        //checking To connection
        const id = this.lines.findIndex((e:any) => e.id === item.id);
        if(id > -1){
          this.lines[id].lines.forEach((line:any) => {
            line.remove();
          });
          this.lines.splice(id, 1);
        }
      });
  }
    
  }
  updateZoomLevel(direction:number){
    this.zoomLevel = Math.min(Math.max(this.zoomLevel + direction, 0), 5);
    this.sharedData.setZoomLevel(this.zoomLevel);
  }

}
