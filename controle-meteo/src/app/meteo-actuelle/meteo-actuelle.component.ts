import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Weather } from '../model/weather/weather';
import { WeatherService } from '../service/weather/weather.service';
import { Location } from '../model/location/location';
import { DatabaseUserService } from '../service/database/database-user.service';
import { DatabaseIdService } from '../service/database/database-id.service';
import { DatabaseLocationService } from '../service/database/database-location.service';
import { MapService } from '../service/map/map.service';

@Component({
   selector: 'app-meteo-actuelle',
   templateUrl: './meteo-actuelle.component.html',
   styleUrls: ['./meteo-actuelle.component.scss']
})

export class MeteoActuelleComponent implements OnInit {

   temperature: number = 25; // Afficher la temperature en haut, facilite les modif
   tempUnit: boolean = true // true pour °C et false pour °F
   actualDate: string // La date actuelle
   selectedCity: number = 0 // Id de la ville selectionnée
   imgBg: string; // Image à côté de la température
   locations: Array<Location>
   choiceLoc: Location; // Position choisie
   location: Location // Ma position actuelle
   //stocke les données météoroliques courrentes
   meteo: Weather = new Weather();
   //stocke les prévisions météoroliques par jour et par heure 
   daily = new Array();
   hourly = new Array();
   myMap: any;
   //le marqueur de position
   marker: any;

   map: MapService;

   weath: WeatherService;

   changeToCUnit(): void {
      if (!this.tempUnit) {
         this.temperature = (parseFloat(this.temperature.toString()) - 32) * 5 / 9;
         this.temperature = parseFloat(this.temperature.toFixed(2))
      }
      this.tempUnit = true
   }

   changeToFUnit(): void {
      if (this.tempUnit) {
         this.temperature = (parseFloat(this.temperature.toString()) * 9 / 5) + 32;
         this.temperature = parseFloat(this.temperature.toFixed(2))
      }
      this.tempUnit = false
   }

   choixVille(event): void {
      var target = event.target || event.srcElement || event.currentTarget
      this.selectedCity = parseInt(target.id)
      this.location = this.locations[this.selectedCity]
      this.obtenirMeteo(this.location)
   }

   supprimerVille(event): void {
      var target = event.target || event.srcElement || event.currentTarget
      this.selectedCity = parseInt(target.id);
      let loc = this.locations[this.selectedCity].id;
      this.locations.splice(this.selectedCity, 1);
      this.databaseLocationService.deleteLocation(loc);
   }

   public choixPosition(): void {
      this.locations.push(this.choiceLoc);
      this.databaseLocationService.saveLocation(this.choiceLoc);
   }

   ngOnInit() {
      this.choiceLoc = new Location();
      this.choiceLoc.latitude = 3.968;
      this.choiceLoc.longitude = 11.5213;
      this.choiceLoc.city = "Yaounde";
      this.choiceLoc.country = "CM";
      //creation de la carte 
      this.myMap = this.map.creerCarte(this.choiceLoc);
      //initialisation du marqueur
      this.marker = this.map.putMarker(this.myMap, this.choiceLoc);
      //selectionner un lieu sur la carte
      this.myMap.on('click', (e) => {
         this.map.obtenirPosition(e, this.marker, this.myMap).then(location => {
            this.choiceLoc = location;
         });
      });
      // $(window).ready(() => {
      //    $('#myModal').on('show.bs.modal', function () {
      //       console.log("Test")
      //       setTimeout(function () {
      //          this.myMap.invalidateSize();
      //       }, 100);
      //    });
      // })
      this.myMap.invalidateSize();
      this.obtenirMeteo(this.location)

      setInterval(() => {
         this.obtenirMeteo(this.location);
      }, 15 * 60 * 1000)
   }

   constructor(private weather: WeatherService,
      private databaseUserService: DatabaseUserService,
      private databaseIdService: DatabaseIdService,
      private databaseLocationService: DatabaseLocationService,
      map: MapService) {


      this.locations = new Array<Location>();
      this.databaseLocationService.getAll().then(data => {
         this.locations = data as Location[];
      });

      this.databaseIdService.getId().then(id => console.log());
      /**
       * La position par défaut
       */
      this.location = new Location();
      this.location.latitude = 3.968;
      this.location.longitude = 11.5213;
      this.location.city = "Yaounde";
      this.location.country = "CM";
      /**
       * Choix de ville est stocké ici
       */

      this.weath = weather;
      this.actualDate = new Date().toString()
      this.map = map;
   }

   ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
         let chng = changes[propName];
         let cur = chng.currentValue;
         let prev = JSON.stringify(chng.previousValue);
         this.obtenirMeteo(cur);
      }
   }

   obtenirMeteo(location) {
      this.weath.getWeatherByLocation(location).then(value => {
         this.meteo = value
      });

      this.weath.getForecastHourlyByLocation(location).then(value => {
         this.hourly = value;
         this.weath.getForecastDailyByLocation(location).then(value => {
            this.daily = value;
            this.setImageByTemp();
         });
      });
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
      this.temperature = parseFloat(this.meteo.temperature.toFixed(2))
      if (!this.tempUnit) {
         this.temperature = (parseFloat(this.temperature.toString()) * 9 / 5) + 32;
      }
   }



}
