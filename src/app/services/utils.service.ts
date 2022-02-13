import { Injectable } from '@angular/core';
import { config } from 'process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  validUser = false;

  constructor() { }

  async googleSignIn() {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key='
    const responce = await(await fetch(url+environment.googleLogin, {
      body: "{'returnSecureToken':true}",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })).json();
    return responce;
  }
}
