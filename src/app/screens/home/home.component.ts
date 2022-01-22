import { Component, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showEdit = false;
  showProblemPopup = false;
  showSolutionPopup = false;
  selection = {};
  constructor(
    private readonly mapBuilder : MapBuilderService,
    private readonly sharedData : SharedDataService
  ) { }

 async ngOnInit() {
    this.mapBuilder.init();
    this.sharedData.getEditMenu.subscribe(editOptions => {
      this.selection = editOptions;
      this.showEdit = editOptions.show;
      if(this.showEdit){
        this.sharedData.setProblemPopup({show: false , content:{}});
        this.sharedData.setSolutionPopup({show: false , content:{}});
      }
    });

    this.sharedData.getProblemPopup.subscribe(options => {
      this.showProblemPopup = options.show;
      if(this.showProblemPopup){
        this.showSolutionPopup = false;
        this.sharedData.setEditMenu({show: false , content:{}});
      }
    });

    this.sharedData.getSolutionPopup.subscribe(options => {
      this.showSolutionPopup = options.show;
      if( this.showSolutionPopup){
        this.showProblemPopup = false;
        this.sharedData.setEditMenu({show: false , content:{}});
      }
    });

  }

  updateShowMenu($event:boolean){
    this.showEdit = $event;
  }

}
