import { Injectable } from '@angular/core';
import {HttpService} from 'src/app/services/http/http.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
token:any;


  constructor(
    private http:HttpService,
    private authService:AuthenticationService,
    private storage:Storage) 
  {
  //this.token = this.authService.getToken();
  this.storage.get(this.authService.returnTokenPlaceholder()).then(async token=>{
    this.token = token;
     // console.log(token)
   });
  }

  getUserNotificationsAvailable():any
  {
   return this.http.getData("/staffs/notifications/"+this.token,this.token).toPromise();
  }

  getTotalNotificationsData(pagination):any
  {
    return this.http.getData("/staffs/notifications-data/"+this.token+"/"+pagination,this.token).toPromise();
  }

  getPaginatedData(pagination,page):any
  {
    return this.http.getData("/staffs/notifications-data/"+this.token+"/"+pagination+"?page="+page,this.token);
  }
  removeAllNotifications():any
  {
    let data = {
   token:this.token
    }
   return this.http.postData(data,"/staffs/notifications-viewed",this.token).toPromise();
  }

  removeTaskNotifications():any
  {
    let data = {
      token:this.token
       }
 return this.http.postData(data,"/staffs/task-notifications-viewed").toPromise();
  }

}
