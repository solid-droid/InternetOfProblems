import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private readonly apiService: ApiCallsService,
    private readonly router : Router
  ) { }
  filters = [
    {name: 'TLDR'},
    {name: 'Details'},
  ];
  selectedFilter:any = this.filters[0];
  searchText:any;
  searchSuggestions:any[] = [];
  ngOnInit(): void {
  }

  async getSuggestions(event:any) {
    let data = [];

    if(this.selectedFilter.name === 'TLDR'){
     data = (await this.apiService.searchTLDR(event.query)).data;
    }

    if(this.selectedFilter.name === 'Details'){
      data = (await this.apiService.searchDetails(event.query)).data;
     }

     this.searchSuggestions = data.map((item:any) => ({
      refID: item.refID, 
      name: item.tldr, 
      type: item.type,
      author: item.author,
      catagory: item.catagory,
    })).slice(0,10);
}

loadRecord(event:any , selection:any = null) {
  if(selection){
    this.router.navigate(['/record', selection.refID]);
  }
}

}
