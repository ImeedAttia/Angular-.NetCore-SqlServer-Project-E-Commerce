import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private jwthelper:JwtHelperService){}
  
  
  
  canActivate(route: ActivatedRouteSnapshot){
   const token = localStorage.getItem("jwt") as string;

    if(token && !this.jwthelper.isTokenExpired(token) ){
      const role = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if(route.data.role && route.data.role.indexOf(role) === -1){
        
        this.router.navigate(["Home"]);
        return false;
        
      }
      return true;
    }
    this.router.navigate(["Login"]);
    return false;
  }
}
