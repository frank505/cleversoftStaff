import { Component, OnInit , ChangeDetectorRef, ViewChild,ElementRef } from '@angular/core';
import {ProfileService} from 'src/app/services/profile/profile.service';
import {LoadingController,ModalController,ActionSheetController,Platform} from '@ionic/angular';
import {AlertService} from 'src/app/services/alert/alert.service';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import {NotificationsPage} from 'src/app/User/notifications/notifications.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera , CameraOptions,PictureSourceType} from '@ionic-native/camera/ngx';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import { base64StringToBlob } from 'blob-util';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
   loaded:boolean = false;
   user_details:any;
   error:any;
   notifications_loaded:boolean = false;
   notification:any;
   lastImage: string = null;
  token:any;
  profileChangeResponse:any;
  @ViewChild("imageProfile") imageProfile:ElementRef;

   constructor(
    private profile:ProfileService,
    private loadingController:LoadingController,
    private modalController:ModalController,
    private alert:AlertService,
    private notifications:NotificationsService,
    private photoViewer: PhotoViewer,
   public actionSheetController: ActionSheetController,
   private camera: Camera,
   private platform:Platform,
   private ref:ChangeDetectorRef,
   private authService:AuthenticationService,
  ) { 
    this.token = this.authService.getToken();
    this.getNotification();
   // this.loadProfile();
  }

  ngOnInit() {
  }

 ionViewWillEnter()
 {
  this.loadProfile();
 }

 

  async loadProfile()
  {
    this.loaded = false;
    const loading = await this.loadingController.create({ message: 'profile details loading..',spinner:'crescent'});
    loading.present().then(()=>{
      this.profile.loadProfile().then((data)=>{
        console.log(data)
        loading.dismiss();
        this.loaded = true;
        this.user_details = data;
      },
      error=>{
        console.log(error)
        loading.dismiss();
        this.loaded = true;
        this.error = error;
        this.alert.presentAlert("error","error",this.error.error.message);
      }
      )
    })

  }

 async ChangeProfileActionSheet()
  {
   
      const actionSheet = await this.actionSheetController.create({
        header: 'Profile Photo',
        buttons: [{
          text: 'Gallery',
          icon: 'image',
          handler: () => {
     //       console.log('Delete clicked');
            this.takeAndSaveImage(this.camera.PictureSourceType.PHOTOLIBRARY);
           // this.uploadImage();
          }
        }, {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
           this.takeAndSaveImage(this.camera.PictureSourceType.CAMERA);
           //this.uploadImage();
          }
        },
        {
          text: 'Remove Photo',
          icon: 'trash',
          handler: () => {
           this.removePhoto();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
    
      await actionSheet.present();
    }


     convertBase64ToBlob(Base64Image: any) {
      // SPLIT INTO TWO PARTS
      const parts = Base64Image.split(';base64,');
      // HOLD THE CONTENT TYPE
      const imageType = parts[0].split(':')[1];
      // DECODE BASE64 STRING
      const decodedData = atob(parts[1]);
      // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
      const uInt8Array = new Uint8Array(decodedData.length);
      // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
      for (let i = 0; i < decodedData.length; ++i) {
          uInt8Array[i] = decodedData.charCodeAt(i);
      }
      // RETURN BLOB IMAGE AFTER CONVERSION
      return new Blob([uInt8Array], { type: imageType });
  }  




  async removePhoto()
  {
    const loading = await this.loadingController.create({ message: 'removing photo..',spinner:'crescent'});
    loading.present().then(()=>{  
    this.profile.removePhoto().then((data)=>{
      console.log(data)
      this.profileChangeResponse = data;
          this.imageProfile.nativeElement.src= this.profileChangeResponse.new_image;
          loading.dismiss();
    },error=>{
      console.log(error)
      loading.dismiss();
      this.alert.presentAlert("error","error","oops! there seems to be a problem please try again later"+JSON.stringify(error))
    })
    });
  }


  takeAndSaveImage(sourceType: PictureSourceType)
  {
      var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        allowEdit:false,
        destinationType:this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG,
        targetHeight: 500,
        targetWidth: 500,

    };

    this.camera.getPicture(options).then(async (imageData) => {
              // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let finalData = 'data:image/jpeg;base64,' + imageData;
        const loading = await this.loadingController.create({ message: 'profile photo changing..',spinner:'crescent'});
       loading.present().then(()=>{  
        this.profile.uploadImageFromFileManager(finalData).then((data)=>{
          console.log(data)
          this.profileChangeResponse = data;
          this.imageProfile.nativeElement.src= this.profileChangeResponse.new_image;
           loading.dismiss();
        
           this.alert.presentAlert("success","success","profile picture changed successfully");
        },error=>{
          loading.dismiss();
          console.log(error)
          this.alert.presentAlert("success","success","profile picture change failed");
        });
      });
               });

  }

viewImage()
{
  let url = this.user_details.image_directory+this.user_details.staffs.profilephoto;
  console.log(url)
  this.photoViewer.show(url);
  console.log("yet to add feature to view full screeen image")
}

  
  getNotification()
  {
    this.notifications_loaded = false;
    this.notifications.getUserNotificationsAvailable().then((data)=>{
      this.notifications_loaded = true;
      this.notification = data;
    })
  }

  
  async SendToNotificationsModal()
  {
    const modal = await this.modalController.create({
      component: NotificationsPage,
      componentProps: {
        "Header": "Search Task",
      }
  });

modal.onDidDismiss().then((dataReturned) => {
  if (dataReturned !== null) {
    console.log('Modal Sent Data :', dataReturned);
  }
});

return await modal.present();
  }



}
