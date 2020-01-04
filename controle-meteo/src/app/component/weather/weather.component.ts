import { Component, OnInit, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
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

  //stocke la location de la recherche provenant de la carte

  @Input()
  malocation: Location = new Location();
  
  //stocke les données météoroliques courrentes
  meteo: Weather = new Weather();
  //stocke les prévisions météoroliques par jour et par heure 
  daily = new Array();
  hourly = new Array();

  weath: WeatherService;
  
  constructor(weather: WeatherService) {
    /*this.malocation.latitude = 3.968;
    this.malocation.longitude = 11.5213;
    this.malocation.city = "Yaounde";
    this.malocation.country = "CM"; */
    this.weath=weather;
    //this.obtenirMeteo();
   }

  ngOnChanges(changes: SimpleChanges){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
      let prev = JSON.stringify(chng.previousValue);
      this.obtenirMeteo(cur);
    }
  }

  ngOnInit() {
    this.obtenirMeteo(this.malocation);
  }

/*  @Output()
  prevision = new EventEmitter();*/

  /*updateValue() {   
    var location = this.malocation;
    //console.log("test "+lat)
    this.prevision.emit(this.);
  }*/ 

  obtenirMeteo(location){
    //this.malocation = new Location();
    var lat = location.latitude;
    //console.log("test "+lat)
    var lon = location.longitude
    /*var city = this.malocation.city
    var country = this.malocation.country*/
    //this.meteo=weather.getWeatherByName(city, country);
    this.meteo=this.weath.getWeatherByLocation(lat,lon ); 
    //this.hourly=weather.getForecastHourlyByName(city, country);
    this.hourly=this.weath.getForecastHourlyByLocation(lat, lon);
    //this.daily=weather.getForecastDailyByName(city, country);
    this.daily=this.weath.getForecastDailyByLocation(lat, lon);
   
  }

}
