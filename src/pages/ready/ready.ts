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
  

}
