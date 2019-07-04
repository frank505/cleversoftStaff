import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication/authentication.service";
import {SliderServiceService} from 'src/app/services/slider-service/slider-service.service';
import { Network } from '@ionic-native/network/ngx';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController,Events } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  modalState:boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authService:AuthenticationService,
    private slider:SliderServiceService,
    private network:Network,
    private alert:AlertService,
    private diagnostic:Diagnostic,
    private alertCtrl:AlertController,
    private events:Events,
    private toast:ToastService
  ) {
    setTimeout(() => {
      this.initializeApp();      
    }, 700)
   
  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.statusBar.backgroundColorByName("green");
      // this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    //this.networkConnectionCheck();
       this.authService.checkToken(); 
      this.authService.authenticationState.subscribe(state=>{
        if(!state){
          this.router.navigate(["/user-login"]);
          }else{
            this.router.navigate(["/users/dashboard/home"]);
          }
      })

      setInterval(() => {
        this.networkConnectionCheck();
      }, 10000);

      // this.slider.CheckTokenSlides();
      // this.slider.setState.subscribe(states=>{
      //  if(states){
      //    this.router.navigate(["/user-login"]);
      //   }else{
      //     this.router.navigate(["home"]);
      // }
      // })

      
     

 
      
    });
  }


 async networkConnectionCheck()
  {
   // if no internet, notice is a string
   if (this.network.type == 'none' && this.modalState==false ) { 
    // stuff if disconnected
    this.displayAlertModalOptions();
  }else if(this.network.type=='none' && this.modalState==true)
  {
    this.toast.presentFadeToast("please turn on your network, Note that most functionalities wont be available without the network",2000);
  } 
  else {
    //stuff if connected
    console.log('there is now network')
  }  
  
  }


async displayAlertModalOptions()
{
  this.modalState = true;
  let alert = await this.alertCtrl.create({
    header: 'Network',
    message: 'please turn on your network, Note that most functionalities wont be available without the network',
    buttons: [
      {
        text: 'cancel',
        role: 'Cancel',
        handler: () => {},
      },
      {
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          this.diagnostic.switchToMobileDataSettings();
          
         // this.alert.presentAlert("error","error","no network")
        },
      },
    ],
  });
  alert.present();
}




}
