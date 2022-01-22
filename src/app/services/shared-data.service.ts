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

  private readonly Observable_orgin = new BehaviorSubject([0,0]);
  getOrigin = this.Observable_orgin.asObservable();

  private readonly Observable_problemPopup = new BehaviorSubject({show: false , content:{}});
  getProblemPopup = this.Observable_problemPopup.asObservable();

  private readonly Observable_solutionPopup = new BehaviorSubject({show: false , content:{}});
  getSolutionPopup = this.Observable_solutionPopup.asObservable();

  public setZoomLevel(zoomLevel: number) {
    this.Observable_zoomLevel.next(zoomLevel);
  }

  public setEditMenu(editOptions: any) {
    this.Observable_editMenu.next(editOptions);
  }
  public setOrigin(origin: [number, number]) {
    this.Observable_orgin.next(origin);
  }

  public setProblemPopup(editOptions: any){
    this.Observable_problemPopup.next(editOptions);
  }

  public setSolutionPopup(editOptions: any){
    this.Observable_solutionPopup.next(editOptions);
  }

}
