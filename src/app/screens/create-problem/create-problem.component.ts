import { Component, OnInit} from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.scss']
})
export class CreateProblemComponent implements OnInit {

  allowEdit = true;
  description = '';
  tldr = '';
  selectedTags: any[] = [];
  tagList: any = [{name:'test'},{name:'test2'},{name:'test3'}];
  filteredTags: any[] = [];
  linkedItems: any[] = [
    // {refID:'test' , catagory:'General'},{refID:'test2', catagory:'Software'},{refID:'test3', catagory:'Hardware'}
  ];
  catagoryList = [
    {name:'General'},
    {name:'Design'},
    {name:'Science'},
    {name:'Hardware'},
    {name:'Software'},
    {name: 'Ethics'},
  ];
  linkID = '';
  selectedCatagory : any;
  constructor(
    private readonly sharedData : SharedDataService,
    private readonly apiService : ApiCallsService
  ) {}

  closePopup() {
    this.sharedData.setProblemPopup({show: false , content:{}})
  }


  ngOnInit(): void {

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
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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

addProblem(){
  this.apiService.addRecord({
    description: this.description,
    tldr: this.tldr,
    tags: this.selectedTags,
    linkedItems: this.linkedItems,
    catagory : this.selectedCatagory.name,
    type: 'Problem',
    author: null
  });
  }
}
