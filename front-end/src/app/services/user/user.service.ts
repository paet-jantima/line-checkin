import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/app/api.urls';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${apiUrls.userServiceApi}/user`);
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(`${apiUrls.userServiceApi}/User/${userId}`);
  }
}
