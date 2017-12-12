import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://211.51.22.71:8080';
  userInfo={OWNER:'00', CAR_REGIST_NO:'',DRIVER_TEL:'019101191', DRIVER_NM:'김기사', SHIPMENT_NO:''};
  prop = { gps_term: 100 };
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
  appStart(phone:string, fcm:string)
  {
   
    let param = {phone: phone, fcm:fcm};
    return this.post("/api/appStart", param);
    
  }
  private post(url, param1: any) {
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Content-Type', 'application/json');
        if(this.userInfo.CAR_REGIST_NO != '')
        {
          param1.CAR_REGIST_NO= this.userInfo.CAR_REGIST_NO;
        }
        if(this.userInfo.SHIPMENT_NO != '')
        {
          param1.SHIPMENT_NO=this.userInfo.SHIPMENT_NO;
        }
        console.log(param1);
        return this.http.post(this.apiUrl + url, param1, { headers: headers }).map(
          (res)=>{
              
              return res.json();
              
            }
            
            
         
        );
    
    
      }
  getReadyList() {
    
   return this.post("/api/ready_list", {});
  }
  sendLocation(lat : number, lng :number)
  {
    let url : string = "http://192.168.0.17:8090/test/sendLocation.jsp?lat=" + lat + "&lng=" + lng;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
}
