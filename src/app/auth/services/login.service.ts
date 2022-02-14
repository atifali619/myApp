import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  isLoggedIn = new Subject<any>();

  signUp(email: any, password: any) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        environment.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  logIn(email: any, password: any) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        environment.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
