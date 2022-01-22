import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly sharedData : SharedDataService
  ) { }

  ngOnInit(): void {
  }

  createProblem(){
    this.sharedData.setProblemPopup({show: true , content:{
      new:true
    }})
  }
}
