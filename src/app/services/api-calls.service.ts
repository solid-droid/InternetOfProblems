import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OAuthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(
    private readonly OAuth: OAuthService
  ) { }

  url = environment.backendUrl;

  async addRecord(record: any) {
    const responce = await (await fetch(this.url + 'addRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)  
    })).json();
    return responce;
  }

  async updateRecord(record: any) {
    const responce = await (await fetch(this.url + 'updateRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)  
    })).json();
    return responce;
  }

  async getRecords(z = null) {
    return (await (await fetch(this.url + 'getRecords' + (z ? '/' + z : ''))).json());
  }

  async getRecordById(refID: string) {
    return (await (await fetch(this.url + 'getRecordById/' + refID)).json());
  }

  async getDetails(refID: string) {
    return (await (await fetch(this.url + 'getDetails/' + refID)).json());
  }

  async getSummary(refID: string) {
    return (await (await fetch(this.url + 'getSummary/' + refID)).json());
  }

  async searchTLDR(query: string) {
    return (await (await fetch(this.url + 'searchRecords/' + query)).json());
  }

  async searchDetails(query: string) {
    return (await (await fetch(this.url + 'searchDetails/' + query)).json());
  }

  async createUser(user: any) {
    return (await (await fetch(this.url + 'createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })).json());
  }

  async updateUser(user: any = this.OAuth.userRecord){
    if(user._id){
      return (await (await fetch(this.url + 'updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })).json());
    } else {
      return null;
    }
  }

  async getCountry(lat: string, long:string){
    try{
      const data = await(await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.750734250cd7cfc5e6c5146cd468034e&lat=${lat}&lon=${long}&format=json`)).json();
      return data?.address?.country || null;
    } catch(e){
      return null;
    }

  }
}
