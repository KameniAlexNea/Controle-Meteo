import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Weather } from '../model/weather/weather';
import { WeatherService } from '../service/weather/weather.service';
import { Location } from '../model/location/location';
import { DatabaseUserService } from '../service/database/database-user.service';
import { DatabaseIdService } from '../service/database/database-id.service';
import { DatabaseLocationService } from '../service/database/database-location.service';
import { MapService } from '../service/map/map.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
   selector: 'app-meteo-actuelle',
   templateUrl: './meteo-actuelle.component.html',
   styleUrls: ['./meteo-actuelle.component.scss']
})

export class MeteoActuelleComponent implements OnInit {

   temperature: Number = 25; // Afficher la temperature en haut, facilite les modif
   tempUnit: boolean = true // true pour °C et false pour °F
   actualDate: string = "" // La date actuelle
   selectedCity: number = 0 // Id de la ville selectionnée
   imgBg: string = ""; // Image à côté de la température
   locations: Array<Location> = new Array<Location>()
   choiceLoc: Location = new Location();
   location: Location = new Location();

   myMap: any;
   //le marqueur de position
   marker: any;

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
      var target = event.target || event.srcElement || event.currentTarget
      this.selectedCity = parseInt(target.id)
      this.location = this.locations[this.selectedCity]
      this.obtenirMeteo(this.location);
   }

   supprimerVille(event): void {
      var target = event.target || event.srcElement || event.currentTarget
      this.selectedCity = parseInt(target.id);
      let loc = this.locations[this.selectedCity].id;
      this.locations.splice(this.selectedCity, 1);
      this.databaseLocationService.deleteLocation(loc);
   }

   public setPosition($event) {
      this.choiceLoc = $event;
   }

   public choixPosition(): void {
      this.locations.push(this.choiceLoc);
      this.databaseLocationService.saveLocation(this.choiceLoc);
   }

   ngOnInit() {
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
      setInterval(() => {
         this.obtenirMeteo(this.location)
      }, 15 * 60 * 1000)
   }


   //stocke les données météoroliques courrentes
   meteo: Weather = new Weather();
   //stocke les prévisions météoroliques par jour et par heure 
   daily = new Array();
   hourly = new Array();

   weath: WeatherService;

   openModal() {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "600px";
      dialogConfig.width = "800px";
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
      modalDialog.componentInstance["messageToEmit"].subscribe((event)=>{
         this.choiceLoc = event;
         this.choixPosition();
        /* console.log("2")
         console.log(this.choiceLoc)*/
      })
      
    }

   constructor(private weather: WeatherService,
      private databaseUserService: DatabaseUserService,
      private databaseIdService: DatabaseIdService,
      private databaseLocationService: DatabaseLocationService,
      private map:MapService, public matDialog: MatDialog) {


      this.locations = new Array<Location>();
      this.databaseLocationService.getAll().then(data => {
         this.locations = Array();
         let temp = <Location[]>data;
         for (let obj of temp) {
            let tempL = new Location();
            this.castLocationFromDb(obj, tempL);
            this.locations.push(tempL);
         }
         console.log(this.locations);
         if (this.locations.length > 0) {
            this.location = this.locations[0];
            this.choiceLoc = this.locations[0];
            this.weath = weather;
            this.actualDate = new Date().toString();

            // retrieve meto parameter
            this.obtenirMeteo(this.location);
         }
      });
      this.databaseIdService.getId().then(id => {
         if (id) {
            this.databaseLocationService.getLocation(Number(id))
               .then(
                  (data) => {
                     this.castLocationFromDb(data, this.location);
                     this.castLocationFromDb(data, this.choiceLoc);
                     this.weath = weather;
                     this.actualDate = new Date().toString();

                     // retrieve meto parameter
                     this.obtenirMeteo(this.location);
                  },
                  (error) => {
                     console.log(error);
                  }
               );
         } else {
            if (!this.location.city) {
               this.location = new Location();
               this.location.latitude = 3.968;
               this.location.longitude = 11.5213;
               this.location.city = "Yaounde";
               this.location.country = "CM";

               /**
                * Choix de ville est stocké ici
                */
               this.choiceLoc = new Location();
               this.choiceLoc.latitude = 3.968;
               this.choiceLoc.longitude = 11.5213;
               this.choiceLoc.city = "Yaounde";
               this.choiceLoc.country = "CM";


               this.weath = weather;
               this.actualDate = new Date().toString();

               // retrieve meto parameter
               this.obtenirMeteo(this.location);
            }
         }
      });

   }

   ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
         let chng = changes[propName];
         let cur = chng.currentValue;
         this.obtenirMeteo(cur);
      }
   }

   obtenirMeteo(location) {
      this.weath.getWeatherByLocation(location)
         .then(
            (data) => {
               this.castWeather(data, this.meteo);
               this.temperature = parseFloat(this.meteo.temperature.toFixed(2))
               if (!this.tempUnit) {
                  this.temperature = (parseFloat(this.temperature.toString()) * 9 / 5) + 32;
               }
               this.setImageByTemp();
            },
            (error) => {
               console.log(error);
            }
         );

      this.weath.getForecastHourlyByLocation(location)
         .then(
            (hourly) => {
               this.hourly = hourly;
               this.setImageByTemp();
            },
            (error) => {
               console.log(error);
            });

      this.weath.getForecastDailyByLocation(location)
         .then(
            (daily) => {
               this.daily = daily;
               this.setImageByTemp();
            },
            (error) => {
               console.log(error);
            }
         );

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

   castLocation(object, location: Location) {
      location.city = object['_city_name'];
      location.country = object['_country_name'];
      location.id = object['_id'];
      location.latitude = object['_latitude'];
      location.longitude = object['_longitude'];
   }

   castLocationFromDb(object, location: Location) {
      location.city = object['city_name'];
      location.country = object['country_name'];
      location.id = object['id'];
      location.latitude = object['latitude'];
      location.longitude = object['longitude'];
   }
   castWeather(object, weather: Weather) {
      weather.clouds = object['_clouds'];
      weather.heure = object['_heure'];
      weather.humidity = object['_humidity'];
      weather.jour = object['_jour'];
      weather.temperature = object['_temperature'];
   }
}