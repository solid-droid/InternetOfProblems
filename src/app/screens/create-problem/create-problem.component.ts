import { Component, OnInit} from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.scss']
})
export class CreateProblemComponent implements OnInit {

  allowEdit = true;
  description = '';

  constructor(
    private readonly sharedData : SharedDataService,
  ) {}

  closePopup() {
    this.sharedData.setProblemPopup({show: false , content:{}})
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  
 
}
