import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private readonly Observable_zoomLevel = new BehaviorSubject(5);
  getZoomLevel = this.Observable_zoomLevel.asObservable();

  private readonly Observable_editMenu = new BehaviorSubject({show: false , content:{}});
  getEditMenu = this.Observable_editMenu.asObservable();

  public setZoomLevel(zoomLevel: number) {
    this.Observable_zoomLevel.next(zoomLevel);
  }

  public setEditMenu(editOptions: any) {
    this.Observable_editMenu.next(editOptions);
  }

  private readonly Observable_orgin = new BehaviorSubject([0,0]);
  getOrigin = this.Observable_orgin.asObservable();

  public setOrigin(origin: [number, number]) {
    this.Observable_orgin.next(origin);
  }

}
