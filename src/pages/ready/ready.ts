import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest: RestProvider) {
  }

  ionViewDidLoad() {
  }
  
  reorderItems(indexes) {
    let element = this.rest.readyList[indexes.from];
    this.rest.readyList.splice(indexes.from, 1);
    this.rest.readyList.splice(indexes.to, 0, element);
  }

  startDelivery()
  {
    this.rest.startGPS();
  }
}
