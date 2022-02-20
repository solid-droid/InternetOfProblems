import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  internalRoute = false;
  notifications = {
    loading: (msg:string = 'Loading...') => this.infoMessage(msg),
    saving: (msg:string = 'Saving... please wait.') => this.infoMessage(msg),
    saveSuccess: (msg:string = 'Record Saved!') => this.successMessage(msg),
    error: (msg:string = 'Something went wrong, try again') => this.errorMessage(msg),
    greetings: (msg:string = `Welcome ${this.OAuth.userRecord.name}`) => this.successMessage(msg, `Login Successful`),
  }
  constructor(
    private messageService: MessageService,
    private OAuth: OAuthService
  ) { }

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
}
