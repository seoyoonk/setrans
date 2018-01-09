import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { SignaturePage } from '../signature/signature';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  item = { DISPATCH_NOTE_NO: "", CONSIGNEE_TEL2: "" };
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public rest: RestProvider) {

  }

  ionViewDidLoad() {
    this.rest.getDetail(this.navParams.data.DISPATCH_NOTE_NO).subscribe(
      (res) => {
        this.item = res;
      },
      (err) => {
        alert(err);
      }
    );
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  finishDelivery() {
    const modal = this.modalCtrl.create(SignaturePage);
    modal.onDidDismiss(
      (data, role) => {
        if (data == null || data.signature == null) {
          return;
        }
        this.rest.showLoading("요청중입니다.");
        this.rest.finishDelivery(this.item.DISPATCH_NOTE_NO, data.signature, this.item.CONSIGNEE_TEL2).subscribe(
          (res) => {
            this.rest.getIngList();
            this.rest.closeLoading();
            this.viewCtrl.dismiss();
          },
          (err) => {
            this.rest.closeLoading();
            alert(err);
          });
      });
      modal.present();
  }


}
