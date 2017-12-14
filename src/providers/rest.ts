import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
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
  cordova : boolean = false;
  constructor(public http: Http, private backgroundGeolocation: BackgroundGeolocation) {
    console.log('Hello RestProvider Provider');
  }
  setCordova(cordova:boolean)
  {
    this.cordova = cordova;
  }
  isCordova()
  {
    return this.cordova;
  }

  //배송 시작시나 로그인 후 배송시작되었다면..
  startGPS()
  {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      interval : this.prop.gps_term * 1000,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    };
    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
      this.sendLocation(location.latitude, location.longitude).subscribe(
        () => console.log(location) ,
        (error) =>  alert( JSON.stringify(error) )
      );
    });
    this.backgroundGeolocation.start();
  }
  stopGPS()
  {
    this.backgroundGeolocation.stop();
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
  insertDelivery(DISPATCH_NOTE_NO:string) {
    
   return this.post("/api/ready_list", {DISPATCH_NOTE_NO: DISPATCH_NOTE_NO, OWNER: this.userInfo.OWNER, CAR_REGIST_NO: this.userInfo.CAR_REGIST_NO, SHIPMENT_NO: this.userInfo.SHIPMENT_NO});
  }
}
