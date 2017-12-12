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

  loadList = [{zip:'12901', addr:'서울시 강남구 논현로 132길 6 미래빌딩5층 굿스플로', receiver:'홍길동'},
  {zip:'13901', addr:'서울시 금천구 가산동 대성 디폴리스', receiver:'이순신'},
  {zip:'14901', addr:'서울시 강남구 역삼동 세방빌딩 10층', receiver:'김철수'} ];
  errorMessage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    //this.getList();
  }
  getList() {
    this.rest.getDeliveryList("load")
       .subscribe(
         res => {
           this.loadList = res;
           
         },
         error =>  this.errorMessage = error);
  }
  delItem(idx)
  {
    this.loadList.splice(idx, 1);
    
  }
  

}
