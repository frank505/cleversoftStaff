import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router} from '@angular/router'; 
import {AuthenticationService} from '../services/authentication/authentication.service';
import { LoadingController,Platform, AlertController } from '@ionic/angular';
import { ToastService } from "../services/toast/toast.service";
import {AlertService} from '../services/alert/alert.service';
import { Camera , CameraOptions,PictureSourceType} from '@ionic-native/camera/ngx';
//import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {SliderServiceService} from 'src/app/services/slider-service/slider-service.service';

 declare var faceapi;
 
const MODEL_URL = "http://www.techbuildz.com/models";
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})


export class UserLoginPage implements OnInit {
  @ViewChild('loginImages') loginImages : ElementRef;
  @ViewChild("firstImg") firstImg:ElementRef;
  @ViewChild("secondImg") secondImg:ElementRef;
 
  public form = {
    email:null,
    password:null
  }
  data_response:any;
  error:any;
  loginImage:any;
  public stateChecker:boolean = false;
  constructor(
    private router:Router,
    private authService:AuthenticationService,
    private loadingController:LoadingController,
    private toast:ToastService,
    private alert:AlertService,
    private platform:Platform,
    private camera: Camera,
   public alertController: AlertController,
  //public backgroundMode:BackgroundMode,
  private slider:SliderServiceService
    ) 
    {           
  //    console.log(faceapi.nets);
     
           }


  ngOnInit() {
    //this.firstRedirect();
    this.redirect(); 

  }
  
firstRedirect()
{

  this.slider.CheckTokenSlides();
      this.slider.setState.subscribe(states=>{
       if(states){
        this.stateChecker = true;
         this.router.navigate(["/user-login"]);
        }else{
          this.stateChecker = false;
          this.router.navigate(["home"]);
      }
      })
  
}



  redirect()
  {
   this.authService.authenticationState.subscribe(state=>{
     if(!state){
       this.stateChecker = true;
      this.router.navigate(["user-login"]);   
     }else{
      this.stateChecker = false;
      this.router.navigate(["/users/dashboard/home"]);
     }
     
   })
  } 
  
  

  

  async presentAlertConfirmForFirstLogin(token) {
    const alert = await this.alertController.create({
      header: 'facial Authentication',
      message: 'for better security your face is required to complete your very first login.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           this.alert.presentAlert("error","error","login was not successfull face authentication is needed for subsequent logins.")
          }
        }, {
          text: 'Okay',
          handler: () => {
           this.onFirstLogin(token);
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async Login()
  {
    const loading = await this.loadingController.create({ message: 'loading..',spinner:'crescent' })
    loading.present().then( () => {
      // this.authService.Login(this.form);
      // loading.dismiss();
      this.authService.Login(this.form).subscribe(
        data => {
          console.log(data);
          this.data_response = data;
           if( (this.data_response.success == true ) && (this.data_response.first_login==true) ){
            loading.dismiss();
            this.presentAlertConfirmForFirstLogin(this.data_response.token)
  
           }else if((this.data_response.success == true ) && (this.data_response.first_login==false)){
            loading.dismiss();  
            this.onSuccessiveLogin(this.data_response.token,this.data_response.authimage);
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

pictureOptions()
{
  var options: CameraOptions = {
    quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit:false,
      destinationType:this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
};
return options;
}





 onFirstLogin(token)
 {
  //this.backgroundMode.setEnabled(true);
  if(this.platform.is('cordova')){
    let options : CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit:false,
      destinationType:this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
  };  
  //open camera to take picture
   this.camera.getPicture(options).then(async (imageData)=>{
     //format base64 image to jpeg
    var finalData = 'data:image/jpg;base64,' + imageData;
   // this.alert.presentAlert("success","success",JSON.stringify(finalData))
   var imageLogin = this.loginImages.nativeElement.querySelector("#login_image");
   imageLogin.src = finalData;
   //this.alert.presentAlert("image","the image content",JSON.stringify(imageLogin.src));
  console.log(faceapi.nets);

  const loading = await this.loadingController.create({ message: 'checking if this is an image..',spinner:'crescent' })
 loading.present().then(async ()=>{

  await faceapi.nets.ssdMobilenetv1.loadFromUri('http://www.techbuildz.com/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri("http://www.techbuildz.com/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("http://www.techbuildz.com/models");
  // await faceapi.nets.mtcnn.loadFromUri("http://www.techbuildz.com/models");
  // await faceapi.nets.tinyFaceDetector.loadFromUri("http://www.techbuildz.com/models");
  // //check if its an image
     const checkImage = await faceapi
   .detectAllFaces(imageLogin)
   .withFaceLandmarks()
   .withFaceDescriptors();
   console.log(checkImage)
   
 if (!checkImage.length) {
 return this.alert.presentAlert("error","error","your face is not being picked in this image ensure its your face and not some object");
 loading.dismiss();
 }
 imageLogin.src="";
 loading.dismiss();
 },error=>{
   console.log(error)
   this.alert.presentAlert("error","error","there seems to be a problem please check your internet connection");
   loading.dismiss();
 })
  
  loading.present().then( () => {
 this.authService.uploadAuthImage(finalData,token).then((res)=>{
   console.log("success uploading image: "+res);
   loading.dismiss();
 this.toast.presentFadeToast("face recognition image was uploaded successfully",1000);
 this.authService.setToken(token);
 },error=>{
   console.log(error)
   loading.dismiss();
  this.alert.presentAlert("error","error","face recogintion image failed to be uploaded please try again later");
 })
 })
   })
  }
 }


 
 async onSuccessiveLogin(token,authImageUrl)
 {
     try {
    
      

      let options = this.pictureOptions();   
    this.camera.getPicture(options).then(async (imageData)=>{
   
     const loading = await this.loadingController.create({ message: 'activating facial recognition this might take a while..',spinner:'crescent' })
     loading.present().then(async ()=>{
       
       await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
   // accordingly for the other models:
  //  await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
  //  await faceapi.loadMtcnnModel(MODEL_URL)
   await faceapi.loadFaceLandmarkModel(MODEL_URL)
   await faceapi.loadFaceLandmarkTinyModel(MODEL_URL)
   await faceapi.loadFaceRecognitionModel(MODEL_URL)
//   await faceapi.loadFaceExpressionModel(MODEL_URL)
 
   var finalData = 'data:image/jpeg;base64,' + imageData;
   var imageFaceAuth = this.loginImages.nativeElement.querySelector("#image_from_server");
  imageFaceAuth.src = finalData;

     var imageLogin = this.loginImages.nativeElement.querySelector("#login_image");
 imageLogin.crossOrigin = "anonymous";
 imageLogin.src = authImageUrl;
 console.log(imageLogin)


     console.log(imageFaceAuth)

      const checkImage = await faceapi
      .detectAllFaces(imageFaceAuth)
      .withFaceLandmarks()
      .withFaceDescriptors();
     
      console.log(checkImage)

      if (!checkImage.length) {
        loading.dismiss();
        return this.alert.presentAlert("error","error",
        "no face detected");
        }
    
        const faceMatcher = new faceapi.FaceMatcher(checkImage)
    
        console.log(faceMatcher)

      const singleResult = await faceapi
      .detectSingleFace(imageLogin)
      .withFaceLandmarks()
      .withFaceDescriptor();
    
      console.log(singleResult)
    
    if (singleResult) {
      const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
      console.log(bestMatch)
      if(bestMatch.hasOwnProperty("_label")  && bestMatch._label!="unknown"){
        if(bestMatch.distance >= 0.4){
          loading.dismiss();
          this.alert.presentAlert("error","error","this face doesnt match");  
        }else{
          loading.dismiss();
          this.loginCompleteSendAdminNotificationAndSetToken(loading,token);
        }
       
      }else{
        loading.dismiss();
        this.alert.presentAlert("error","error","this face doesnt match");
      }
      
    }else{
      loading.dismiss();
      this.alert.presentAlert("error","error","no face is detected please try again");
    }
    });


      });     



     } catch (error) {
        console.log(error)
        this.alert.presentAlert("error","error","there seems to be a problem please try again later");
     }
    
      

 
}



loginCompleteSendAdminNotificationAndSetToken(loading,token)
{
  this.authService.loginCompleteSendAdminNotification(token).then((data)=>{
 console.log(data)
 this.authService.setToken(token);
 console.log("token is set successfully")
  },error=>{
    console.log(error)
 loading.dismiss();
this.alert.presentAlert("error","error","there seems to be a problem please try again ")
  })
}

}