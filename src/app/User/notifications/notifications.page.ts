import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import { ModalController,LoadingController } from '@ionic/angular';
import {AlertService} from 'src/app/services/alert/alert.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  pagination:Number = 5;
  success:any;
  error:any;
  loaded:boolean = false;
  page:any;
  constructor(private notifications:NotificationsService,
    private loadingController:LoadingController,
    private modalController:ModalController,
    private alert:AlertService,
    private router:Router) 
  { 
    this.loadNotificationsData();
  }

  ngOnInit() {
  }


  async loadNotificationsData()
  {
    this.loaded = false;
    const loading = await this.loadingController.create({ message: 'task loading..',spinner:'bubbles' })
  loading.present().then(()=>{
  this.notifications.getTotalNotificationsData(this.pagination).then((data)=>{
    console.log(data);
    this.success = data;
    loading.dismiss();
    this.loaded = true;
    this.page = this.success.data.data.current_page;
    this.page++;
  },
  error=>{
 this.error = error;
 loading.dismiss();
 this.loaded = true;
   this.alert.presentAlert("error","error",this.error.error.message)
  })
  })
}


doRefresh($event)
{
  //this.loaded = false;
  this.notifications.getTotalNotificationsData(this.pagination).then((data)=>{
    console.log(data);
    this.success = data;
    $event.target.complete();
    this.loaded = true;
    this.page = this.success.data.data.current_page;
    this.page++;
  },
  error=>{
 this.error = error;
 $event.target.complete();
 this.loaded = true;
   this.alert.presentAlert("error","error",this.error.error.message)
  })
}


LoadMoreData($event)
{
  this.notifications.getPaginatedData(this.pagination,this.page).then((data)=>{
    console.log(data);
    this.success = data;
    this.loaded = true;
    $event.target.complete();
  },
  error=>{
    this.error = error;
    this.alert.presentAlert("error","error",this.error.error.message)
    $event.target.complete();
  })
}

async closeModal() {
  this.dismissAllNotification();
  const onClosedData: string = "Wrapped Up!";
  await this.modalController.dismiss(onClosedData);

}


dismissAllNotification()
{
  this.notifications.removeAllNotifications().then((data)=>{
    console.log(data)
  },error=>{
    console.log(error)
  })
}

viewTask(id)
{
  this.closeModal();
  this.router.navigate(["/users/dashboard/full-task-details",{id:id}]);
}



}
