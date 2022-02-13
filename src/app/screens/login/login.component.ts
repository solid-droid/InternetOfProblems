import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly sharedData : SharedDataService
  ) { }

  ngOnInit(): void {
  }

  hidePopup(){
    this.sharedData.setLoginPopup(false);
  }

}
