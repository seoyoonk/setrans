import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule , Nav, ToastController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { FinishPage } from '../pages/finish/finish';
import { LoadPage } from '../pages/load/load';
import { LoadCancelPage } from '../pages/load_cancel/load_cancel';
import { SignaturePage } from '../pages/signature/signature';
import { ReadyPage } from '../pages/ready/ready';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { RestProvider } from '../providers/rest';
import { HttpModule } from '@angular/http';
import { Sim } from '@ionic-native/sim';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FCM } from '@ionic-native/fcm'
@NgModule({
  declarations: [
    MyApp,
    TabsPage, FinishPage, ReadyPage, LoadPage, LoadCancelPage, DetailPage, SignaturePage
    , LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage, FinishPage, ReadyPage, LoadPage, LoadCancelPage, DetailPage, SignaturePage,LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    BackgroundGeolocation,
    Nav, ToastController,
    Sim,BarcodeScanner,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
