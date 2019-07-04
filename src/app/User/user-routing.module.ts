import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
     redirectTo: 'dashboard',
      pathMatch: 'full' 
    },
  { 
    path: 'dashboard',
     loadChildren: '../User/menu/menu.module#MenuPageModule' 
    },
  { path: 'home', loadChildren: '../User/home/home.module#HomePageModule' },
  { path: 'reset-password', loadChildren: '../User/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'full-task-details', loadChildren: '../User/full-task-details/full-task-details.module#FullTaskDetailsPageModule' },
  { path: 'task-search-modal', loadChildren: '../User/task-search-modal/task-search-modal.module#TaskSearchModalPageModule' },
  { path: 'financial-report-search-modal', loadChildren: '../User/financial-report-search-modal/financial-report-search-modal.module#FinancialReportSearchModalPageModule' },
  { path: 'notifications', loadChildren: '../User/notifications/notifications.module#NotificationsPageModule' },
  { path: 'settings', loadChildren: '../User/settings/settings.module#SettingsPageModule' },
  { path: 'about', loadChildren: '../User/about/about.module#AboutPageModule' },
  { path: 'privacy-policy', loadChildren: '../User/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule' },
  // { path: 'profile', loadChildren: '../User/profile/profile.module#ProfilePageModule' },
  // { path: 'tasks', loadChildren: '../User/tasks/tasks.module#TasksPageModule' },
  // { path: 'financial-report', loadChildren: '../User/financial-report/financial-report.module#FinancialReportPageModule' },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})




export class UserRoutingModule { }
