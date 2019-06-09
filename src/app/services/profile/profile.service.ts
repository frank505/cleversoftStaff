import { Injectable } from '@angular/core';
import {HttpService} from 'src/app/services/http/http.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {Storage} from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {LoadingController} from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import {AlertService} from 'src/app/services/alert/alert.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 token:any;
 url:any;
 success:any;
 error:any;
 nativePath:any;
  constructor(
    private http:HttpService,
    private authService:AuthenticationService,
     private storage:Storage,
     private filePath:FilePath,
   private file:File,
   private alert:AlertService,
   private transfer:FileTransfer,
   private loadingController:LoadingController,
   private toast:ToastService
  ) { 
    this.storage.get(this.authService.returnTokenPlaceholder()).then(async token=>{
      this.token = token;
       // console.log(token)
        this.url = this.http.url;
     });
  }

  loadProfile():any
  {
    return this.http.getData("/staffs/profile/"+this.token,this.token).toPromise();
  }

  
   uploadImageFromFileManager(imageData):any
  {
  const form_data = new FormData();
  form_data.append("profilephoto",imageData);
  return this.http.postData(form_data,"/staffs/profilephoto/add/"+this.token,this.token).toPromise();
  }




}
