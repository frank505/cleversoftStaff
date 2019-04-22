import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,FormBuilder,FormGroup } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AlertService} from '../app/services/alert/alert.service';
import {HttpService} from '../app/services/http/http.service';
import { IonicStorageModule } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import {AuthGaurdService as Auth} from 'src/app/services/auth-gaurd/auth-gaurd.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {SliderServiceService} from 'src/app/services/slider-service/slider-service.service';
import {TaskSearchModalPageModule} from 'src/app/User/task-search-modal/task-search-modal.module';
import {FinancialReportSearchModalPageModule} from 'src/app/User/financial-report-search-modal/financial-report-search-modal.module';
import { Badge } from '@ionic-native/badge/ngx';
import {NotificationsPageModule} from 'src/app/User/notifications/notifications.module';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  FormsModule,HttpClientModule,TaskSearchModalPageModule,
  FinancialReportSearchModalPageModule,
  NotificationsPageModule,

  IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    FormBuilder,
    AlertService,
    HttpService,
    FingerprintAIO,
    AndroidFingerprintAuth,
    Auth,
    SliderServiceService,
    AuthenticationService,
    Badge,
    PhotoViewer,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
