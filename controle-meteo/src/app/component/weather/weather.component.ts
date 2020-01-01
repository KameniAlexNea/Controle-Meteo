import { Component, OnInit } from '@angular/core';
import {Weather} from '../../model/weather';
import {Location} from '../../model/location';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

//c'est ici qu'on affiche les résultats de l'API de méteo, current et forecast
export class WeatherComponent implements OnInit {

  //stocke la location de la recherche
  location: Location = new Location();
  //stocke les données météoroliques courrentes
  meteo: Weather = new Weather();
  //stocke les prévisions météoroliques par jour et par heure 
  daily = new Array();
  hourly = new Array();
  
  constructor(weather: WeatherService) { }

  ngOnInit() {
  }

}
