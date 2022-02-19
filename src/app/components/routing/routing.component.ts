import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class RoutingComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly utils: UtilsService,
    private readonly sharedData: SharedDataService
    ) { }

  commands:any = {
    record: (id:any) => this.loadRecord(id),
    search: (value:any) => this.search(value),
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      if (params.command && !this.utils.internalRoute) {
        this.commands[params.command](params.value);
      } else {
        this.utils.internalRoute = false;
      }
    });
  }

  loadRecord(id:any)  {
    this.sharedData.setEditMenu({refID:id, show:true , router:true});
  }

  search(value: any) {
    console.log(value);
  }


}
