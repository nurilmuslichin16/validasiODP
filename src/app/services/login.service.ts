import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validasi } from '../models/validasi.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _url = 'https://dava.jarvisid.com/api/login';

  constructor(private _http: HttpClient) { }

  login(): Observable<Validasi>{
    return this._http.post<Validasi>(this._url, {telegram_id: 26749742});
  }
  
}
