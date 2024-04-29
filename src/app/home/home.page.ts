import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { CountryPropertyComponent } from '../country-property/country-property.component';

class Country {
  name: string
  region: string
  population: number;
  flag: string;
  capital: string;

  constructor(json: any) {
    this.name = json['name']['common'];
    this.region = json['region'];
    this.population = json['population'];
    this.flag = json['flags'][0];
    this.capital = json['capital'] ? json['capital'][0] : null;
    this.population = json['population'];
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, HttpClientModule, IonFab, IonIcon, IonFabButton, IonButton, NgIf, IonSpinner, CountryPropertyComponent],
})
export class HomePage implements OnInit {
  countries: Country[] = [];
  currentCountry?: Country;

  constructor(private http: HttpClient) {
    addIcons(ionIcons);
  }

  ngOnInit(): void {
    this.fetchAllCountries();
  }

  fetchAllCountries(): void {
    this.http
      .get<string[]>(`https://restcountries.com/v3/all`)
      .subscribe({
        next: (v) => {
          this.countries = v.map(item => new Country(item));
          this.getRandomCountry();
        },
        error: (e) => console.error(e)
      })
  }

  getRandomCountry(): void {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    this.currentCountry = this.countries[randomIndex];
  }

  onRefreshButtonClick() {
    this.getRandomCountry();
  }
}
