import { Component, Input, OnInit} from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { MapBuilderService } from 'src/app/services/map-builder.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.scss']
})
export class CreateProblemComponent implements OnInit {

  allowEdit = true;
  description = '';
  tldr = '';
  disableCatagory = false;
  solutionX = 0;
  selectedTags: any[] = [];
  tagList: any = [{name:'test'},{name:'test2'},{name:'test3'}];
  filteredTags: any[] = [];
  linkedItems: any[] = [];
  catagoryList = [
    {name:'General'},
    {name:'Design'},
    {name:'Science'},
    {name:'Hardware'},
    {name:'Software'},
    {name: 'Ethics'},
  ];
  linkID = '';
  selectedCatagory : any = {name: 'General'};

  @Input() solution: any;

  constructor(
    private readonly sharedData : SharedDataService,
    private readonly apiService : ApiCallsService,
    private readonly utils: UtilsService,
    private readonly mapBuilder: MapBuilderService
  ) {}

  closePopup() {
    this.sharedData.setProblemPopup({show: false , content:{}})
  }


  ngOnInit(): void {
    if(this.solution && this.solution.type === 'Solution') {
      this.selectedCatagory = {name: this.solution.catagory};
      this.disableCatagory = true;
    }
  }

  ngOnDestroy(): void {

  }

  linkProblem() {
    if(this.linkID && !this.linkedItems.find(item => item.refID === this.linkID)) {
      this.linkedItems= [ ... this.linkedItems,{refID:this.linkID, catagory:'loading...'}];
      this.linkID = '';
    }
  }

  removeLink(item:any) {
    this.linkedItems = this.linkedItems.filter(linkedItem => linkedItem.refID !== item.refID);
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

async addProblem(){

  const problem ={
    description: this.description,
    tldr: this.tldr,
    tags: this.selectedTags,
    related: this.linkedItems,
    catagory : this.selectedCatagory.name,
    x: this.solution ? this.solution.x + 1 : 1,
    z: this.catagoryList.reverse().findIndex(x => x.name === this.selectedCatagory.name),
    parents: this.solution ? [this.solution.refID] : [],
    type: 'Problem',
    author: null
  }
  const responce = await this.apiService.addRecord(problem);

  if(this.solution){
  const parent = this.mapBuilder.filteredMapData[problem.z]
                                .mapObjectData[problem.parents[0]];
  parent.children.push(parseInt(responce.data.refID));
  delete parent.next;
  delete parent.prev;
  await this.apiService.updateRecord(parent);
  }

  this.mapBuilder.clearMap();
  await this.mapBuilder.getMapData();
  this.mapBuilder.updateMap();
  }
}
