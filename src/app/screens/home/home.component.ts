import { Component, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showEdit = false;
  showProblemPopup = false;
  showSolutionPopup = false;
  solution = null;
  problem = null;
  showLogin = false;
  selection = {};
  constructor(
    private readonly mapBuilder : MapBuilderService,
    private readonly sharedData : SharedDataService,
    private readonly utils : UtilsService
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

    this.sharedData.getLoginPopup.subscribe(show =>{
      this.showLogin = show;
    });

    this.sharedData.getProblemPopup.subscribe((options:any) => {
      if(this.utils.validUser){
        this.showProblemPopup = options.show;
        if(this.showProblemPopup){
          this.showSolutionPopup = false;
          this.solution = options.content.item;
          this.sharedData.setEditMenu({show: false , content:{}});
        }
      }else if(options.show){
        this.showLogin = true;
      }
    });

    this.sharedData.getSolutionPopup.subscribe((options:any) => {
      if(this.utils.validUser){
          this.showSolutionPopup = options.show;
          if( this.showSolutionPopup){
            this.problem = options.content.item;
            this.showProblemPopup = false;
            this.sharedData.setEditMenu({show: false , content:{}});
          }
      } else if(options.show){
        this.showLogin = true;
      }
    });

  }

  updateShowMenu($event:boolean){
    this.showEdit = $event;
  }

}
