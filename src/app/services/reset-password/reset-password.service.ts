import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  token:any;

  constructor(private http:HttpService,
    private authService:AuthenticationService) 
  {
    this.token = this.authService.getToken();
   }

  changePassword(data):any
  {
  return this.http.postData(data,"/staffs/change-password",this.token).toPromise();
  }


}
