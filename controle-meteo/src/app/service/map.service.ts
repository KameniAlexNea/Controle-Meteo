import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {Location} from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  //lien source de la carte utilisée : carte du monde
  private url:string = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

  constructor() { }

  
  //creation de la carte
  public creerCarte(lat,lon){
    var myMap = L.map('map').setView([lat,lon], 6);
 
    var Tile = L.tileLayer(this.url, {
      attribution: 'Map'
    }).addTo(myMap);
    //var marker = this.putMarker(myMap)
    return myMap
  }

  //positionnement du marqueur sur la map selon les coordonnées acquises
  public putMarker(myMap,lat:number,lon:number){

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-shadow.png'
    });
    var marker = L.marker([lat,lon], {icon: myIcon}).bindPopup("Vous êtes ici").addTo(myMap);
    return marker
  }
  /*
  //positionnement du marqueur sur la map selon le nom de la region
  public putMarkerByName(myMap,city:string,country:number){
    var lat:number;
    var lon:number;
    //?
    var marker = this.putMarker(myMap,lat,lon);
    return marker
  }*/

  //obtenir la position du marqueur sur la carte
  public obtenirPosition(e,marker,myMap){
    //var marker = this.putMarker(myMap)
    var lat = e['latlng']['lat'];
    var lng = e['latlng']['lng'];
    marker.setLatLng([lat, lng]).addTo(myMap);
    marker.bindPopup("Vous êtes maintenant ici").openPopup();
    var location = new Location();
    location.latitude = lat;
    location.longitude = lng;

    return location;
  }
}
