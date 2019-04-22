import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import {AuthenticationService} from '../services/authentication/authentication.service';
import { LoadingController,Platform } from '@ionic/angular';
import { FingerprintAIO,FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';
import { ToastService } from "../services/toast/toast.service";
import {AlertService} from '../services/alert/alert.service';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  public form = {
    email:null,
    password:null
  }
  data_response:any;
  error:any;
  constructor(private router:Router,
    private authService:AuthenticationService,
    private loadingController:LoadingController,
    private toast:ToastService,private faio:FingerprintAIO,
    private alert:AlertService,private platform:Platform,
    private androidFingerprintAuth: AndroidFingerprintAuth) { }

  ngOnInit() {
  }

  async Login()
  {
    const loading = await this.loadingController.create({ message: 'loading..',spinner:'bubbles' })
    loading.present().then( () => {
      // this.authService.Login(this.form);
      // loading.dismiss();
      this.authService.Login(this.form).subscribe(
        data => {
          console.log(data);
          this.data_response = data;
           if( (this.data_response.success == true ) && (this.data_response.first_login==true) ){
             ///   this.checkIfFingerPrintIsAvailable();
          //   this.toast.presentToastWithOptions("ready to go")
               this.authService.setToken(this.data_response.token);   
            loading.dismiss(); 
           }else if((this.data_response.success == true ) && (this.data_response.first_login==false)){
            this.authService.setToken(this.data_response.token);
            loading.dismiss();  
           }
        },
        error => {
          console.log(error)
          this.error = error;
          if(this.error.error==null || this.error.error==""){
            this.toast.presentToastWithOptions("there seems to be a problem please check your internet connection")
          }else{
            this.toast.presentToastWithOptions(this.error.error.message);
          }
                   loading.dismiss();
      })
    });

  }


  async checkIfFingerPrintIsAvailable()
  {
    this.androidFingerprintAuth.isAvailable()
    .then((result)=> {
      if(result.isAvailable){
        // it is available
  
        this.androidFingerprintAuth.encrypt({ clientId: 'Cleversoft', username: 'franklin', password: 'franklin101' })
          .then(result => {
             if (result.withFingerprint) {
                 console.log('Successfully encrypted credentials.');
                 console.log('Encrypted credentials: ' + result.token);
             } else if (result.withBackup) {
               console.log('Successfully authenticated with backup password!');
             } else console.log('Didn\'t authenticate!');
          })
          .catch(error => {
             if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
               console.log('Fingerprint authentication cancelled');
             } else console.error(error)
          });
  
      } else {
        console.log("finger print not available")
        this.alert.presentAlert("error","error","finger print auth not allowed in this phone");
        // fingerprint auth isn't available
      }
    })
    .catch(error => console.error(error));
  }

 
}