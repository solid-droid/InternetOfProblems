import { Injectable } from '@angular/core';
import { ApiCallsService } from './api-calls.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MapBuilderService {
  private z = 5;

  public filteredMapData:any = {};
  private mapData:any = [];
  private mapUpdateCallbacks:any = [];
 
  public displayData:any = [];

  constructor(
    private readonly sharedData : SharedDataService,
    private readonly apiService: ApiCallsService,
  ) {}
  public async getMapData() {
    this.filteredMapData = {};
    this.mapData = {};
    const responce = await this.apiService.getRecords();
    if(responce.success){
      this.mapData = responce.data;
    }
    if(this.mapData){
      this.mapData.forEach((item:any) => {
        if(!this.filteredMapData[item.z]){
          this.filteredMapData[item.z] = {mapData:[], mapObjectData : {}, mapTree:[]};
        }
        this.filteredMapData[item.z].mapData.push(item);
        this.filteredMapData[item.z].mapObjectData[item.refID] = item;
      });
      this.createMapTree();
      this.createWidgetPosition();
    }
  }
  public async init(){
    await new Promise(r => setTimeout(r, 10));
    await this.getMapData();
    this.sharedData.getZoomLevel.subscribe(zoomLevel => {
      this.z = zoomLevel
      this.updateMap();
    });
    this.sharedData.getOrigin.subscribe(origin => {
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

  public async updateMap(overide = false) {
    // when panned or zoomed or time changed
    let newMap:any = [];
    if(!overide){
      newMap = this.filteredMapData[this.z]?.mapData || [];
    }
                  // .filter((item:any) => this.bufferMap.some((item2:any) => 
                  //   item2.x === item.gridX && item2.y=== item.gridY));
    const oldNodes = this.displayData.filter((item:any) => !newMap.includes(item));
    const newNodes = newMap.filter((item:any) => !this.displayData.includes(item));

    if(newNodes.length || oldNodes.length){
      this.mapUpdateCallbacks.forEach((item:any) => item.callback(newMap , oldNodes, newNodes));
      this.displayData = newMap;
    }
  }
  public clearMap(){
    this.updateMap(true);
  }

  async getItem(refID: number) {
    return this.mapData.find((item:any) => item.refID === refID);
  }


      
}
