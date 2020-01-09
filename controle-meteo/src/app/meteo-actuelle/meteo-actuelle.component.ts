import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Weather } from '../model/weather/weather';
import { WeatherService } from '../service/weather/weather.service';
import { Location } from '../model/location/location'

@Component({
   selector: 'app-meteo-actuelle',
   templateUrl: './meteo-actuelle.component.html',
   styleUrls: ['./meteo-actuelle.component.scss']
})

// './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export class MeteoActuelleComponent implements OnInit {

   temperature: Number = 25; // Afficher la temperature en haut, facilite les modif
   stateDay: string = "Brume" // Description
   tempUnit: boolean = true // true pour °C et false pour °F
   actualDate: string // La date actuelle
   selectedCity: Number = 0 // Id de la ville selectionnée
   imgBg: String // Image à côté de la température
   locations:Array<Location>

   changeToCUnit(): void {
      if (!this.tempUnit) {
         this.temperature = (parseFloat(this.temperature.toString()) - 32) * 5 / 9;
      }
      this.tempUnit = true
   }

   changeToFUnit(): void {
      if (this.tempUnit) {
         this.temperature = (parseFloat(this.temperature.toString()) * 9 / 5) + 32;
      }
      this.tempUnit = false
   }

   choixVille(event): void {
      var target = event.target || event.srcElement || event.currentTarget;
      this.selectedCity = parseInt(target.id)
      console.log(this.selectedCity)
   }

   supprimerVille(event): void {
      var target = event.target || event.srcElement || event.currentTarget;
      this.selectedCity = parseInt(target.id)
      console.log(this.selectedCity)
   }

   public choixPosition(): void {
      
   }

   location: Location = new Location();

   ngOnInit() {
      this.obtenirMeteo(this.location)
      setTimeout(()=>{
         this.temperature = this.meteo.temperature;
         this.temperature.toFixed(2);
         this.setImageByTemp()
      }, 3000)
      setInterval(()=> {
         this.obtenirMeteo(this.location);
      }, 15*60*1000)
   }


   //stocke les données météoroliques courrentes
   meteo: Weather = new Weather();
   //stocke les prévisions météoroliques par jour et par heure 
   daily = new Array();
   hourly = new Array();

   weath: WeatherService;

   constructor(weather: WeatherService) {
      this.location.latitude = 3.968;
      this.location.longitude = 11.5213;
      this.location.city = "Yaounde";
      this.location.country = "CM";
      this.weath = weather;
      //this.obtenirMeteo();
      this.actualDate = new Date().toString() //toJSON().slice(0, 10).replace(/-/g, '/');
   }

   ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
         let chng = changes[propName];
         let cur = chng.currentValue;
         let prev = JSON.stringify(chng.previousValue);
         this.obtenirMeteo(cur);
      }
   }


   /*  @Output()
   prevision = new EventEmitter();*/

   /*updateValue() {   
     var location = this.location;
     //console.log("test "+lat)
     this.prevision.emit(this.);
   }*/

   obtenirMeteo(location) {
      //this.location = new Location();
      /*var city = this.location.city
      var country = this.location.country*/
      //this.meteo=weather.getWeatherByName(city, country);
      this.meteo = this.weath.getWeatherByLocation(location);
      this.temperature = this.meteo.temperature;
      if (!this.tempUnit) {
         this.temperature = (parseFloat(this.temperature.toString()) * 9 / 5) + 32;
      }
      //this.hourly=weather.getForecastHourlyByName(city, country);
      this.hourly = this.weath.getForecastHourlyByLocation(location);
      //this.daily=weather.getForecastDailyByName(city, country);
      this.daily = this.weath.getForecastDailyByLocation(location);
      this.setImageByTemp();
   }

   setImageByTemp() {
      if (this.meteo.temperature >= 35) {
         this.imgBg = "icon-2.svg"
      } else if (this.meteo.temperature >= 30) {
         this.imgBg = "icon-3.svg"
      } else if (this.meteo.temperature >= 25) {
         this.imgBg = "icon-5.svg"
      } else if (this.meteo.temperature >= 20) {
         this.imgBg = "icon-6.svg"
      } else if (this.meteo.temperature >= 15) {
         this.imgBg = "icon-8.svg"
      } else if (this.meteo.temperature >= 10) {
         this.imgBg = "icon-10.svg"
      } else {
         this.imgBg = "icon-11.svg"
      }

   }

}
