import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { RestProvider } from '../../providers/rest';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SignaturePage } from '../signature/signature';
/**
 * Generated class for the FinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html',
})
export class FinishPage {

  DISPATCH_NOTE_NO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public rest: RestProvider, private barcodeScanner: BarcodeScanner) {
  }

  getBarCode() {
    if (this.rest.isCordova()) {
      this.barcodeScanner.scan().then((barcodeData) => {

        this.DISPATCH_NOTE_NO = barcodeData.text;
      }, (err) => {
        alert(err);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }
  goDetail(item) {
    const profileModal = this.modalCtrl.create(DetailPage, item);
    profileModal.present();

  }
  finishDelivery() {
    const modal = this.modalCtrl.create(SignaturePage);
    modal.onDidDismiss(
      (data, role) => {
        console.log(data);
        console.log(role);
        if(data == null || data.signature == null){
          return;
        }
        this.rest.showLoading("요청중입니다.");
        this.rest.finishDelivery(this.DISPATCH_NOTE_NO, data.signature).subscribe(
          (res) => {
            this.rest.getIngList();
            this.rest.closeLoading();
          },
          (err) => {
            this.rest.closeLoading();
            alert(err);
          }
        );
      });
      modal.present();

  }

}
