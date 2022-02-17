import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { MapBuilderService } from 'src/app/services/map-builder.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  allowEdit = false;
  expand = false;
  tldr = '';
  description: string = `Hello World!`;
  selectedTags: any[] = [];
  tagList: any = [{name:'test'},{name:'test2'},{name:'test3'}];
  filteredTags: any[] = [];
  data:any = {};
  record:any = {};
  @Input() selection: any;

  @Output() showMenu = new EventEmitter<boolean>();
  constructor(
    private readonly apiService : ApiCallsService,
    private readonly mapBuilder : MapBuilderService
  ) { }
  async ngOnChanges(changes: any) {
    if (changes.selection.currentValue) {
      this.record = changes.selection.currentValue;
      this.data = (await this.apiService.getDetails(changes.selection.currentValue.refID)).data[0];
      this.description = this.data.desc;
      this.tldr = this.data.tldr;
      this.selectedTags = this.data.tags;
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

  async save(){
    this.data.desc = this.description;
    this.data.tldr = this.tldr;
    this.data.tags = this.selectedTags;
    this.record.tldr = this.tldr;
    this.record.tags = this.selectedTags;
    await this.apiService.updateRecord(this.data);
    await this.mapBuilder.getMapData();
    this.mapBuilder.updateMap();
    this.allowEdit = false;
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
