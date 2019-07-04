import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    {
      title: 'Home',
      url: '/users/dashboard/home',
      icon:'home'
    },
     {
      title: 'tasks',
      url : '/users/dashboard/tasks',
      icon:'add-circle',
    },
    {
      title:'financial report',
      url:'/users/dashboard/financial-report',
      icon:'cash'
    },
    {
      title:'profile',
      url:'/users/dashboard/profile',
      icon:'people'
    },
     {
       title:'reset password',
       url:'/users/dashboard/reset-password',
       icon:'create'
     },
     {
       title:'About',
       url:'/users/about',
       icon:'information-circle'
     },
     {
       title:'Settings',
       url:'/users/settings',
       icon:'cog'
     }


  ];
 



  constructor(private router: Router,private authService:AuthenticationService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
 
  ngOnInit() {

 

  }

  logout()
  {
  this.authService.removeToken();
  }
 
}