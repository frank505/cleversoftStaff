import { Component, OnInit } from '@angular/core';
import {TasksService} from 'src/app/services/tasks/tasks.service';
import {LoadingController,ModalController} from '@ionic/angular';
import {AlertService} from 'src/app/services/alert/alert.service';
import {Router} from '@angular/router';
import {TaskSearchModalPage} from 'src/app/User/task-search-modal/task-search-modal.page';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import {NotificationsPage} from 'src/app/User/notifications/notifications.page';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  Object = Object;
taskData:any;
token:any;
loaded:boolean = false;
error:any;
public userData = {
name:null,
id:null
}
notifications_loaded:boolean = false;
notification:any;
  constructor(private task:TasksService,
    private loadingController:LoadingController,
    private alert:AlertService,
    private router:Router,
    private modalController:ModalController,
    private notifications:NotificationsService) { 
     this.getNotification();
    this.loadTasks();
  }

  ngOnInit() {
    
  }

  async loadTasks()
  {
      this.loaded = false;
      const loading = await this.loadingController.create({ message: 'task loading..',spinner:'crescent' })
    loading.present().then(()=>{
      this.task.loadTask().then((data)=>{
        this.taskData = data;
        console.log(this.taskData)
       this.loaded = true;
    loading.dismiss();
      },
      error=>{
        console.log(error)
        this.error = error;
        this.alert.presentAlert("error","error",this.error.error.message);
        loading.dismiss();
      }      
      )   
    });
    }

    
    goToFullTaskDetails(id)
    {
     this.router.navigate(["/users/dashboard/full-task-details",{id:id}]);
    }

  async loadMessageModal()
    {
      const modal = await this.modalController.create({
        component: TaskSearchModalPage,
        componentProps: {
          "Header": "Search Task",
          "id":this.taskData.id,
          "name":this.taskData.name
        }
    });
  
  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      console.log('Modal Sent Data :', dataReturned);
    }
  });
  
  return await modal.present();
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

