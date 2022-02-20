import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { OAuthService } from 'src/app/services/oauth.service';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { UtilsService } from 'src/app/services/utils.service';

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
    private readonly apiService : ApiCallsService,
    private readonly utils : UtilsService
  ) { }

  ngOnInit(): void {

  }

  hidePopup(){
    this.sharedData.setLoginPopup(false);
  }

  async signInWithGoogle() {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
        if(res.email && res.email.includes('@')){
          this.OAuth.userDetails = res;
          this.OAuth.validUser = true;
          this.getLocation(async (position:any)=>{
            const location = await this.apiService.getCountry(position.coords.latitude,position.coords.longitude);
            const options = {
              email: res.email, 
              name: res.name, 
              picture: res.photoUrl,
              location
            };
            this.OAuth.userRecord = (await this.apiService.createUser(options)).data[0];
            this.OAuth.userRecord.location = location || this.OAuth.userRecord.location;
            this.utils.notifications.greetings();
          });
        }
        this.hidePopup();
      }).catch(data => {
      this.utils.notifications.error();
    });

  }

  getLocation(callback:any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback);
    } else {
      callback({coords:{latitude:null,longitude:null}});
    }
  }
  

}
