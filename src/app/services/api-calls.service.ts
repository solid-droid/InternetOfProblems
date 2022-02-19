import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor() { }

  url = 'https://internet-of-problems-backend.herokuapp.com/';
  // url = 'http://localhost:9000/'

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
}
