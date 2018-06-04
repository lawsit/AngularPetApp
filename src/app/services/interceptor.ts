import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,  HttpHeaders,HttpEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log('intercept');

    let token = this.token.getToken();
    console.log('sending token ['+token+']');
    
    console.log(req.url);

    let headers = new HttpHeaders();
    headers = req.headers
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
      .set('Access-Control-Allow-Origin', 'http://localhost:8080')
      .set('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding")
      .set('Authorization', "Bearer " + token);
    
    const authHeader = "Bearer " + token;
     let cloneReq = req.clone({headers: headers});
   
    //let cloneReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
   
    if (req.url.endsWith("auth")) {
      console.log('This is auth request');
      return next.handle(req)
    }
    else
       return next.handle(cloneReq)
    .catch((error, caught) => {
      //intercept the respons error and displace it to the console
      console.log("Error Occurred");
      console.log(error);
      //return the error to the method that called it
      return Observable.throw(error);
      }) as any;
      }
 
  

}
