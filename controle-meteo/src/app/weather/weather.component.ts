import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Weather } from '../model/weather/weather';
import { Location } from '../model/location/location';
import { WeatherService } from '../service/weather/weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
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
        this.weath = weather;
        //this.obtenirMeteo();
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = chng.currentValue;
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

    obtenirMeteo(location) {
        //this.malocation = new Location();
        /*var city = this.malocation.city
        var country = this.malocation.country*/
        //this.meteo=weather.getWeatherByName(city, country);
        this.weath.getWeatherByLocation(location).then(value => { this.meteo = value });
        //this.hourly=weather.getForecastHourlyByName(city, country);
        this.weath.getForecastHourlyByLocation(location).then(value => { this.hourly = value });
        //this.daily=weather.getForecastDailyByName(city, country);
        this.weath.getForecastDailyByLocation(location).then(value => { this.daily = value });
    }
}
