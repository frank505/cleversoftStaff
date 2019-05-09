import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  token:any;

  constructor(private http:HttpService,
    private authService:AuthenticationService,
    private storage:Storage) 
  {
    this.storage.get(this.authService.returnTokenPlaceholder()).then(async token=>{
      this.token = token;
       // console.log(token)
     });
   }

  changePassword(data):any
  {
  return this.http.postData(data,"/staffs/change-password",this.token).toPromise();
  }


}
