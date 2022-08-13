import { HomeGuard } from './Services/home.guard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HomeComponent } from './home/home.component';
import { WeatherService } from './Services/weather.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    WeatherService,
    HomeGuard
   ],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
   bootstrap: [AppComponent]
})
export class AppModule { }
