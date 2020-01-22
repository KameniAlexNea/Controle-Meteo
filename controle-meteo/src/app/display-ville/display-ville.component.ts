import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Location } from '../model/location/location';
import { Weather } from '../model/weather/weather';
import { WeatherService } from '../service/weather/weather.service';

@Component({
   selector: 'app-display-ville',
   templateUrl: './display-ville.component.html',
   styleUrls: ['./display-ville.component.scss']
})
export class DisplayVilleComponent implements OnInit {

   weather: Weather
   imgBg: string = "icon-2.svg"
   bgColor: string

   @Input()
   location: Location

   @Input()
   id: Number

   @Output()
   prevision = new EventEmitter<Number>();

   updateValue() {
      this.prevision.emit(this.id);
      console.log('updateValue')
   }

   constructor(private weath: WeatherService) {
      
   }

   ngOnInit() {
      console.log(this.location)
      this.weath.getWeatherByLocation(this.location).then(async (weather) => {
         this.weather = weather
         this.setImageByTemp()
      }, err => {
         throw err;
      })
   }

   setImageByTemp() {
      if (this.weather.temperature >= 35) {
         this.imgBg = "icon-2.svg"
      } else if (this.weather.temperature >= 30) {
         this.imgBg = "icon-3.svg"
      } else if (this.weather.temperature >= 25) {
         this.imgBg = "icon-5.svg"
      } else if (this.weather.temperature >= 20) {
         this.imgBg = "icon-6.svg"
      } else if (this.weather.temperature >= 15) {
         this.imgBg = "icon-8.svg"
      } else if (this.weather.temperature >= 10) {
         this.imgBg = "icon-10.svg"
      } else {
         this.imgBg = "icon-11.svg"
      }
      this.weather.temperature = parseFloat(this.weather.temperature.toFixed(2))
   }

}
