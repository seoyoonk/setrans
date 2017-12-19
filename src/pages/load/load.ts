import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the LoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-load',
  templateUrl: 'load.html'
})
export class LoadPage {

  DISPATCH_NOTE_NO : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, private  barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
  }
  getBarCode()
  {
    if(this.rest.isCordova())
    {
      this.barcodeScanner.scan().then((barcodeData) => {
        
        this.DISPATCH_NOTE_NO = barcodeData.text;
      }, (err) => {
          alert(err);
      })
    }
  }
  insertDelivery(){
    this.rest.showLoading("요청중입니다.");
    this.rest.insertDelivery(this.DISPATCH_NOTE_NO).subscribe(
      (res) => {
        if(res.ERR_MSG != null){
          alert(res.ERR_MSG);
          return;
        }
        this.rest.userInfo.SHIPMENT_NO = res.out_SHIPMENT_NO;
        this.rest.getReadyList();
        this.rest.closeLoading();
      },
      (error) => {
        this.rest.closeLoading();
        alert( error);
      }
    )
  }
  delItem(idx)
  {
    this.rest.readyList.splice(idx, 1);
    
  }
  

}
