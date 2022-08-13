import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  api = {
    key: "08f6ec1e7b177b5af389baee80528323",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

  constructor(private http: HttpClient) { }

  getWeather(lat: number, long: number): Observable<any>
  {
    return this.http.get(`${this.api.base}weather?lat=${lat}&lon=${long}&lang=${this.api.lang}&units=${this.api.units}&APPID=${this.api.key}`);
  }

}
