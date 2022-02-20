import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mapsmap';
  sideMenu = false;
  menuContent = '';
  constructor() {}

  async ngOnInit(){

  }

  showSideMenu(view:string){
    this.menuContent = view;
    this.sideMenu = true;
  }
}
