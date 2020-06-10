import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authSErv : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let modifiedReq = req.clone({
     headers: req.headers.append('Authorization', this.authSErv.getToken())
   });                          
   
    if(!req.url.includes("/appstore/categories") && !req.url.includes("/authenticate")
    && !req.url.includes("/appstore/select/")){
       return next.handle(modifiedReq);
    }
   return next.handle(req);
  }
}
