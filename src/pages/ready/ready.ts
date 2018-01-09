import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
/**
 * Generated class for the ReadyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ready',
  templateUrl: 'ready.html',
})
export class ReadyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest: RestProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  reorderItems(indexes) {
    let element = this.rest.readyList[indexes.from];
    this.rest.readyList.splice(indexes.from, 1);
    this.rest.readyList.splice(indexes.to, 0, element);
  }

  saveOrder() {
    let idx = 1;
    for (let i of this.rest.readyList) {
      i.DELIVERY_SEQ = idx++;
    }
    this.rest.saveOrder().subscribe(
      (res) => {
        this.rest.getReadyList();
        let alertObj = this.alertCtrl.create({
          title: '배송 시작하시겠습니까?',
          message: '',
          buttons: [
            {
              text: '예',
              role: 'yes',
              handler: () => {
                this.rest.startDelivery().subscribe(
                  (res) => {
                    this.rest.getReadyList();
                  },
                  (err) => {
                    console.log(err)
                  });
                if (this.rest.isCordova()) {
                  this.rest.startGPS();
                }
              }
            },
            {
              text: '아니요',
              role: 'nein',
              handler: () => {
              }
            }
          ]
        });
        alertObj.present();
      },
      (err) => { console.log(err) });
  }
}
