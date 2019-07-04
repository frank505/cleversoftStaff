import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { SliderServiceService } from 'src/app/services/slider-service/slider-service.service';


@Injectable({
  providedIn: 'root'
})
export class SliderGaurdService implements CanActivate {

  constructor(public slider:SliderServiceService,
   public router:Router) { }

  canActivate(): boolean {
    let state =  this.slider.sliderCurrentState();
    return state;
   }


}

