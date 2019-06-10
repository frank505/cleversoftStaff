import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from '@ionic/angular';
import { HttpService } from "../http/http.service";
import {ToastService} from '../toast/toast.service';
import {AlertService} from '../alert/alert.service';
const STAFF_TOKEN = "XC9sb24e3wefe2ORdfd";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   token:any;
  authenticationState = new BehaviorSubject(false);
  data_response:any;
    constructor(private storage:Storage,private plt:Platform,
    private http:HttpService,private loadingController:LoadingController,
    private toast:ToastService,
    private alert:AlertService) {
  this.storage.get(STAFF_TOKEN).then(async token=>{
   this.token = token;
    // console.log(token)
  });

  

     }

    setToken(key)
{

  return this.storage.set(STAFF_TOKEN,'Bearer '+key).then(res=>{
    this.authenticationState.next(true);
  })
}





Login(LoginDetails)
{
return  this.http.postData(LoginDetails,"/staffs/login");
}

ForgotPassword(ForgotPasswordDetails)
{
  return this.http.postData(ForgotPasswordDetails,"/staffs/reset-password-link");
}

returnTokenPlaceholder()
{
  return STAFF_TOKEN;
}

getToken()
 {
 return this.token;
 
 }

removeToken()
{
  return this.storage.remove(STAFF_TOKEN).then(()=>{
    this.authenticationState.next(false);
  
    })
}


async checkToken()
{
  await this.storage.get(STAFF_TOKEN).then(async (res)=>{
   if(res){

  if(res!==null){
    this.authenticationState.next(true);
  }else{
    this.authenticationState.next(false);
  }
   }
   
  })
}


isAuthenticated()
{
  return this.authenticationState.value;
}


uploadAuthImage(base64Data,token):any
{
  const form_data = new FormData();
  form_data.append("authimage",base64Data);
  return this.http.postData(form_data,"/staffs/upload-auth-image/"+token,token).toPromise();
}


  }


