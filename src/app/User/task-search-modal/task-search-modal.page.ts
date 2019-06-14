import { Component, OnInit } from '@angular/core';
import {ModalController,NavParams,LoadingController} from '@ionic/angular';
import {AlertService} from 'src/app/services/alert/alert.service';
import {TasksService} from 'src/app/services/tasks/tasks.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-search-modal',
  templateUrl: './task-search-modal.page.html',
  styleUrls: ['./task-search-modal.page.scss'],
})
export class TaskSearchModalPage implements OnInit {

  searchContent:any;
 public userData = {
  name:null,
  id:null,
  }
  taskData:any;
loaded:boolean = false;
error:any;

  constructor(private modalController:ModalController,
    private navParams:NavParams,
    private alert:AlertService,
    private task:TasksService,
    private loadingController:LoadingController,
    private router:Router) 
    { 
  this.userData.name = this.navParams.data.name;
  this.userData.id = this.navParams.data.id;
    }

  ngOnInit() {
  }
   
async closeModal()
  {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

async performSearch()
{
  if(this.searchContent==null)
  {
 this.alert.presentAlert("required","required","please select a date");
  }else{
    this.loaded = false;
    const loading = await this.loadingController.create({ message: 'task loading..',spinner:'crescent' })
  loading.present().then(()=>{
    this.task.loadSearchTask(this.searchContent).then((data)=>{
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
}


goToFullTaskDetails(id) 
{
 this.closeModal();
 this.router.navigate(["/users/dashboard/full-task-details",{id:id}]);
}



}
