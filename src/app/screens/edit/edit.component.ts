import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { OAuthService } from 'src/app/services/oauth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  milestones:any = []
  allowEdit = false;
  expand = false;
  tldr = '';
  description: string = `Hello World!`;
  selectedTags: any[] = [];
  tagList: any = [];
  filteredTags: any[] = [];
  data:any = {};
  record:any = {};
  @Input() selection: any;

  @Output() showMenu = new EventEmitter<boolean>();
  constructor(
    private readonly apiService : ApiCallsService,
    private readonly mapBuilder : MapBuilderService,
    private readonly router : Router,
    private readonly utils: UtilsService,
    private readonly OAuth : OAuthService,
    private readonly sharedData : SharedDataService
  ) {
    this.tagList = this.utils.tags;
   }
  async ngOnChanges(changes: any) {
    if (changes.selection.currentValue) {
      if(!changes.selection.currentValue.router){
        this.record = changes.selection.currentValue;
      } else {
        this.expand = true;
        this.record = (await this.apiService.getRecordById(changes.selection.currentValue.refID)).data;
      }
      this.data = (await this.apiService.getDetails(changes.selection.currentValue.refID)).data[0];
      this.description = this.data.desc;
      this.tldr = this.data.tldr;
      this.selectedTags = this.data.tags;
      this.allowEdit = false;
    }
  }


  async closeEditMenu() {
    this.showMenu.emit(false);
    this.utils.internalRoute = true;
    this.router.navigate(['/']);
  }

  enableEdit(){
    if(this.OAuth.validUser){
      this.allowEdit=true;
    }else{
      this.sharedData.setLoginPopup(true);
    }
  }

  expandMenu() {
    this.expand = true;
  } 

  closeExpandMenu() {
    this.expand = false;
  }
  
 ngOnInit() {
    this.milestones = [
      {status: 'Process 1', date: '15/10/2020 10:30', },
      {status: 'Process 2', date: '15/10/2020 14:00', },
      {status: 'Process 3', date: '15/10/2020 16:15', },
      {status: 'Process 4', date: '16/10/2020 10:00', }
  ];
  }

  ngOnDestroy(): void {

  }

  async save(){
    this.data.desc = this.description;
    this.data.tldr = this.tldr;
    this.data.tags = this.selectedTags;
    this.record.tldr = this.tldr;
    this.record.tags = this.selectedTags;
    this.utils.notifications.saving();
    if(
      !this.OAuth.userRecord.creator.find((id:any) => id === this.data.refID)
      && 
      !this.OAuth.userRecord.contributer.find((id:any) => id === this.data.refID)
      ){
        this.OAuth.userRecord.contributer.push(this.data.refID);
        await this.apiService.updateUser();
    }
    await this.apiService.updateRecord(this.data);
    await this.mapBuilder.getMapData();
    this.mapBuilder.updateMap();
    this.allowEdit = false;
    this.utils.notifications.saveSuccess();
  }

  discard(){
    this.tldr = this.data.tldr;
    this.description = this.data.desc;
    this.selectedTags = this.data.tags;
    this.allowEdit = false;
  }

  filterTag(event:any) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.tagList.length; i++) {
        let tag = this.tagList[i];
        if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(tag);
        }
    }

    this.filteredTags = filtered;
}


}
