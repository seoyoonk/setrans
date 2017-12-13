import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
/**
 * Generated class for the LoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  loadList = [{DISPATCH_NOTE_NO:11111, ITEM_NM:'맛난핫바',zip:'12901', addr:'서울시 강남구 논현로 132길 6 미래빌딩5층 굿스플로', CONSIGNEE_NM:'홍길동'},
  {DISPATCH_NOTE_NO:12222, ITEM_NM:'장남감',zip:'13901', addr:'서울시 금천구 가산동 대성 디폴리스', CONSIGNEE_NM:'이순신'},
  {DISPATCH_NOTE_NO:1122, ITEM_NM:'옷', zip:'14901', addr:'서울시 강남구 역삼동 세방빌딩 10층', CONSIGNEE_NM:'김철수'} ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    
    if(this.rest.userInfo.SHIPMENT_NO != '') this.getList();
  }
  getList() {
    this.rest.getReadyList()
       .subscribe(
         res => {
           this.loadList = res.list;
           
         },
         error => alert( error));
  }
  delItem(idx)
  {
    this.loadList.splice(idx, 1);
    
  }
  

}
