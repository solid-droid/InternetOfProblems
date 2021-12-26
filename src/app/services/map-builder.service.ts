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
  private mapGridSize = [1000 ,1000];

  private mapData:any = [];
  private mapUpdateCallbacks:any = [];

  public displayData:any = [];

  constructor(
    private readonly sharedData : SharedDataService
  ) {}
  private getMapData() {

    this.mapData = [
      {
        x : 0,
        y : 100,
        z: 5,
        t: '01/07/2018',
        content: {
          id: 0,
          type: 'problem',
          summary: 'Hello World2',
          description:'This is a test',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            upVote: 0,
            downVote: 0,
            comments: 0,
            countries: []
          },
          children:[1, 7],
          parents:[]
        }
      },
      {
        x : 300,
        y : 200,
        z: 5,
        t: '01/07/2018',
        content: {
          id: 7,
          type: 'solution',
          summary: 'Hello World1',
          description:'This is a test',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            upVote: 0,
            downVote: 0,
            comments: 0,
            countries: []
          },
          children:[],
          parents:[0]
        }
      },
      {
        x: 300,
        y: 0,
        z: 5,
        t: '01/07/2018',
        content: {
          id: 1,
          type: 'solution',
          summary: `Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  sjafhjsahfjahfjkashfjak kasjfka jasfhjasf 
                  Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  sjafhjsahfjahfjkashfjak kasjfka jasfhjasf
                  `,
          description:'This is a test',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            upVote: 0,
            downVote: 0,
            comments: 0,
            countries: []
          },
          children: [],
          parents: [0]
        }
      },
      {
        x : 0,
        y : 0,
        z: 4,
        t: '01/07/2018',
        content: {
          id: 2,
          type: 'problem',
          summary: 'Hello World level4',
          description:'This is a test',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            upVote: 0,
            downVote: 0,
            comments: 0,
            countries: []
          },
          children: [],
          parents: []
        }
      },
      {
        x: 100,
        y: 100,
        z: 4,
        t: '01/07/2018',
        content: {
          id: 3,
          type: 'problem',
          summary: 'Hello World Test level4',
          description:'This is a test',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            upVote: 0,
            downVote: 0,
            comments: 0,
            countries: []
          },
          children: [],
          parents: []
        }
      }
    ];

    this.mapData.forEach((item:any) => {
      item['gridX'] = Math.trunc(item.x / this.mapGridSize[0]);
      item['gridY'] = Math.trunc(item.y / this.mapGridSize[1]);
    });
  }
  public async init(){
    await new Promise(r => setTimeout(r, 10));
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

    if(newNodes.length || oldNodes.length){
      this.mapUpdateCallbacks.forEach((item:any) => item.callback(newMap , oldNodes, newNodes));
      this.displayData = newMap;
    }


  }


      
}
