import { Component } from '@angular/core';

import { FinishPage } from '../finish/finish';
import { LoadPage } from '../load/load';
import { LoadCancelPage } from '../load_cancel/load_cancel';
import { ModalController } from 'ionic-angular';
import { ReadyPage } from '../ready/ready';
import { DetailPage } from '../detail/detail';

import { RestProvider } from '../../providers/rest';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ReadyPage;
  tab2Root = LoadPage;
  tab3Root = FinishPage;
  tab4Root = LoadCancelPage;

  notiCnt: number = 0;

  constructor(public rest: RestProvider, private fcm: FCM, public modalCtrl: ModalController) {
    if(this.rest.isCordova())
    {
      fcm.onNotification().subscribe(data => {
        const profileModal = this.modalCtrl.create(DetailPage, data);
        profileModal.present();
        
      });
    }
  }

  ionViewDidLoad() {

    this.rest.getReadyList();
  }
}
