import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService} from "../authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {


  constructor(private AuthService:AuthenticationService) { }

  
  canActivate(): boolean {
   return this.AuthService.isAuthenticated();
  }

   

}
