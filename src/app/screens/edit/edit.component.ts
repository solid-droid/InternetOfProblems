import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  allowEdit = false;
  expand = false;
  description: string = `Hello World!`;
  selectedTags: any[] = [];
  tagList: any = [{name:'test'},{name:'test2'},{name:'test3'}];
  filteredTags: any[] = [];
  @Input() selection: any;

  @Output() showMenu = new EventEmitter<boolean>();
  constructor(
    private readonly apiService : ApiCallsService
  ) { }
  async ngOnChanges(changes: any) {
    if (changes.selection.currentValue) {
      const data = (await this.apiService.getDetails(changes.selection.currentValue.refID)).data;
      this.description = data.description;
      this.allowEdit = false;
    }
  }


  closeEditMenu() {
    this.showMenu.emit(false);
  }

  expandMenu() {
    this.expand = true;
  } 

  closeExpandMenu() {
    this.expand = false;
  }
  
 ngOnInit() {

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


}
