import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';


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
    
  ) { }
  ngOnChanges(changes: any) {
    if (changes.selection.currentValue) {
      this.description = changes.selection.currentValue.content.description;
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
