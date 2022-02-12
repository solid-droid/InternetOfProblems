import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getNextProblemLocation(fromConnection : any = null){
    let x = 0, y =0;

    return {x,y};
  }

  getNextSolutionLocation(fromConnection:any = null){
    let x = 0, y =0;

    return {x,y};
  }
}
