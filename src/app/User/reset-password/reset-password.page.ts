import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import {LoadingController,ModalController} from '@ionic/angular';
import {AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import { NotificationsPage } from "src/app/User/notifications/notifications.page";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  
  public form = {
    password:null,
    confirm:null,
    token:null
  }
  success:any;
  error:any;
  loaded:boolean = false;
  notifications_loaded:boolean = false;
  notification:any;
  constructor(
    private alert:AlertService,
    private authService:AuthenticationService,
    private resetPassword:ResetPasswordService,
    private loadingController:LoadingController,
    private toast:ToastService,
    private notifications:NotificationsService,
    public modalController: ModalController
  ) { 
   this.form.token = this.resetPassword.token;
   console.log(this.form.token)
   this.getNotification();
  }

  ngOnInit() {
  }

  async ChangePassword()
  {
    this.form.token = this.resetPassword.token;
    console.log(this.form.token)
    if(this.form.password != this.form.confirm)
    {
      this.alert.presentAlert("required","required","password and confirm do not match")
    }else{
    this.loaded = false;
    const loading = await this.loadingController.create({ message: 'please wait..',spinner:'crescent'});
    loading.present().then(()=>{
      this.resetPassword.changePassword(this.form).then((data)=>{
        console.log(data)
        loading.dismiss();
        this.loaded = true;
        this.success = data;
     this.toast.presentToastWithOptions("password is successfully changed")
      },
      error=>{
        console.log(error)
        loading.dismiss();
        this.loaded = true;
        this.error = error;
        this.alert.presentAlert("error","error",JSON.stringify(this.error.error.message));
      }
      )
    })
    }
    
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
