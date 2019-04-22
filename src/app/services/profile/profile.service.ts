import { Injectable } from '@angular/core';
import {HttpService} from 'src/app/services/http/http.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 token:any;
  constructor(
    private http:HttpService,
    private authService:AuthenticationService
  ) { 
  this.token = this.authService.getToken();
  console.log(this.token)
  
  }

  loadProfile():any
  {
    return this.http.getData("/staffs/profile/"+this.token,this.token).toPromise();
  }
}
