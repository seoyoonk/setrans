import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { Platform } from 'ionic-angular';
/**
 * Generated class for the FinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  
  private signaturePadOptions = { // Check out https://github.com/szimek/signature_pad
    minWidth: 1,
    canvasWidth: 0,
    canvasHeight: 0,
    backgroundColor: '#f2f2f2',
    penColor: '#000000'
  };

  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
    let perW = this.platform.width() / 100.0
    let perH = this.platform.height() / 100.0
    this.signaturePadOptions.canvasWidth = 90.0 * perW;
    this.signaturePadOptions.canvasHeight = 70.0 * perH;
  }

  ionViewDidLoad() {
  }

  finish(){
    let signature = this.signaturePad.toDataURL();
    this.viewCtrl.dismiss({signature : signature});
  }
  cancel(){
    this.viewCtrl.dismiss();
  }
}
