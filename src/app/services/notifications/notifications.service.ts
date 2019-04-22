import { Injectable } from '@angular/core';
import {HttpService} from 'src/app/services/http/http.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
token:any;


  constructor(private http:HttpService,private authService:AuthenticationService) 
  {
  this.token = this.authService.getToken();
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
