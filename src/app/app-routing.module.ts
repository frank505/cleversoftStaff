import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService} from './services/auth-gaurd/auth-gaurd.service';
import {SliderGaurdService } from './services/slider-gaurd/slider-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: '/users/dashboard/home', pathMatch: 'full' },
  {
    path:'users',
    loadChildren:'./User/user-routing.module#UserRoutingModule',
    canActivate:[AuthGaurdService]
  },
  { path: 'user-login', 
  loadChildren: './user-login/user-login.module#UserLoginPageModule',
 // canActivate:[SliderGaurdService]
 },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
