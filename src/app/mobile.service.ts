import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Mobile {
  id?: number;
  name: string;
  price: number;
  ram: number;
  storage: number;
}

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private readonly url = 'http://localhost:3000/mobiles';

  constructor(private http: HttpClient) {}

  fetchMobiles(): Observable<Mobile[]> {
    return this.http.get<Mobile[]>(this.url);
  }

  deleteMobile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  postMobile(body: Mobile): Observable<Mobile> {
    return this.http.post<Mobile>(this.url, body);
  }

  putMobile(body: Mobile): Observable<Mobile> {
    return this.http.put<Mobile>(`${this.url}/${body.id}`, body);
  }
}
