import { Component, OnInit } from '@angular/core';

import { MapService } from '../service/map/map.service';
import { Location } from '../model/location/location';

//coordonnées du dernier lieu selectionné
const lat = 3.8666700 //7.369722;
const lon = 11.5166700 //12.354722;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    //stocke les coordonées géographiques du lieu sélectionné sur la carte
    location: Location = new Location();
    //la carte
    myMap: any;
    //le marqueur de position
    marker: any;

    map: MapService;

    constructor(map: MapService) {
        this.location.latitude = lat;
        this.location.longitude = lon;
        this.map = map;
    }

    ngOnInit() {
        //creation de la carte 
        this.myMap = this.map.creerCarte(this.location);
        //initialisation du marqueur
        this.marker = this.map.putMarker(this.myMap, this.location);
        //selectionner un lieu sur la carte
        this.myMap.on('click', (e) => {
            this.location = this.map.obtenirPosition(e, this.marker, this.myMap);
        });
    }


}
