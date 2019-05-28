import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController:  ToastController) { }
  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      animated:true
    });
    toast.present();
  }

  async presentFadeToast(message,time)
  {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: false,
      position: 'top',
      animated:true,
      duration:time
    });
    toast.present();
  }
}
