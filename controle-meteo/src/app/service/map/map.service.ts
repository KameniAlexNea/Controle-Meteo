import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {Location} from '../../model/location/location';
import { WeatherService } from '../weather/weather.service';
import { Weather } from '../../model/weather/weather';

//const provider = new OpenStreetMapProvider();


@Injectable({
  providedIn: 'root'
})
export class MapService {

  //lien source de la carte utilisée : carte du monde
  private url:string = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

  constructor(private weather: WeatherService) { 
    
  }

  //creation de la carte
  public creerCarte(location){
    var lat = location.latitude;
    var lon = location.longitude;
    var myMap = L.map('map').setView([lat,lon], 6);
 
    var Tile = L.tileLayer(this.url, {
      attribution: 'Map'
    }).addTo(myMap);
    this.weather.obtenirLocation(location);
    return myMap
  }

  //positionnement du marqueur sur la map selon les coordonnées acquises
  public putMarker(myMap,location){
    var lat = location.latitude;
    var lon = location.longitude;
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-shadow.png'
    });
    var marker = L.marker([lat,lon], {icon: myIcon}).bindPopup("Vous êtes ici").addTo(myMap);
    return marker
  }

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
    this.weather.obtenirLocation(location);
    return location;
  }
}
