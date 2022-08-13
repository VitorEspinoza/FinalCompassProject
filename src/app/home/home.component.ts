import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AccountService } from './../account/services/account.service';
import { LocalStorageUtils } from 'src/app/utilities/localstorage';
import { WeatherService } from './../Services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actualDateTime: number = Date.now();
  weather: any;
  timer: number = 600;
  urlIcon!: string;
  localStorage: LocalStorageUtils = new LocalStorageUtils;
  returnUrl!: string;
  constructor(private weatherService: WeatherService, private accountService: AccountService, private fireAuth: AngularFireAuth, router: Router) {
    setInterval(() => {

     this.refreshTime();
     if(this.timer != 0)
      this.timer--;
     else
      accountService.logout();
    }, 1000)
  }

  ngOnInit(): void {
    this.weatherService.getWeather( -23.5489, -46.6388).
    subscribe((weather) => {
     this.weather = weather;
     this.urlIcon = "../../assets/" + weather.weather[0].icon + ".png";
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      (position) => {
       this.weatherService.getWeather(position.coords.latitude, position.coords.longitude).
       subscribe((weather) => {
        this.weather = weather;
        this.urlIcon = "../../assets/" + weather.weather[0].icon + ".png";
       });
      }
      );
    }
    else {
      alert('navegador não suporta geolozalicação');
    }

  }

  logout() {
    this.accountService.logout();
  }

  refreshTime (){
      this.actualDateTime = Date.now();
  }
}
