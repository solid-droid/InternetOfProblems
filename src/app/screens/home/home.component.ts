import { Component, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { OAuthService } from 'src/app/services/oauth.service';
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
  showRelationsPopup = false;
  solution = null;
  problem = null;
  showLogin = false;
  selection = {};
  constructor(
    private readonly mapBuilder : MapBuilderService,
    private readonly sharedData : SharedDataService,
    private readonly OAuth : OAuthService
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
      if(this.OAuth.validUser){
        this.showProblemPopup = options.show;
        if(this.showProblemPopup){
          this.showSolutionPopup = false;
          this.showRelationsPopup = false;
          this.solution = options.content.item;
          this.sharedData.setEditMenu({show: false , content:{}});
        }
      }else if(options.show){
        this.showLogin = true;
      }
    });

    this.sharedData.getSolutionPopup.subscribe((options:any) => {
      if(this.OAuth.validUser){
          this.showSolutionPopup = options.show;
          if( this.showSolutionPopup){
            this.problem = options.content.item;
            this.showProblemPopup = false;
            this.showRelationsPopup = false;
            this.sharedData.setEditMenu({show: false , content:{}});
          }
      } else if(options.show){
        this.showLogin = true;
      }
    });

    this.sharedData.getRelationsPopup.subscribe((options:any) => {
      if(this.OAuth.validUser){
          this.showRelationsPopup = options.show;
          if( this.showRelationsPopup){
            this.problem = options.content.item;
            this.showProblemPopup = false;
            this.showSolutionPopup = false;
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
