import { Component, ViewChild } from '@angular/core';
import { Platform , ToastController , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
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
  constructor(private platform: Platform, toastCtrl:ToastController, statusBar: StatusBar, public splashScreen: SplashScreen,
    private backgroundGeolocation: BackgroundGeolocation, private rest:RestProvider, private sim: Sim) {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      interval : this.rest.prop.gps_term * 1000,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    };
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      
      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      platform.registerBackButtonAction(() => {
           if (!this.nav.canGoBack()) {
              //Double check to exit app
              if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                  platform.exitApp(); //Exit from app
              } else {
                  let toast = toastCtrl.create({
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
      });
      
      if (platform.is('cordova')) {
        this.sim.requestReadPermission();
        
        this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
          rest.sendLocation(location.latitude, location.longitude).subscribe(
            () => console.log(location) ,
            (error) =>  alert( JSON.stringify(error) ));
        });

        this.getPhoneNumber();
        this.getFCMToken();
      }
      else{
        this.mobile="00011112222";
        this.token="";
        this.appStart();

      }

      
    });
    
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
              this.rest.userInfo = data.user;
              this.rest.prop = data.prop;
              //alert(this.rest.userInfo.DRIVER_NM + "님, 오늘도 좋은 하루 되세요.");
              this.rootPage = TabsPage;
              if (this.platform.is('cordova')) {
                this.backgroundGeolocation.start();
                this.splashScreen.hide();
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
    this.sim.getSimInfo().then(
      (info) => {
        if(info.phoneNumber)
        {
          
          this.mobile = info.phoneNumber;
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

