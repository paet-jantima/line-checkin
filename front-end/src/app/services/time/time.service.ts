import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/app/api.urls';


@Injectable({
  providedIn: 'root'
})
export class TimeRecordService {

  constructor(private http: HttpClient) { }

  getAlltime(): Observable<any> {
    return this.http.get<any>(`${apiUrls.timeServiceApi}getall`);
  }

  getMytime(timeObj: any): Observable<any> {
    return this.http.get<any>(`${apiUrls.timeServiceApi}getmytime/${timeObj}`);
  }


  checkIn(userId: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.timeServiceApi}checkin/${userId}`, userId);
  }

  checkOut(userId: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.timeServiceApi}checkout/${userId}`, userId);
  }

  edit(userId: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.timeServiceApi}edit/${userId}`, userId);
  }


}


