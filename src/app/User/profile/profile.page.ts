import { Component, OnInit } from '@angular/core';
import {ProfileService} from 'src/app/services/profile/profile.service';
import {LoadingController,ModalController,ActionSheetController} from '@ionic/angular';
import {AlertService} from 'src/app/services/alert/alert.service';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import {NotificationsPage} from 'src/app/User/notifications/notifications.page';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera , CameraOptions} from '@ionic-native/camera/ngx';


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
  constructor(
    private profile:ProfileService,
    private loadingController:LoadingController,
    private modalController:ModalController,
    private alert:AlertService,
    private notifications:NotificationsService,
    private photoViewer: PhotoViewer,
   public actionSheetController: ActionSheetController,
   private camera: Camera
  ) { 
    this.getNotification();
    this.loadProfile();
  }

  ngOnInit() {
  }

  async loadProfile()
  {
    this.loaded = false;
    const loading = await this.loadingController.create({ message: 'profile details loading..',spinner:'bubbles'});
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
          icon: 'picture',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
           this.takeAndSaveImage();
          }
        },
        {
          text: 'Remove Photo',
          icon: 'trash',
          handler: () => {
            console.log('Share clicked');
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


    takeAndSaveImage()
    {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       console.log(base64Image)
      }, (err) => {
       // Handle error
      });
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


  viewImage()
  {
    this.photoViewer.show("user_details.image_directory/user_details.staffs.profilephoto");
  }


  



}
