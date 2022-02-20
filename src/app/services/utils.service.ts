import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  internalRoute = false;
  continents = [ 
    {name:'Europe'},
    {name:'Asia'},
    {name:'Africa'},
    {name:'North America'},
    {name:'South America'},
    {name:'Oceania'},
    {name:'Australia'},
    {name:'Antarctica'},
    {name:'Middle East'},
  ]

  tags = [
    {name:'Code'},
    {name:'Framework'},
    {name:'Geography'},
    {name:'Language'},
    {name:'Math'},
    {name:'Music'},
    {name:'Science'},
    {name:'Technology'},
    {name:'Video Games'},
    {name:'Art'},
    {name:'Business'},
    {name:'Comics'},
    {name:'Education'},
    {name:'Entertainment'},
    {name:'Health'},
    {name:'Hobbies'},
    {name:'Home'},
    {name:'Internet'},
    {name:'News'},
    {name:'Personal'},
    {name:'Reference'},
    {name:'Shopping'},
    {name:'Sports'},
    {name:'Travel'},
    {name:'Weather'},
    {name:'Forest'},
    {name:'Nature'},
    {name:'Plants'},
    {name:'Animals'},
    {name:'Food'},
    {name:'Fruits'},
    {name:'Vegetables'},
    {name:'Cars'},
    {name:'Motorcycles'},
    {name:'Planes'},
    {name:'Trains'},
    {name:'Trucks'},
    {name:'Bikes'},
    {name:'Boats'},
    {name:'Medicine'},
    {name:'Treatments'},
    {name:'Politics'},
    {name:'Religion'},
    {name:'Philosophy'},
    {name:'Psychology'},
    {name:'Science'},
    {name:'Pollution'},
    {name:'Environment'},
    {name:'Cleanliness'},
    {name:'Safety'},
    {name:'Men'},
    {name:'Women'},
    ...this.continents,
  ];


  notifications = {
    loading: (msg:string = 'Loading...') => this.infoMessage(msg),
    saving: (msg:string = 'Saving... please wait.') => this.infoMessage(msg),
    saveSuccess: (msg:string = 'Record Saved!') => this.successMessage(msg),
    error: (msg:string = 'Something went wrong, try again') => this.errorMessage(msg),
    greetings: (msg:string = `Welcome ${this.OAuth.userRecord.name}`) => this.successMessage(msg, `Login Successful`),
    dev: (msg:string = '') => this.warningMessage(msg , 'Under Development'),
  }
  constructor(
    private messageService: MessageService,
    private OAuth: OAuthService
  ) {
    
   }


  private infoMessage(msg:string) {
    this.messageService.add({
      severity:'info', 
      summary: 'Info', 
      detail: msg});
  }

  private successMessage(msg:string , header:string = 'Info') {
    this.messageService.add({
      severity:'success', 
      summary: header, 
      detail: msg});
  }

  private errorMessage(msg:string , header:string = 'Info') {
    this.messageService.add({
      severity:'error', 
      summary: header, 
      detail: msg});
  }

  private warningMessage(msg:string , header:string = 'Info') {
    this.messageService.add({
      severity:'warn', 
      summary: header, 
      detail: msg});
  }
}
