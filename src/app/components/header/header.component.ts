import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Output, EventEmitter } from '@angular/core';
import { OAuthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideMenu = new EventEmitter<string>();
  constructor(
    private readonly sharedData : SharedDataService,
    private readonly utils : UtilsService,
    private readonly OAuth : OAuthService
  ) { }

  ngOnInit(): void {
  }

  createProblem(){
    this.sharedData.setProblemPopup({show: true , content:{
      new:true
    }})
  }
  findBounty(){
    this.utils.notifications.dev('Bounty Search is under development');
  }

  exposedAPIs(){
    this.sideMenu.emit('docs');
  }

  userDetails(){
    if(this.OAuth.validUser){
      this.sideMenu.emit('user');
    } else{
      this.sharedData.setLoginPopup(true);
    }

  }
 
}
