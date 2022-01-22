import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-create-solution',
  templateUrl: './create-solution.component.html',
  styleUrls: ['./create-solution.component.scss']
})
export class CreateSolutionComponent implements OnInit {

  constructor(
    private readonly sharedData : SharedDataService,
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.sharedData.setSolutionPopup({show: false , content:{}})
  }

}
