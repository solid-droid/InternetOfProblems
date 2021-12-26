import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
declare const panzoom:any;
declare const LeaderLine:any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
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
      await new Promise(resolve => setTimeout(resolve, 100));
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
        this.makeGridCurve(line);
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
        this.lines[line] = new LeaderLine(getRef(start) , getRef(end), {
          path: 'grid',
          size: 3,
          color: '#10b1e2',
          endPlug: 'arrow3',
          hide: true,
        });
        this.makeGridCurve(this.lines[line]);
        this.showLine(this.lines[line]);
      } catch(e){

      }

    });
  }

  async showLine(line:any){
    line.show();
  }

  makeGridCurve(line:any){
    let elmPath:any = document.getElementById(`leader-line-${line._id}-line-path`), pathLen;
    elmPath.setAttribute('d', this.addArc(elmPath.getAttribute('d'), 10));
    elmPath.classList.add('draw-effect');
  }
    
  showEdit(item:any){
    this.sharedData.setEditMenu({...item, show:true});
  }
  addArc(pathData:any, radius:any) {
    var reL = /^L ?([\d.\-+]+) ([\d.\-+]+) ?/,
      newPathData:any, curXY:any, curDir:any, newXY:any, newDir:any,
      sweepFlag:any, arcXY:any, arcStartXY:any;
  
    function getDir(xy1:any, xy2:any) {
      if (xy1.x === xy2.x) {
        return xy1.y < xy2.y ? 'd' : 'u';
      } else if (xy1.y === xy2.y) {
        return xy1.x < xy2.x ? 'r' : 'l';
      }
      throw new Error('Invalid data');
    }
  
    function captureXY(s:any, x:any, y:any) {
      newXY = {x: +x, y: +y};
      return '';
    }
  
    function offsetXY(xy:any, dir:any, offsetLen:any, toBack:any = false) {
      return {
        x: xy.x + (dir === 'l' ? -offsetLen : dir === 'r' ? offsetLen : 0) * (toBack ? -1 : 1),
        y: xy.y + (dir === 'u' ? -offsetLen : dir === 'd' ? offsetLen : 0) * (toBack ? -1 : 1)
      };
    }
  
    pathData = pathData.trim().replace(/,/g, ' ').replace(/\s+/g, ' ')
      .replace(/^M ?([\d.\-+]+) ([\d.\-+]+) ?/, function(s:any, x:any, y:any) {
        curXY = {x: +x, y: +y};
        return '';
      });
    if (!curXY) { throw new Error('Invalid data'); }
    newPathData = 'M' + curXY.x + ' ' + curXY.y;
  
    while (pathData) {
      newXY = null;
      pathData = pathData.replace(reL, captureXY);
      if (!newXY) { throw new Error('Invalid data'); }
  
      newDir = getDir(curXY, newXY);
      if (curDir) {
        arcStartXY = offsetXY(curXY, curDir, radius, true);
        arcXY = offsetXY(curXY, newDir, radius);
        sweepFlag =
          curDir === 'l' && newDir === 'u' ? '1' :
          curDir === 'l' && newDir === 'd' ? '0' :
          curDir === 'r' && newDir === 'u' ? '0' :
          curDir === 'r' && newDir === 'd' ? '1' :
          curDir === 'u' && newDir === 'l' ? '0' :
          curDir === 'u' && newDir === 'r' ? '1' :
          curDir === 'd' && newDir === 'l' ? '1' :
          curDir === 'd' && newDir === 'r' ? '0' :
          null;
        if (!sweepFlag) { throw new Error('Invalid data'); }
        newPathData += 'L' + arcStartXY.x + ' ' + arcStartXY.y +
          'A ' + radius + ' ' + radius + ' 0 0 ' + sweepFlag + ' ' + arcXY.x + ' ' + arcXY.y;
      }
  
      curXY = newXY;
      curDir = newDir;
    }
    newPathData += 'L' + curXY.x + ' ' + curXY.y;
    return newPathData;
  }
  updateZoomLevel(direction:number){
    this.zoomLevel = Math.min(Math.max(this.zoomLevel + direction, 0), 5);
    this.sharedData.setZoomLevel(this.zoomLevel);
  }

}
