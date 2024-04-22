import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsersService } from './services/users.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  canActivate():boolean {
    if (this.usersService.loggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
  
}
