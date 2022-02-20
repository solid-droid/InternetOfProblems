import { Component, Input, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-relations',
  templateUrl: './create-relations.component.html',
  styleUrls: ['./create-relations.component.scss']
})
export class CreateRelationsComponent implements OnInit {
  @Input() problem: any;
  linkID = '';
  linkedItems: any[] = [];
  constructor(
    private readonly sharedData : SharedDataService,
    private readonly apiService : ApiCallsService,
    private readonly mapBuilder : MapBuilderService,
    private readonly utils : UtilsService,
  ) { }

  ngOnInit() {
    this.linkedItems = this.problem.related;
  }

  hidePopup(){
    this.sharedData.setRelationsPopup({show: false , content:{}})
  }

  async linkProblem() {
    const data = await this.apiService.getSummary(this.linkID);
    if(data.data.valid){
      if(this.linkID && !this.linkedItems.find(item => item.refID === this.linkID)) {
        this.linkedItems= [ ... this.linkedItems,{
          refID:this.linkID, 
          catagory:data.data.catagory, 
          tldr : data.data.tldr,
          type: data.data.type,
        }];
        this.linkID = '';
       await this.apiService.updateRecord({refID: this.problem.refID, related: this.linkedItems});
       this.mapBuilder.clearMap();
       await this.mapBuilder.getMapData();
       this.mapBuilder.updateMap();
     
       this.utils.notifications.saveSuccess();
      }
    }
 
  }


  async removeLink(item:any) {
    this.linkedItems = this.linkedItems.filter(linkedItem => linkedItem.refID !== item.refID);
  
    await this.apiService.updateRecord({refID: this.problem.refID, related: this.linkedItems});
    this.mapBuilder.clearMap();
    await this.mapBuilder.getMapData();
    this.mapBuilder.updateMap();
  
    this.utils.notifications.saveSuccess();
  
  }
}
