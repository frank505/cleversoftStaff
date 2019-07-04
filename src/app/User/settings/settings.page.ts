import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { NativePageTransitions,NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController  } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  SelectValue:any;
  inAppBrowserOptionsSettings : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    // closebuttoncaption : 'Close', //iOS only
    // disallowoverscroll : 'no', //iOS only 
    // toolbar : 'yes', //iOS only 
    // enableViewportScale : 'no', //iOS only 
    // allowInlineMediaPlayback : 'no',//iOS only 
    // presentationstyle : 'pagesheet',//iOS only 
    // fullscreen : 'yes',//Windows only    
};




  constructor(
    private router:Router,
    private iab:InAppBrowser,
    private nativePageTransition:NativePageTransitions,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }

  ChangePage(url)
  {
  this.router.navigateByUrl(url)
  }

  OpeninAppBrowser(url)
  {
    let target = "_blank";
   this.iab.create(url,target,this.inAppBrowserOptionsSettings);
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
