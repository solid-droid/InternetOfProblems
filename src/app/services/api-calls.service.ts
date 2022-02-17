import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor() { }

  url = 'http://localhost:9000/.netlify/functions/api/';

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

  async getDetails(refID: string) {
    return (await (await fetch(this.url + 'getDetails/' + refID)).json());
  }

  async getSummary(refID: string) {
    return (await (await fetch(this.url + 'getSummary/' + refID)).json());
  }
}
