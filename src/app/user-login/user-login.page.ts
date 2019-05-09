import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import {AuthenticationService} from '../services/authentication/authentication.service';
import { LoadingController,Platform } from '@ionic/angular';
import { ToastService } from "../services/toast/toast.service";
import {AlertService} from '../services/alert/alert.service';
const MODEL_URL = "http://localhost:8000/models";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
//const MODEL_URL = "http://10.0.2.2:8000/models";
export class UserLoginPage implements OnInit {
  public form = {
    email:null,
    password:null
  }
  data_response:any;
  error:any;
  faceapi:any;
  constructor(private router:Router,
    private authService:AuthenticationService,
    private loadingController:LoadingController,
    private toast:ToastService,
    private alert:AlertService,private platform:Platform,
    ) 
    {
      this.loadFaceApiModels();
      
     }

  ngOnInit() {
  }

  async loadFaceApiModels()
  {
    await this.faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    // accordingly for the other models:
    await this.faceapi.loadFaceLandmarkModel(MODEL_URL)
    await this.faceapi.loadFaceRecognitionModel(MODEL_URL)
    console.log(this.faceapi.nets)
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

  faceDetection()
  {
   
  }

 
}