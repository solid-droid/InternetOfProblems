import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  constructor() { }
  apis:any =[
    {name:'Search TLDR', sample:'http://internet-of-problems-backend.herokuapp.com/api/searchTLDR/<UniqueID>/<text>'},
    {name:'Search Description', sample:'http://internet-of-problems-backend.herokuapp.com/api/searchDetails/<UniqueID>/<text>'},
    {name:'Get Record by refID', sample:'http://internet-of-problems-backend.herokuapp.com/api/getRecordByID/<UniqueID>/<refID>'}
  ];

  linkURL:any = {
    'FrontEnd':'https://github.com/solid-droid/InternetOfProblems',
    'BackEnd':'https://github.com/solid-droid/InternetOfProblems_backend',
  }
  ngOnInit(): void {
  }

  openLink(link:string){
    window.open(this.linkURL[link], '_blank');
  }

}
