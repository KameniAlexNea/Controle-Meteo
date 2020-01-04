import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/service/map.service';
//import * as L from 'leaflet';
import {Location} from '../../model/location';
//coordonnées initiales
const lat = 3.8666700 //7.369722;
const lon = 11.5166700 //12.354722;


//ce service gère l'API de données de la Map : OSM
@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})

//ce component servira à l'affichage de la carte
export class CarteComponent implements OnInit {
  //stocke les coordonées géographiques du lieu sélectionné sur la carte
  location: Location = new Location();
  //la carte
  myMap:any;
  //le marqueur de position
  marker:any;
  
  map:MapService;

  constructor(map: MapService) {
    this.location.latitude = lat;
    this.location.longitude = lon;
    this.map = map;
   }

  ngOnInit() {
    //creation de la carte 
    this.myMap=this.map.creerCarte(lat,lon);
    //initialisation du marqueur
    this.marker = this.map.putMarker(this.myMap,lat,lon);
    //selectionner un lieu sur la carte
    this.myMap.on('click', (e) => {
      this.location = this.map.obtenirPosition(e,this.marker,this.myMap);
    });
  }

}
