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
    console.log(responce);
    return responce;
  }

  async getRecords(x = null, y = null, z = null) {
      const params  = `${x ? `/${x}` : 'null'}${y ? `/${y}` : 'null'}${z ? `/${z}` : 'null'}`;
      const responce = (await (await fetch(this.url + 'getRecords' + params)).json());
      console.log(responce);
      return responce;
  }
}
