import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private readonly Observable_zoomLevel = new BehaviorSubject(5);
  getZoomLevel = this.Observable_zoomLevel.asObservable();

  public setZoomLevel(zoomLevel: number) {
    this.Observable_zoomLevel.next(zoomLevel);
  }

  private readonly Observable_orgin = new BehaviorSubject([0,0]);
  getOrigin = this.Observable_orgin.asObservable();

  public setOrigin(origin: [number, number]) {
    this.Observable_orgin.next(origin);
  }

}
