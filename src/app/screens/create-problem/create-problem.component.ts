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
  summary = '';
  selectedTags: any[] = [];
  tagList: any = [{name:'test'},{name:'test2'},{name:'test3'}];
  filteredTags: any[] = [];
  linkedItems: any[] = [
    // {id:'test' , catagory:'General'},{id:'test2', catagory:'Software'},{id:'test3', catagory:'Hardware'}
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
  ) {}

  closePopup() {
    this.sharedData.setProblemPopup({show: false , content:{}})
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {

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

  
 
}
