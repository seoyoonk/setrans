import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider,
    private alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter () {
    let that = this;
    this.DISPATCH_NOTE_NO = '';
    this.rest.setBarCodeCallback(function(data)
    {
      that.setBarcode( data ) ;
    });
  }
  
  setBarcode(data)
  {
    this.DISPATCH_NOTE_NO = data;
    this.deleteDelivery();
  }
  getBarCode()
  {
    this.rest.getBarCode( );  
  }
  delItem(idx)
  {
    this.DISPATCH_NOTE_NO = this.rest.readyList.splice(idx, 1)[0].DISPATCH_NOTE_NO;
    this.deleteDelivery();
  }
  
  deleteDelivery() {
    let alertObj = this.alertCtrl.create({
      title: '취소 확인',
      message: '취소하시겠습니까?',
      buttons: [
        {
          text: '예',
          role: 'yes',
          handler: () => {
            if(this.DISPATCH_NOTE_NO == null || this.DISPATCH_NOTE_NO.trim().length == 0){
              alert("송장번호를 입력해 주세요");
              return; 
            }
            this.rest.showLoading("요청중입니다.");
            this.rest.deleteDelivery(this.DISPATCH_NOTE_NO).subscribe(
              (res) => {
                this.DISPATCH_NOTE_NO = '';
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
                this.DISPATCH_NOTE_NO = '';
                alert(error)
              }
            )
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alertObj.present();

  }


}
