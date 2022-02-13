import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { OAuthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly sharedData : SharedDataService,
    private authService: SocialAuthService,
    private OAuth :  OAuthService,
  ) { }

  ngOnInit(): void {
  }

  hidePopup(){
    this.sharedData.setLoginPopup(false);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      if(res.email && res.email.includes('@')){
        this.OAuth.userDetails = res;
        this.OAuth.validUser = true;
      }
    })
  }

}
