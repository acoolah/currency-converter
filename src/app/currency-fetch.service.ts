import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyFetchService {
  private _api: string = 'https://free.currconv.com';
  private _key: string = '6baefa1678719af48b9f';

  constructor(private _http: HttpClient) {}

  getData(first: string, second: string): Observable<Object> {
    let firstToSecond: string = `${first.toUpperCase()}_${second.toUpperCase()}`;
    let secondToFirst: string = `${second.toUpperCase()}_${first.toUpperCase()}`;

    return this._http.get<Object>(
      this._api +
        `/api/v7/convert?q=${firstToSecond},${secondToFirst}&compact=ultra&apiKey=${this._key}`
    );
  }

  getCurrencies(): Observable<Object> {
    return this._http.get<Object>(
      this._api + `/api/v7/currencies?apiKey=${this._key}`
    );
  }
}
