import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication/authentication.service";
import {SliderServiceService} from 'src/app/services/slider-service/slider-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authService:AuthenticationService,
    private slider:SliderServiceService
  ) {
   this.initializeApp();
  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.statusBar.backgroundColorByName("green");
      // this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();

      this.authService.checkToken();
      this.authService.authenticationState.subscribe(state=>{
        if(state){
           this.router.navigate(["/users/dashboard/home"]);
          }else{
            this.router.navigate(["/user-login"]);
        }
        
      })

      this.slider.CheckTokenSlides();
      this.slider.setState.subscribe(states=>{
       if(states){
         this.router.navigate(["/user-login"]);
        }else{
          this.router.navigate(["home"]);
      }
      })

      


 
      
    });
  }
}
