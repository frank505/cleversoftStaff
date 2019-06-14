import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import { NotificationsPage } from 'src/app/User/notifications/notifications.page';
import {ModalController, LoadingController} from '@ionic/angular';
import  { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  notification: any;
  notifications_loaded: boolean = false;
  constructor(private notifications: NotificationsService,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private alert:AlertService
    ) {}

  
  ngOnInit() {
    this.getNotification();
  }


 async getNotification()
  {
    try{
      
      this.notifications_loaded = false;
    const loading = await this.loadingController.create({spinner: 'bubbles' })
    loading.present().then(() => {
    this.notifications.getUserNotificationsAvailable().then((data) =>{
      console.log(data)
      this.notifications_loaded = true;
      this.notification = data;
      loading.dismiss();
    },error=>{
      console.log(error)
      loading.dismiss();
      this.alert.presentAlert("error","error","please turn on your internet connection")
    })
    });

    }catch(ex){
      console.log(ex);
    } 

  }


  async SendToNotificationsModal() {
    const modal = await this.modalController.create({
      component: NotificationsPage,
      componentProps: {
        'Header': 'Search Task',
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
