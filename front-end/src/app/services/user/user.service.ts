import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/app/api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any>(`${apiUrls.userServiceApi}/User`, { headers });
  }

  getUserById(userId: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any>(`${apiUrls.userServiceApi}/User/${userId}`, { headers });
  }

  updateById(userId: any, userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.put<any>(`${apiUrls.userServiceApi}/User/update/${userId}`, userData, { headers });
  }

  delete(userId: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.delete<any>(`${apiUrls.userServiceApi}/User/delete/${userId}`, { headers });
  }
}
