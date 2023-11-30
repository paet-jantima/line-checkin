import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { apiUrls } from '../api.urls';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  isloggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`,loginObj);
  }

  loginLineService(loginLineObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}loginline`,loginLineObj );
  }

  isLoggedIn(){
    return !!localStorage.getItem("user_id");
  }

}


