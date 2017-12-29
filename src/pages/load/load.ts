import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
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

  DISPATCH_NOTE_NO: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
   
  }
 

  ionViewDidEnter () {
    let that = this;
    this.rest.setBarCodeCallback(function(data)
    {
      that.setBarcode( data ) ;
    });
  }
  
  setBarcode(data)
  {
    this.DISPATCH_NOTE_NO = data;
    this.insertDelivery();
  }
  getBarCode()
  {
    this.rest.getBarCode( );  
  }
  insertDelivery() {
    this.rest.showLoading("요청중입니다.");
    this.rest.insertDelivery(this.DISPATCH_NOTE_NO).subscribe(
      (res) => {
        if (res.ERR_MSG != null) {
          this.rest.closeLoading();
          alert(res.ERR_MSG);
         
          return;
        }
        this.rest.userInfo.SHIPMENT_NO = res.out_SHIPMENT_NO;
        this.rest.getReadyList();
        this.rest.closeLoading();
      },
      (error) => {
        this.rest.closeLoading();
        alert(error);
      }
    )
  }
  delItem(idx) {
    this.rest.readyList.splice(idx, 1);

  }


}
