import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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

  ionViewDidEnter() {
    let that = this;
    this.DISPATCH_NOTE_NO = '';

    this.rest.setBarCodeCallback(function (data) {
      that.setBarcode(data);
    });
  }

  setBarcode(data) {
    if(data == null || data.trim() == ""){
      return;
    }
    this.DISPATCH_NOTE_NO = data;
    const profileModal = this.modalCtrl.create(DetailPage, { DISPATCH_NOTE_NO: this.DISPATCH_NOTE_NO });
    profileModal.present();
  }
  getBarCode() {
            this.rest.getBarCode();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }
  goDetail(item) {
    const profileModal = this.modalCtrl.create(DetailPage, item);
    profileModal.present();

  }
}
