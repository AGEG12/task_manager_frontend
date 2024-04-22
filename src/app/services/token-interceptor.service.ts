import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UsersService } from './users.service';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private usersService: UsersService) { }
  intercept(req:any, next:any) {
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.usersService.getToken()}`
      }
    })
    return next.handle(tokenReq);
  }

/*   intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    const token = this.usersService.getToken();
    if (!token) return next.handle(req);

    const tokenReq = req.clone({
      headers: req.headers.set('Authorization',`Bearer ${token}`)
    })
    return next.handle(tokenReq);
  } */
}