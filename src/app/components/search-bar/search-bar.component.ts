import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private readonly apiService: ApiCallsService
  ) { }
  filters = [
    {name: 'TLDR'},
    {name: 'Author'},
    {name: 'Tags'},
    {name: 'Details'},
    {name: 'Custom'},
  ];
  selectedFilter:any = this.filters[0];
  searchText:any;
  searchSuggestions:any[] = [];
  ngOnInit(): void {
  }

  async getSuggestions(event:any) {
    const data = (await this.apiService.searchTLDR(event.query)).data;
    this.searchSuggestions = data.map((item:any) => ({
      refID: item.refID, 
      name: item.tldr, 
      type: item.type,
      author: item.author,
      catagory: item.catagory,
    }));
}

}
