import { Component } from '@angular/core';

import { FinishPage } from '../finish/finish';
import { LoadPage } from '../load/load';
import { ReadyPage } from '../ready/ready';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ReadyPage;
  tab2Root = LoadPage;
  tab3Root = FinishPage;

  constructor() {

  }
}
