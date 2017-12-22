import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { RestProvider } from '../../providers/rest';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }
  goDetail(item)
  {
    const profileModal = this.modalCtrl.create(DetailPage, item);
    profileModal.present();
    
  }

}
