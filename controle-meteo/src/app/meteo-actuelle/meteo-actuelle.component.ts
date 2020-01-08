import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-meteo-actuelle',
   templateUrl: './meteo-actuelle.component.html',
   styleUrls: ['./meteo-actuelle.component.scss']
})

// './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export class MeteoActuelleComponent implements OnInit {

   temperature: number = 25;
   coulds: string = "15%";
   humidity: string = "2%";
   preasure: string = "3%";
   position: string = "Ngoa-Ekélé, Yaoundé"
   stateDay: string = "Brume"
   tempUnit: boolean = true
   actualDate: string
   cities: Array<String> = new Array<String>('Yaoundé', 'Bafang', 'Douala', 'Nkong')
   selectedCity: Number = 0
   horaire: Array<String> = new Array<String>('Horaire', '15', '20', '17', '18')
   temperatureArray: Array<String> = new Array<String>('Temperature', '15', '20', '17', '18')
   humiditeArray: Array<String> = new Array<String>('Humidite', '15', '20', '17', '18')
   cloudsArray: Array<String> = new Array<String>('Clouds', '15', '20', '17', '18')
   lieu: any
   statusTemp:String="assets/img/temperature.ico"

   

   constructor() {
      this.actualDate = new Date().toString() //toJSON().slice(0, 10).replace(/-/g, '/');
   }

   ngOnInit() {
   }

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

   public choixPosition():void {
      if (!this.cities.includes("South")) {
         this.cities.push("South");
      }
   }

}
