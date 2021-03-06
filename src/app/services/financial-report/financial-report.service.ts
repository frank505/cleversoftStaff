import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpService } from "../http/http.service";
import {AuthenticationService} from '../authentication/authentication.service';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {

token:any;

  constructor(
    private plt:Platform,
    private http:HttpService,
    private authService:AuthenticationService,
    private storage:Storage
    ) 
    {
      this.storage.get(this.authService.returnTokenPlaceholder()).then(async token=>{
        this.token = token;
         // console.log(token)
       });
     }

  getMonthlyReport():any
  {
     return this.http.getData("/staffs/monthly-balance/"+this.token,this.token).toPromise();
  }
  getYearAvailableForUser():any
  {
    return this.http.getData("/staffs/available-years/"+this.token,this.token).toPromise();
  }
  getMonthlyReview(month,year):any
  {
    return this.http.getData("/staffs/monthly-search-response/"+this.token+"/"+month+"/"+year,this.token).toPromise();
  }
}
