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

  loadList = [ ];
  errorMessage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getList();
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
