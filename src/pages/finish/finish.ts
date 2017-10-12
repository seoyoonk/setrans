import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
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

  finishList = [{zip:'12901', addr:'서울시 강남구 논현로 132길 6 미래빌딩5층 굿스플로', receiver:'홍길동'},
  {zip:'13901', addr:'서울시 금천구 가산동 대성 디폴리스', receiver:'이순신'},
  {zip:'14901', addr:'서울시 강남구 역삼동 세방빌딩 10층', receiver:'김철수'}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
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
