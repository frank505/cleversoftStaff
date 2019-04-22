import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
const SLIDER_TOKEN = "hdfkfvdkjfbnhfnvjhShsdjehej2jkejhnmfgnkfm.dfjhgfjdfhjfh";
const SLIDER_TOKEN_VALUE = "DKFJHDURRJHFNVBHJgbdnjfh";

@Injectable({
  providedIn: 'root'
})
export class SliderServiceService {

  setState = new BehaviorSubject(false);
   state:boolean=true;
  constructor(private storage:Storage) { }

  

  setTokenForSlides()
  {
    this.state = false;
   this.storage.set(SLIDER_TOKEN,SLIDER_TOKEN_VALUE).then((data)=>{
      this.setState.next(true);
      this.state = true;
   });
  }


 async CheckTokenSlides()
  {
    this.state = false;
    await this.storage.get(SLIDER_TOKEN).then(async (res)=>{
    
     if(res!==null){
       this.setState.next(true);
       this.state = false;
     }else{
       this.setState.next(false);
       this.state = true;
     }
    
      
     })
  }

}
