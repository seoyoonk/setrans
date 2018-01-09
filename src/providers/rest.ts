import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import 'rxjs/add/operator/map';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
declare var bluebirdBarcodeScanner;
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://211.51.22.71:8080';
  userInfo = { FCM: '', OWNER: '00', PHONE_NO: '', CAR_REGIST_NO: '', DRIVER_TEL: '019101191', DRIVER_NM: '김기사', SHIPMENT_NO: '', IS_ING: 'N' };
  readyList = [{ DISPATCH_NOTE_NO: '', ITEM_NM: '', zip: '', addr: '', CONSIGNEE_NM: '', DELIVERY_SEQ: 0 }];
  ingList = [{ DISPATCH_NOTE_NO: '', ITEM_NM: '', zip: '', addr: '', CONSIGNEE_NM: '', DELIVERY_SEQ: 0 }];
  prop = { gps_term: 100 };
  cordova: boolean = false;
  loading;
  barcodeCallBackFn;
  manufacturer: string = "";
  constructor(public http: Http, private backgroundGeolocation: BackgroundGeolocation,
    private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner) {
    console.log('Hello RestProvider Provider');
  }
  setCordova(cordova: boolean) {
    this.cordova = cordova;
  }
  isBB()// bluebird여부
  {
    return this.manufacturer == "Bluebird";
  }
  isCordova() {
    return this.cordova;
  }
  showLoading(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }
  closeLoading() {
    if (this.loading != null) this.loading.dismiss();
  }

  //배송 시작시나 로그인 후 배송시작되었다면..
  startGPS() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      interval: this.prop.gps_term * 1000,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    };
    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
      this.sendLocation(location.latitude, location.longitude).subscribe(
        () => console.log(location),
        (error) => alert(JSON.stringify(error))
      );
    });
    this.backgroundGeolocation.start();
  }
  stopGPS() {
    this.backgroundGeolocation.stop();
  }
  appStart(pwd: string) {

    let param = { phone: this.userInfo.PHONE_NO, fcm: this.userInfo.FCM, pwd: pwd };
    return this.post("/api/appStart", param);

  }




  setBarCodeCallback(callback) {

    this.barcodeCallBackFn = callback;
    if (this.isBB()) {

      bluebirdBarcodeScanner.register(this.barcodeCallBackFn, function (argument) {
        alert("failed to register barcode scanner");
      });
    }

  }
  getBarCode() {

    let that = this;

    if (this.isCordova()) {
      if (!this.isBB()) {
        this.barcodeScanner.scan().then((barcodeData) => {

          that.barcodeCallBackFn(barcodeData.text);
        }, (err) => {
          alert(err);
        })
      }
    }
  }
  private post(url, param1: any) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('Content-Type', 'application/json');
    if (this.userInfo.CAR_REGIST_NO != '' && this.userInfo.CAR_REGIST_NO != null) {
      param1.CAR_REGIST_NO = this.userInfo.CAR_REGIST_NO;
    }
    if (this.userInfo.SHIPMENT_NO != '' && this.userInfo.SHIPMENT_NO != null) {
      param1.SHIPMENT_NO = this.userInfo.SHIPMENT_NO;
    }
    if (this.userInfo.OWNER != '' && this.userInfo.OWNER != null) {
      param1.OWNER = this.userInfo.OWNER;
    }
    if (this.userInfo.DRIVER_NM != '' && this.userInfo.DRIVER_NM != null) {
      param1.DRIVER_NM = this.userInfo.DRIVER_NM;
    }
    if (this.userInfo.DRIVER_TEL != '' && this.userInfo.DRIVER_TEL != null) {
      param1.DRIVER_TEL = this.userInfo.DRIVER_TEL;
    }
    if (this.userInfo.PHONE_NO != '' && this.userInfo.PHONE_NO != null) {
      param1.PHONE_NO = this.userInfo.PHONE_NO;
    }
    console.log(param1);
    return this.http.post(this.apiUrl + url, param1, { headers: headers }).map(
      (res) => {

        return res.json();

      }



    );


  }
  getReadyList() {

    this.post("/api/ready_list", {})
      .subscribe(
      res => {
        return this.readyList = res.list;
      },
      error => alert(error));
  }
  getIngList() {

    return this.post("/api/ing_list", {})
      .subscribe(
      res => {
        this.ingList = res.list;
      },
      error => alert(error));
  }
  sendLocation(lat: number, lng: number) {
    return this.post("/api/insert_location", { TRUCK_LAT: lat, TRUCK_LOT: lng });
  }
  insertDelivery(DISPATCH_NOTE_NO: string) {
    return this.post("/api/insert_delivery", { DISPATCH_NOTE_NO: DISPATCH_NOTE_NO });
  }
  deleteDelivery(DISPATCH_NOTE_NO: string) {
    return this.post("/api/delete_delivery", { DISPATCH_NOTE_NO: DISPATCH_NOTE_NO });
  }
  saveOrder() {
    return this.post("/api/save_order", { list: this.readyList });
  }
  startDelivery() {
    return this.post("/api/start_delivery", { list: this.readyList });
  }
  getDetail(DISPATCH_NOTE_NO) {
    return this.post("/api/detail", { DISPATCH_NOTE_NO: DISPATCH_NOTE_NO });
  }
  finishDelivery(DISPATCH_NOTE_NO: string, sign: string, phone: string) {
    return this.post("/api/finish_delivery", { DISPATCH_NOTE_NO: DISPATCH_NOTE_NO, SIGN: sign, CONSIGNEE_TEL2: phone });
  }
}
