import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  item
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data;
    this.item.rcvType="0";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  goTMap(item)
  {
    let lat="37.473105";
    let lng="126.868409";
    window.open("tmap://route?goalx=" + lat + "&goaly=" + lng + "&goalname=" + item.addr , '_system');
  }

}
