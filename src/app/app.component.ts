import { Component, ViewChild } from '@angular/core';
import { Platform , ToastController , Nav, IonicApp} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { RestProvider } from '../providers/rest';
import { Sim } from '@ionic-native/sim';


declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  token:string;
  mobile:string;

  @ViewChild(Nav) nav: Nav;
  constructor(private platform: Platform, private toastCtrl:ToastController, statusBar: StatusBar, public splashScreen: SplashScreen,
    private rest:RestProvider, private sim: Sim, private ionicApp: IonicApp) {
    
   
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      
      

      
      if (platform.is('cordova')) {
        
        this.sim.requestReadPermission();
        this.setBackButton();
      
        this.mobile="00011112222";
        //this.getPhoneNumber();
        this.getFCMToken();
        //this.token = "";
      }
      else{
        this.mobile="00011112222";
        this.token="";
        this.appStart();

      }

      
    });
    
  }
  
  setBackButton()
  {
    var lastTimeBackPress = 0;
    var timePeriodToExit  = 2000;

    this.platform.registerBackButtonAction(() => {
      let activePortal = this.ionicApp._modalPortal.getActive();
      if(activePortal)
      {
        activePortal.dismiss();
      }
      else
      {
         if (!this.nav.canGoBack()) {
            //Double check to exit app
            if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                this.platform.exitApp(); //Exit from app
            } else {
                let toast = this.toastCtrl.create({
                    message:  'Press back again to exit App?',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                lastTimeBackPress = new Date().getTime();
            }
        } else {
            // go to previous page
            this.nav.pop();
        }
      }
    }  );

  }
  
  getFCMToken() {
    
    
    if (typeof (FCMPlugin) !== "undefined") {
      FCMPlugin.getToken(token => {
    
        this.token = token;
        this.appStart();
      }
      );
    }
    else {
      alert("get push token fail");
      
    }
  }
  
  appStart()
  {
    if(this.mobile != null && this.token != null)
    {
      this.rest.appStart(this.mobile, this.token).subscribe(
        (data) =>{
            if(data.error != null)
            {
              alert(data.error);
              return ;
            }
            else
            {
              if(data.user  == null)
              {
                alert("기사님이 셋팅된 것이 없습니다.");
                this.platform.exitApp();
              }
              else
              {
                this.rest.userInfo = data.user;
                this.rest.prop = data.prop;
                //alert(this.rest.userInfo.DRIVER_NM + "님, 오늘도 좋은 하루 되세요.");
                this.rootPage = TabsPage;
                alert('one');
                if (this.platform.is('cordova')) {
                  if(this.rest.userInfo.IS_ING =='Y')
                  {
                    this.rest.startGPS();
                  }
                  alert('2');
                  this.splashScreen.hide();
                }
              }
            }
        },
        (err)=>{
          alert(err);
          return ;
        });
       
        
  
  
      
    }
  }
  getPhoneNumber()
  {
    alert('phone');
    this.sim.getSimInfo().then(
      (info) => {
        if(info.phoneNumber)
        {
          let phone: string = info.phoneNumber;
          if (info.phoneNumber.startsWith("+82")) {
            phone = "0" + info.phoneNumber.substring(3, 5) + info.phoneNumber.substring(5, info.phoneNumber.length - 4) + info.phoneNumber.substring(info.phoneNumber.length - 4, info.phoneNumber.length);
          }
          this.mobile = phone;
          this.appStart();
          
        }
        else
        {
          if(info.phoneCount>0)
          {
            setTimeout(this.getPhoneNumber(), 1000);
          }
        }
      
    });
  }
}

