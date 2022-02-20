import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  UserDetails:any = {};

constructor(
    private readonly OAuth: OAuthService,
  ) { }

  ngOnInit(): void {
    this.UserDetails = this.OAuth.userRecord;
  }

}
