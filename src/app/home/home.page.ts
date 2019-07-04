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
  nextToggler:boolean = false;
  stateChecker:boolean = false;
  constructor(private router:Router,private loadingController: LoadingController,
  private slider:SliderServiceService) {
     this.topStories = [
      {title: "Customer Satisfaction", author: "Customers satisfaction is one of our core values as we place customers first in every service rendered", body: "Customers satisfaction is one of our core values as we place customers first in every service rendered", picture: "../../assets/images/paypal (1).jpg"},
      {title: "Build your dream", author: "With a wide variety off services that we offer on cleversoft we help people build thier dream and bussiness by giving them platforms on different avaialable platforms today.", body: "With a wide variety off services that we offer on cleversoft we help people build thier dream and bussiness by giving them platforms on different avaialable platforms today.", picture: "../../assets/images/paypal (2).jpg"},
      {title: "Path to Your Success", author: "Its Our joy to always be a part to your success and has always been for us this past years thanks for giving us the opurtunity", body: "", picture: "../../assets/images/paypal (3).jpg"},
    ]
  // this.state = this.slider.state;
  }

  
  
  

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 // this.redirect();
 
}

nextPage()
{
  this.router.navigate(["user-login"]);
  this.slider.setTokenForSlides();

}

  ionSlideReachEnd()
  {
   this.nextToggler = true;
  }

  async redirect()
  {
    this.slider.CheckTokenSlides();
      this.slider.setState.subscribe(states=>{
       if(states){
        this.stateChecker = false;
         this.router.navigate(["/user-login"]);
        }else{
          this.stateChecker = true;
          this.router.navigate(["home"]);
      }
      })
  }



  
  

}
