import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  searchText:any;
  searchSuggestions:any[] = [];
  ngOnInit(): void {
  }

  getSuggestions(event:any) {
    let filtered : any[] = [{name:'test'},{name:'test2'},{name:'test3'}];
    let query = event.query;

    console.log(query);
    this.searchSuggestions = filtered;
}

}
