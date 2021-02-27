// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    const token = localStorage.getItem('token');
    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      url: `https://localhost:5001/api${request.url}`
    }));
    
    
  }
}
