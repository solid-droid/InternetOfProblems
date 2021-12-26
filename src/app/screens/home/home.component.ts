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
  selection = {};
  constructor(
    private readonly mapBuilder : MapBuilderService,
    private readonly sharedData : SharedDataService
  ) { }

 async ngOnInit() {
    this.mapBuilder.init();
    this.sharedData.getEditMenu.subscribe(editOptions => {
      this.selection = editOptions;
      this.showEdit = editOptions.show
    });

  }

  updateShowMenu($event:boolean){
    this.showEdit = $event;
  }

}
