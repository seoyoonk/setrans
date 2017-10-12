import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://localhost:8100';
  data;
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
  getDeliveryList(kubun : string) {
    var response = this.http.get(this.apiUrl + "/deliveryList.json").map(res => res.json());
    return response;
  }
  
}
