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
import {AuthGaurdService as Auth} from 'src/app/services/auth-gaurd/auth-gaurd.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {SliderServiceService} from 'src/app/services/slider-service/slider-service.service';
import {TaskSearchModalPageModule} from 'src/app/User/task-search-modal/task-search-modal.module';
import {FinancialReportSearchModalPageModule} from 'src/app/User/financial-report-search-modal/financial-report-search-modal.module';
import {NotificationsPageModule} from 'src/app/User/notifications/notifications.module';
import { Camera } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
   IonicModule.forRoot(), 
   AppRoutingModule,
   IonicStorageModule.forRoot(),
  FormsModule,
  HttpClientModule,
  TaskSearchModalPageModule,
  FinancialReportSearchModalPageModule,
  NotificationsPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FormBuilder,
    AlertService,
    HttpService,
    Auth,
    SliderServiceService,
    AuthenticationService,
    Camera,
    File,
    Network,
    Diagnostic,
    FilePath,
    FileTransfer,
    NotificationsService,
   BackgroundMode,
   PhotoViewer,
   InAppBrowser,
    NativePageTransitions,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
