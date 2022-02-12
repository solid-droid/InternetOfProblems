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
  public filteredMapData:any = {};
  private mapData:any = [];
  private mapUpdateCallbacks:any = [];
 
  public displayData:any = [];

  constructor(
    private readonly sharedData : SharedDataService
  ) {}
  private getMapData() {

    this.mapData = [
      {
        z: 5,
        x:1,
        t: '01/07/2018',
        latest: true,
       
          refID: 0,
          ver: '1.0',
          type: 'Problem',
          summary: 'Hello World2',
          description:'This is a testfgdg',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          controls:{
            relatedOpen: false,
          },
          related: [
            { refID: 2, summary:'Hello World level4' },
            { refID: 2, summary:`Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
            jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf `},
            { refID: 3, summary:'Hello World level4' },
          ],
          stats: {
            vote: 999,
            comments: 0,
            countries: []
          },
          children:[1, 7, 12],
          parents:[]
      },
      {
        z: 5,
        x:2,
        t: '08/07/2018',
        latest: true,
       
          refID: 7,
          type: 'Solution',
          ver: '1.0',
          summary: 'Hello World1',
          description:'This is a test43534',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['tesasas', 'test2', 'tter', 'erer'],
          stats: {
            vote: 7800,
            comments: 0,
            countries: []
          },
          children:[24, 25],
          parents:[0]
      },
      {
        z: 5,
        x: 2,
        t: '07/07/2018',
        latest: true,
          refID: 1,
          ver: '1.0',
          type: 'Solution',
          summary: `Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  sjafhjsahfjahfjkashfjak kasjfka jasfhjasf 
                  Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  sjafhjsahfjahfjkashfjak kasjfka jasfhjasf
                  `,
          description:'This is a test55',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test sda s', 'testasdda2'],
          stats: {
            vote: 7800,
            comments: 0,
            countries: []
          },
          children: [20, 21, 23],
          parents: [0]
      },
      {
        z: 5,
        x:3,
        t: '01/07/2018',
        latest: true,
       
          refID: 21,
          ver: '1.0',
          type: 'Problem',
          summary: 'Hello World2',
          description:'This is a testfgdg',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          controls:{
            relatedOpen: false,
          },
          related: [
            { refID: 2, summary:'Hello World level4' },
            { refID: 2, summary:`Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
            jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf `},
            { refID: 3, summary:'Hello World level4' },
          ],
          stats: {
            vote: 999,
            comments: 0,
            countries: []
          },
          children:[],
          parents:[1]
      },
      {
        z: 5,
        x:3,
        t: '01/07/2018',
        latest: true,
       
          refID: 20,
          ver: '1.0',
          type: 'Problem',
          summary: 'Hello World2',
          description:'This is a testfgdg',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          controls:{
            relatedOpen: false,
          },
          related: [
            { refID: 2, summary:'Hello World level4' },
            { refID: 2, summary:`Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
            jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf `},
            { refID: 3, summary:'Hello World level4' },
          ],
          stats: {
            vote: 999,
            comments: 0,
            countries: []
          },
          children:[],
          parents:[]
      },
      {
        z: 5,
        x:1,
        t: '01/07/2018',
        latest: true,
       
          refID: 11,
          ver: '1.0',
          type: 'Problem',
          summary: `Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
          jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf `,
          description:'This is a testfgdg',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          controls:{
            relatedOpen: false,
          },
          related: [
            { refID: 2, summary:'Hello World level4' },
            { refID: 2, summary:`Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
            jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf `},
            { refID: 3, summary:'Hello World level4' },
          ],
          stats: {
            vote: 999,
            comments: 0,
            countries: []
          },
          children:[13],
          parents:[]
      },
      {
        z: 5,
        x:2,
        t: '6/07/2018',
        latest: true,
          refID: 13,
          ver: '1.0',
          type: 'Solution',
          summary: `Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  sjafhjsahfjahfjkashfjak kasjfka jasfhjasf 
                  Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
                  sjafhjsahfjahfjkashfjak kasjfka jasfhjasf
                  `,
          description:'This is a test55',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test sda s', 'testasdda2'],
          stats: {
            vote: 7800,
            comments: 0,
            countries: []
          },
          children: [],
          parents: [11]
      },
      {
        z: 5,
        x:2,
        t: '5/07/2018',
        latest: true,
       
          refID: 12,
          type: 'Solution',
          ver: '1.0',
          summary: `Hello World Test jsdfj jkafhjk jshdjk asjkfhjk asfjhjsfhjshf 
          jsdfj jkafhjk jshdjk asjkfhjk asf`,
          description:'This is a test43534',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['tesasas', 'test2', 'tter', 'erer'],
          stats: {
            vote: 7800,
            comments: 0,
            countries: []
          },
          children:[],
          parents:[0]
      },
      {
        z: 4,
        x:1,
        t: '01/07/2018',
        latest: true,
       
          refID: 2,
          ver: '1.0',
          type: 'Problem',
          summary: 'Hello World level4',
          description:'This is a test',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            vote: 7800,
            comments: 0,
            countries: []
          },
          children: [],
          parents: []
      },
      {
        z: 4,
        x:1,
        t: '01/07/2018',
        latest: true,
       
          refID: 3,
          ver: '1.0',
          type: 'Problem',
          summary: 'Hello World Test level4',
          description:'This is a test2',
          lastUpdate: 'John Doe',
          createdBy: 'John Doe',
          tags: ['test', 'test2'],
          stats: {
            vote: 7800,
            comments: 0,
            countries: []
          },
          children: [],
          parents: []
      },
      { 
        z: 5,
        x:3,
        refID: 23,
        type: 'Problem',
        summary: 'Hello World2',
        tags: ['test', 'test2'],
        controls:{
          relatedOpen: false,
        },
        related: [
          { refID: 2, summary:'Hello World level4' },
          { refID: 2, summary:`Hello World`},
          { refID: 3, summary:'Hello World level4' },
        ],
        stats: {
          vote: 999,
          comments: 0,
          countries: []
        },
        children:[],
        parents:[1]
    },
    { 
      z: 5,
      x:3,
      refID: 25,
      type: 'Problem',
      summary: 'Hello World2',
      tags: ['test', 'test2'],
      controls:{
        relatedOpen: false,
      },
      related: [
        { refID: 2, summary:'Hello World level4' },
        { refID: 2, summary:`Hello World`},
        { refID: 3, summary:'Hello World level4' },
        { refID: 2, summary:'Hello World level4' },
        { refID: 2, summary:`Hello World`},
        { refID: 3, summary:'Hello World level4' },
        { refID: 2, summary:'Hello World level4' },
        { refID: 2, summary:`Hello World`},
        { refID: 3, summary:'Hello World level4' },
        { refID: 2, summary:'Hello World level4' },
        { refID: 2, summary:`Hello World`},
        { refID: 3, summary:'Hello World level4' },
      ],
      stats: {
        vote: 999,
        comments: 0,
        countries: []
      },
      children:[],
      parents:[1]
  },
    { 
      z: 5,
      x:3,
      refID: 24,
      type: 'Problem',
      summary: 'Hello World2',
      tags: ['test', 'test2'],
      controls:{
        relatedOpen: false,
      },
      related: [
        { refID: 2, summary:'Hello World level4' },
        { refID: 2, summary:`Hello World`},
        { refID: 3, summary:'Hello World level4' },
      ],
      stats: {
        vote: 999,
        comments: 0,
        countries: []
      },
      children:[],
      parents:[7]
  },
    ];
  
    this.mapData.forEach((item:any) => {
      item['gridX'] = Math.trunc(item.x / this.mapGridSize[0]);
      item['gridY'] = Math.trunc(item.y / this.mapGridSize[1]);
      if(!this.filteredMapData[item.z]){
        this.filteredMapData[item.z] = {mapData:[], mapObjectData : {}, mapTree:[]};
      }
      this.filteredMapData[item.z].mapData.push(item);
      this.filteredMapData[item.z].mapObjectData[item.refID] = item;
    });
    this.createMapTree();
    this.createWidgetPosition();
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


  private createMapTree(){
    Object.keys(this.filteredMapData).forEach((z:any) => {
      Object.keys(this.filteredMapData[z].mapObjectData).forEach((key:any) => {
        this.filteredMapData[z].mapObjectData[key].next = [];
        this.filteredMapData[z].mapObjectData[key].prev = [];
        if(this.filteredMapData[z].mapObjectData[key].x === 1){
          this.filteredMapData[z].mapTree.push(this.filteredMapData[z].mapObjectData[key]);
        }
        this.filteredMapData[z].mapObjectData[key].children.forEach((child:any) => {
          this.filteredMapData[z].mapObjectData[key].next.push(this.filteredMapData[z].mapObjectData[child]);
        });
        this.filteredMapData[z].mapObjectData[key].parents.forEach((parent:any) => {
          this.filteredMapData[z].mapObjectData[key].prev.push(this.filteredMapData[z].mapObjectData[parent]);
        });
    });
    });
  }

  private createWidgetPosition(){
    let connections:any = {};
    Object.keys(this.filteredMapData).forEach((z:any) => {
      this.traverseTree(connections, this.filteredMapData[z].mapTree, z);
    });
  }

  traverseTree(connections:any, tree:any , z:number){
    tree.forEach((item:any) => {
        const x = item.x;
        const count = item.children.length;
        if(!connections[z]){
          connections[z] = {};
        }
        if(!connections[z][x]){
          connections[z][x] = 0;
      }
      connections[z][x]+= count ? count : 1; 
      item.y = connections[z][x];
      this.traverseTree(connections, item.next , z+1);
    });   
  }

  public beforeMapUpdate( name:string , callback:any){
    this.mapUpdateCallbacks.push({name,callback});
  }



  public removeBeforeMapUpdate(name:string){
    this.mapUpdateCallbacks = this.mapUpdateCallbacks.filter((item:any) => item.name!==name);
  }

  private async updateMap() {
    // when panned or zoomed or time changed
    let newMap = this.filteredMapData[this.z].mapData
                  // .filter((item:any) => this.bufferMap.some((item2:any) => 
                  //   item2.x === item.gridX && item2.y=== item.gridY));
    const oldNodes = this.displayData.filter((item:any) => !newMap.includes(item));
    const newNodes = newMap.filter((item:any) => !this.displayData.includes(item));

    if(newNodes.length || oldNodes.length){
      this.mapUpdateCallbacks.forEach((item:any) => item.callback(newMap , oldNodes, newNodes));
      this.displayData = newMap;
    }

    

  }

  async getItem(refID: number) {
    return this.mapData.find((item:any) => item.refID === refID);
  }


      
}
