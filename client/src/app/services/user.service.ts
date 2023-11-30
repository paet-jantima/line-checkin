import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);


  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }



  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${apiUrls.userServiceApi}/user`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${apiUrls}/user/${userId}`);
  }
}
