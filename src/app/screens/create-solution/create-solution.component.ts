import { Component, Input, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { OAuthService } from 'src/app/services/oauth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-create-solution',
  templateUrl: './create-solution.component.html',
  styleUrls: ['./create-solution.component.scss']
})
export class CreateSolutionComponent implements OnInit {

  allowEdit = true;
  description = '';
  problemDesc= '';
  tldr = '';
  selectedTags: any[] = [];
  tagList: any = [{name:'test'},{name:'test2'},{name:'test3'}];
  filteredTags: any[] = [];
  catagoryList = [
    {name:'General'},
    {name:'Design'},
    {name:'Science'},
    {name:'Hardware'},
    {name:'Software'},
    {name: 'Ethics'},
  ];

  @Input() problem: any;

  constructor(
    private readonly sharedData : SharedDataService,
    private readonly apiService : ApiCallsService,
    private readonly mapBuilder : MapBuilderService,
    private readonly OAuth: OAuthService,
    private readonly utils: UtilsService
  ) {}

  closePopup() {
    this.sharedData.setSolutionPopup({show: false , content:{}});
  }


 async ngOnInit() {
    const details = (await this.apiService.getDetails(this.problem.refID)).data[0];
    this.problemDesc = details.desc;

  }

  ngOnDestroy(): void {

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

async addSolution(){
  this.closePopup();
  this.utils.notifications.saving();
  const solution = {
    description: this.description,
    tldr: this.tldr,
    tags: this.selectedTags,
    catagory : this.problem.catagory,
    x: this.problem.x + 1,
    z: this.catagoryList.reverse().findIndex(x => x.name === this.problem.catagory),
    type: 'Solution',
    author: this.OAuth.userDetails.email,
    parents: [this.problem.refID],
  };
  //saving solution
  const responce:any = await this.apiService.addRecord(solution);
  this.OAuth.userRecord.creator.push(responce.data.refID);
  await this.apiService.updateUser();
  //updating parent relation
  const parent = this.mapBuilder.filteredMapData[solution.z]
                 .mapObjectData[solution.parents[0]];
  parent.children.push(parseInt(responce.data.refID));
  delete parent.next;
  delete parent.prev;
  await this.apiService.updateRecord(parent);

  //refreshing map
  this.mapBuilder.clearMap();
  await this.mapBuilder.getMapData();
  this.mapBuilder.updateMap();
  this.utils.notifications.saveSuccess();
}
}
