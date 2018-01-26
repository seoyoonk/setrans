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
        if (res.ERR_MSG != null || res.error != null) {
          alert(res.ERR_MSG  || res.error) ;
          this.viewCtrl.dismiss();
          return;
        }
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
  saveDelivery()
  {
    this.rest.showLoading("요청중입니다.");
        this.rest.saveDelivery(this.item).subscribe(
          (res) => {
            this.rest.closeLoading();
            alert("저장하였습니다.");
            this.viewCtrl.dismiss();
          },
          (err) => {
            this.rest.closeLoading();
            alert(err);
          });
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
            alert("완료하였습니다.");
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
