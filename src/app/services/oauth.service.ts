import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  validUser = false;
  userDetails:any = {};
  userRecord:any = {};
  constructor() { }

}
