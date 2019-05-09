import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import { NotificationsPage } from 'src/app/User/notifications/notifications.page';
import {ModalController,LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  notification:any;
  notifications_loaded:boolean = false;
  constructor(private notifications:NotificationsService,
    private modalController:ModalController,
    public loadingController: LoadingController
    ) { 
    
  }

  
  ngOnInit() {
    this.getNotification();
  }


 async getNotification()
  {
    this.notifications_loaded = false;
    const loading = await this.loadingController.create({spinner:'bubbles' })
    loading.present().then(()=>{
    this.notifications.getUserNotificationsAvailable().then((data)=>{
      this.notifications_loaded = true;
      this.notification = data;
      loading.dismiss();
    })
    });
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
