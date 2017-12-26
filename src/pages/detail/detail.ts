import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';

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

  item = {};
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    
  }

  ionViewDidLoad() {
    this.rest.getDetail(this.navParams.data.DISPATCH_NOTE_NO).subscribe(
      (res)=>{
        this.item = res;
      },
      (err)=>{
        alert(err);
      }
    );
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
 

}
