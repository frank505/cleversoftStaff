import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
 
const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path:'tasks',
        loadChildren: '../../User/tasks/tasks.module#TasksPageModule',
      },
      {
        path:'financial-report',
        loadChildren:'../../User/financial-report/financial-report.module#FinancialReportPageModule'
      },
      {
      path:'home',
      loadChildren:'../../User/home/home.module#HomePageModule',
      },
      {
        path:'profile',
        loadChildren:'../../User/profile/profile.module#ProfilePageModule',
      },
      {
        path:'reset-password',
        loadChildren:'../../User/reset-password/reset-password.module#ResetPasswordPageModule'
      },
      {
        path:'full-task-details',
        loadChildren:'../../User/full-task-details/full-task-details.module#FullTaskDetailsPageModule'
      }
    ]
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }