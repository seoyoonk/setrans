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
  selector: 'page-load-cancel',
  templateUrl: 'load_cancel.html',
})
export class LoadCancelPage {

  DISPATCH_NOTE_NO : string = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider,  private  barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
  }
  delItem(idx)
  {
    
    this.DISPATCH_NOTE_NO = this.rest.readyList.splice(idx, 1)[0].DISPATCH_NOTE_NO;
    this.deleteDelivery();
    
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
  deleteDelivery(){
    this.rest.showLoading("요청중입니다.");
    this.rest.deleteDelivery(this.DISPATCH_NOTE_NO).subscribe(
      (res) => {
        if(res.ERR_MSG != null){
          this.rest.closeLoading();
          alert(res.ERR_MSG);
          return;
        }
        this.rest.userInfo.SHIPMENT_NO = res.out_SHIPMENT_NO;
        this.rest.getReadyList();
        this.rest.closeLoading();
      },
      (error) => {
        alert( error)
      }
    )
  }
  

}
