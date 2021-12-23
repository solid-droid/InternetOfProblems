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
}
