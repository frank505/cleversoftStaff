import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import {ActivatedRoute} from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import {LoadingController,ModalController} from '@ionic/angular';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import {NotificationsPage} from 'src/app/User/notifications/notifications.page';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/File/ngx'; 
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-full-task-details',
  templateUrl: './full-task-details.page.html',
  styleUrls: ['./full-task-details.page.scss'],
})
export class FullTaskDetailsPage implements OnInit {
  notification:any;
  notifications_loaded:boolean = false;
  parameters:any;
  success:any;
  error:any;
  loaded:boolean = false;
  constructor(
    private navCtrl:NavController,
    private task:TasksService,
    private route:ActivatedRoute,
    private loadingController:LoadingController,
    private alert:AlertService,
    private notifications:NotificationsService,
    private modalController: ModalController,
    private transfer: FileTransfer,
    private file: File,
    private toast:ToastService
    ) {
      this.getNotification();
      this.getParams();
      this.fullTaskDetails();
     }

  ngOnInit() {
  }

getParams()
{
  this.route.params.subscribe((data)=>{
  this.parameters = data;
  console.log(this.parameters) 
  })
}

  MoveBack()
  {
    this.navCtrl.back();
  }

  async fullTaskDetails()
  {
    //console.log(this.parameters)
  this.loaded = false;
  const loading = await this.loadingController.create({ message: 'task loading..',spinner:'bubbles' })
  loading.present().then(()=>{
   this.task.loadFullTask(this.parameters.id).then((data)=>{
     //console.log(data)
  this.success = data;
  console.log(this.success)
  this.loaded =true;
  loading.dismiss();
   },
   error=>{
  this.error = error;
  console.log(this.error)
  this.loaded = true;
  loading.dismiss();
   }
   )
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

  async DownloadAvailableFile(file,path)
  {
    const loading = await this.loadingController.create({ message: 'please be patient as file is being downloaded..',spinner:'crescent'});
    loading.present().then(()=>{

    console.log(file)
    const url = path + file;
    console.log(url)
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.externalDataDirectory + file).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      loading.dismiss();
      this.toast.presentFadeToast("download complete"+entry.toURL(),3000);
    }, (error) => {
      console.log(error);
      loading.dismiss();
      this.alert.presentAlert("error","error while downloading","an error occured while downloading this file ensure proper network connections")
      // handle error
    });

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
