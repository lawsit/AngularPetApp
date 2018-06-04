import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Injectable()
export class AuthService {
 
  constructor(private http: HttpClient) {
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password}; 
    //let authUrl = 'http://localhost:8080';
    //let authUrl = 'https://authservice1.azurewebsites.net';
    let authUrl = environment.authServiceUrl;

    return this.http.post<any>( authUrl + '/auth', credentials);
  }

}