import { Component, OnInit } from '@angular/core';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController  } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(
    private nativePageTransition:NativePageTransitions,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }


  
  MoveBack()
  {
     let options:NativeTransitionOptions = {
    direction: 'left',
    duration: 400,
    slowdownfactor: -1,
    iosdelay: 50
  }
    this.navCtrl.back();
  //  this.nativePageTransition.slide(options);
  }
}
