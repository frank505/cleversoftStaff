import { Component } from '@angular/core';
import { Router} from '@angular/router'; 
import { LoadingController } from '@ionic/angular';
import {SliderServiceService} from 'src/app/services/slider-service/slider-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  topStories: any;
  state:boolean ;
  slideOpts = {
    effect: 'flip'
  };
  constructor(private router:Router,private loadingController: LoadingController,
  private slider:SliderServiceService) {
    this.topStories = [
      {title: "Exploring San Francisco", author: "Rea Ramsey", body: "", picture: "../../assets/images/paypal (1).jpg"},
      {title: "Coffee the right way", author: "Ellesha Hartley", body: "", picture: "../../assets/images/paypal (2).jpg"},
      {title: "Best Hiking In Yosemite", author: "Vinnie Alexander", body: "", picture: "../../assets/images/paypal (3).jpg"},
    ]
   this.state = slider.state;

  }

  ionSlideReachEnd()
  {
    this.presentLoadingWithOptions();
    setTimeout(() => {
      this.router.navigate(["user-login"]);
    }, 2000);
   this.slider.setTokenForSlides();
  }

  async redirect()
  {
    
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 2000,
      message: 'loading...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  

}
