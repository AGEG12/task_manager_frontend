import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'https://task-manager-backend-gnmj.onrender.com/users'
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiURL + '/register',user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(this.apiURL + '/login',user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
