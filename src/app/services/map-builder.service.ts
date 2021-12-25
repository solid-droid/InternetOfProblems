import { Injectable } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MapBuilderService {
  private z = 5;
  private x = 0;
  private y = 0;

  private bufferMap:any = []
  private neighbours = [
    [-1, -1], [-1,  0], [-1,  1],
    [ 0, -1], [ 0,  0], [ 0,  1], 
    [ 1, -1], [ 1,  0], [ 1,  1]
 ];
  //used for lazy loading
  private mapGridSize = [100 ,100];

  private mapData:any = [];
  private mapUpdateCallbacks:any = [];
  private afterMapUpdateCallbacks:any = [];

  public displayData:any = [];

  constructor(
    private readonly sharedData : SharedDataService
  ) {}
  private getMapData() {

    this.mapData = [
      {
        x : 0,
        y : 0,
        z: 5,
        content: {
          id: 0,
          type: 'solution',
          text: 'Hello World2',
          vote: 5,
          children:[1, 7],
          parent:[]
        }
      },
      {
        x : 0,
        y : 120,
        z: 5,
        content: {
          id: 7,
          type: 'solution',
          text: 'Hello World1',
          vote: 5,
          children:[],
          parent:[0, 1]
        }
      },
      {
        x: 150,
        y: 110,
        z: 5,
        content: {
          id: 1,
          type: 'problem',
          text: 'Hello World Test',
          vote: 5,
          children: [7],
          parent: [0]
        }
      },
      {
        x : 0,
        y : 0,
        z: 4,
        content: {
          id: 2,
          type: 'problem',
          text: 'Hello World level4',
          vote: 5,
          children: [],
          parent: []
        }
      },
      {
        x: 100,
        y: 100,
        z: 4,
        content: {
          id: 3,
          type: 'problem',
          text: 'Hello World Test level4',
          vote: 5,
          children: [],
          parent: []
        }
      }
    ];

    this.mapData.forEach((item:any) => {
      item['gridX'] = Math.trunc(item.x / this.mapGridSize[0]);
      item['gridY'] = Math.trunc(item.y / this.mapGridSize[1]);
    });
  }
  public async init(){

    this.getMapData();
    this.sharedData.getZoomLevel.subscribe(zoomLevel => {
      this.z = zoomLevel
      this.updateMap();
    });
    this.sharedData.getOrigin.subscribe(origin => {
      this.x = Math.trunc(origin[0] / this.mapGridSize[0]);
      this.y = Math.trunc(origin[1] / this.mapGridSize[1]);
      this.bufferMap = this.neighbours.map(([dx, dy]) => ({ x: dx - this.x, y: dy - this.y }));
      this.updateMap();
    });
  }

  public beforeMapUpdate( name:string , callback:any){
    this.mapUpdateCallbacks.push({name,callback});
  }

  public afterMapUpdate( name:string , callback:any){
    this.afterMapUpdateCallbacks.push({name,callback});
  }

  public removeAfterMapUpdate( name:string){
    this.afterMapUpdateCallbacks = this.afterMapUpdateCallbacks.filter((item:any) => item.name!==name);

  }

  public removeBeforeMapUpdate(name:string){
    this.mapUpdateCallbacks = this.mapUpdateCallbacks.filter((item:any) => item.name!==name);
  }

  private async updateMap() {
    //when panned or zoomed or time changed
    const newMap = this.mapData.filter((item:any) => 
                   item.z===this.z && this.bufferMap.some((item2:any) => 
                   item2.x === item.gridX && item2.y=== item.gridY));

    const oldNodes = this.displayData.filter((item:any) => !newMap.includes(item));
    const newNodes = newMap.filter((item:any) => !this.displayData.includes(item));

    this.mapUpdateCallbacks.forEach((item:any) => item.callback(newMap , oldNodes, newNodes));

    this.displayData = newMap;
    await new Promise(resolve => setTimeout(resolve, 10));
    if(oldNodes.length || newNodes.length){
      this.afterMapUpdateCallbacks.forEach((item:any) => item.callback(newMap));
    }

  }


      
}
