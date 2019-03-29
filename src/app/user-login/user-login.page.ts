import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  NavigateToUsersDashboard()
  {
    this.router.navigate(["/users/dashboard/first"]);
  }
}
