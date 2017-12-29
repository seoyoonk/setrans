import { Component } from '@angular/core';
import { TabsPage } from '../../pages/tabs/tabs';
import {NavController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  
  id : string;
  pwd : string;
  constructor(public rest: RestProvider, private navi: NavController) {

  }

  ionViewDidLoad() {
    this.id = this.rest.userInfo.PHONE_NO;
    this.pwd = "01038770766";
  }
  
  login()
  {
    this.rest.showLoading("처리중입니다.");
    this.rest.appStart(this.pwd).subscribe(
        (data) =>{
            if(data.error != null)
            {
              this.rest.closeLoading();
              alert(data.error);
              return ;
            }
            else
            {
              if(data.user  == null)
              {
                this.rest.closeLoading();
                alert("패스워드를 다시 확인하세요.");
                
              }
              else
              {
                this.rest.userInfo = data.user;
                this.rest.prop = data.prop;
                //alert(this.rest.userInfo.DRIVER_NM + "님, 오늘도 좋은 하루 되세요.");
              
               
                if (this.rest.isCordova()) {
                  if(this.rest.userInfo.IS_ING =='Y')
                  {
                    this.rest.startGPS();
                  }
                 
                  
                }
                this.navi.setRoot(TabsPage).then(data => {
                   
                }, (error) => {
                  
                });
                this.rest.closeLoading();
              }
            }
        },
        (err)=>{
          this.rest.closeLoading();
          alert(err);
          return ;
        });
       
        
  
  
      
    }
  
}
