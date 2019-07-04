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
  constructor(private storage:Storage) { }

  


  setTokenForSlides()
  {
   this.storage.set(SLIDER_TOKEN,SLIDER_TOKEN_VALUE).then((data)=>{
      this.setState.next(true);
   });
  }


 async CheckTokenSlides()
  {
    await this.storage.get(SLIDER_TOKEN).then(async (res)=>{
    
     if(res!=null){
      this.setState.next(true);

     }else{
       this.setState.next(false);
     }
      
     })
  }


  sliderCurrentState()
{
  return this.setState.value;
}

}
