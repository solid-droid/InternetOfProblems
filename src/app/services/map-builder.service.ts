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
          text: 'Hello World',
          vote: 5,
          connectTo:[],
        }
      },
      {
        x : 0,
        y : 120,
        z: 5,
        content: {
          id: 7,
          type: 'solution',
          text: 'Hello World',
          vote: 5,
          connectTo:[],
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
          connectTo: [7]
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
          connectTo: []
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
          connectTo: []
        }
      }
    ];

    this.mapData.forEach((item:any) => {
      item['gridX'] = Math.trunc(item.x / this.mapGridSize[0]);
      item['gridY'] = Math.trunc(item.y / this.mapGridSize[1]);
    });
  }
  public init(){

    this.getMapData();

    this.sharedData.getZoomLevel.subscribe(zoomLevel => {
      this.z = zoomLevel
      this.updateMap();
    });
    this.sharedData.getOrigin.subscribe(origin => {
      this.x = Math.trunc(origin[0] / this.mapGridSize[0]);
      this.y = Math.trunc(origin[1] / this.mapGridSize[1]);
      this.bufferMap = this.neighbours.map(([dx, dy]) => ({ x: this.x + dx, y: this.y + dy }));
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

    const garbage = this.displayData.filter((item:any) => !newMap.includes(item));

    this.mapUpdateCallbacks.forEach((item:any) => item.callback(newMap , garbage))

    this.displayData = newMap;
    
    await new Promise(resolve => setTimeout(resolve, 10));
    this.afterMapUpdateCallbacks.forEach((item:any) => item.callback(newMap))
  }


      
}
