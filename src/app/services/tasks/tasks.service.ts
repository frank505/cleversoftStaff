import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpService } from "../http/http.service";
import {AuthenticationService} from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
taskData:any;
token:any;
  constructor(private plt:Platform,
    private http:HttpService,
    private authService:AuthenticationService)
   { 
    this.token = this.authService.getToken();    
   }

 loadTask():any
 {
    
  return this.http.getData("/staffs/load-tasks/"+this.token,this.token).toPromise();  
 
 }

 loadFullTask(id):any
 {
   return this.http.getData("/staffs/load-full-task/"+this.token+"/"+id,this.token).toPromise();
 }

 loadSearchTask(date):any
 {
   return this.http.getData("/staffs/load-search-data/"+this.token+"/"+date,this.token).toPromise();
 }
 


}
