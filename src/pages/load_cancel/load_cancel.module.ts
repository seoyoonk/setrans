import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadCancelPage } from './load_cancel';

@NgModule({
  declarations: [
    LoadCancelPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadCancelPage),
  ],
})
export class LoadPageModule {}
