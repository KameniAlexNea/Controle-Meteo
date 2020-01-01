import { Injectable } from '@angular/core';
import {Weather} from '../model/weather';

//ce service gère l'API de données météoroliques : OWM

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey : string = "YOUR_API_KEY";
  private url : string = "https://api.openweathermap.org/data/2.5/";
  constructor() { }

  //méthodes du service

  public getWeatherByName(city:string, country:string):Weather{
    var meteo = new Weather();
    return meteo;
  }
  
  public getWeatherByLocation(lat : number, lon : number):Weather{
    var meteo = new Weather();
    return meteo;
  }
  
  //les méthodes suivantes retournent des tableaux des prédicitions des données météo par jour et par heure
  public getForecastHourlyByName(city:string, country:string){
    var hourly = new Array();
    return hourly;
  }
  
  public getForecastHourlyByLocation(lat : number, lon : number){
    var hourly = new Array();
    return hourly;
  }
  
  public getForecastDailyByName(city:string, country:string){
    var daily = new Array();
    return daily;
  }

  public getForecastDailyByLocation(lat : number, lon : number){
    var daily = new Array();
    return daily;
  }

}
