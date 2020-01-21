import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { resolve } from 'url';
import { WeatherService } from '../weather/weather.service';
import { Location } from 'src/app/model/location/location';

//const provider = new OpenStreetMapProvider();


@Injectable({
  providedIn: 'root'
})
export class MapService {

  //lien source de la carte utilisée : carte du monde
  private url: string = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

  constructor(private weather: WeatherService) {

  }

  //creation de la carte
  public creerCarte(location) {
    var lat = location.latitude;
    var lon = location.longitude;
    var myMap = L.map('map');

    var Tile = L.tileLayer(this.url, {
      attribution: 'Map',
      maxZoom: 18
    }).addTo(myMap);
    myMap.setView([lat, lon], 6);
    //plutard l'objet location sea forcement rempli par la derniere ville cherchée de la BD et on efface cette ligne

    return myMap
  }

  public LocationFound(e, myMap, marker) {
    var radius = e.accuracy / 2;
    marker.setLatLng(e.latlng).addTo(myMap);
    marker.bindPopup("Vous êtes ici");
    var location = new Location();
    var lat = e['latlng']['lat'];
    var lng = e['latlng']['lng'];
    location.latitude = lat;
    location.longitude = lng;
    return new Promise<Location>((resolve, reject) => {
      this.weather.obtenirLocation(location).then(
        (location) => {
          resolve(location);
          //console.log("Location = ", location);
        }),
        (error) => {
          reject(error);
        }
    });

  }

  public LocationError(e) {
    alert(e.message);
  }

  //pour chercher le lieu passé dans la barre de recherche et le positionner sur la carte
  public chercher(city: string, myMap, marker) {
    var location = new Location();
    location.city = city;
    return new Promise<Location>((resolve, reject) => {
      this.weather.obtenirLocation(location).then(
        (location) => {
          resolve(location);
          //console.log("Location du lieu = ", location);
          myMap.setView([location.latitude, location.longitude], 6);
          //console.log("ok "+location.latitude,location.longitude);
          marker.setLatLng([location.latitude, location.longitude]).addTo(myMap);
          marker.bindPopup("Vous cherchez ici").openPopup();
        }),
        (error) => {
          reject(error);
        }
    });
  }

  //positionnement du marqueur sur la map selon les coordonnées acquises
  public putMarker(myMap, location) {
    var lat = location.latitude;
    var lon = location.longitude;
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-shadow.png'
    });
    var marker = L.marker([lat, lon], { icon: myIcon }).bindPopup("Vous êtes ici").addTo(myMap);
    return marker
  }

  //obtenir la position du marqueur sur la carte
  public obtenirPosition(e, marker, myMap) {
    //var marker = this.putMarker(myMap)
    var lat = e['latlng']['lat'];
    var lng = e['latlng']['lng'];
    marker.setLatLng([lat, lng]).addTo(myMap);
    marker.bindPopup("Vous êtes maintenant ici").openPopup();
    var location = new Location();
    location.latitude = lat;
    location.longitude = lng;

    return new Promise<Location>((resolve, reject) => {
      this.weather.obtenirLocation(location).then(
        (location) => {
          resolve(location);
        }),
        (error) => {
          reject(error);
        }
    });
  }
}
