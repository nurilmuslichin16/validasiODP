import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertBarcodeService {

  private _url = 'http://localhost/validasi/index.php/api/insert_port';

  constructor(private _http: HttpClient) { }

  insert(data) {
    return this._http.post<any>(this._url, data);
  }
}
