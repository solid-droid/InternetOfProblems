import { Component, OnInit } from '@angular/core';
import { MapBuilderService } from 'src/app/services/map-builder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly mapBuilder : MapBuilderService
  ) { }

 async ngOnInit() {
    this.mapBuilder.init();

  }


}
