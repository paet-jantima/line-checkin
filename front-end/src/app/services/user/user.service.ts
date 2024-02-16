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
    return this.http.get<any>(`${apiUrls.userServiceApi}/User`);
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(`${apiUrls.userServiceApi}/User/${userId}`);
  }


  updateById(userId: any, userData: any): Observable<any> {
    return this.http.put<any>(`${apiUrls.userServiceApi}/User/update/${userId}`, userData);
  }

  delete(userId: any): Observable<any> {
    return this.http.delete<any>(`${apiUrls.userServiceApi}/User/delete/`,userId);
  }




}
