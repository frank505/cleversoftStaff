import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './services/auth-gaurd/auth-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'user-login', loadChildren: './user-login/user-login.module#UserLoginPageModule' },
  {
    path:'users',
    loadChildren:'./User/user-routing.module#UserRoutingModule',
    canActivate:[AuthGaurdService]
  },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
