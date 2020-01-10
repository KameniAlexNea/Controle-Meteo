import { Component, OnInit, Input } from '@angular/core';

import { MapService } from '../service/map/map.service';
import { Location } from '../model/location/location';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    //stocke les coordonées géographiques du lieu sélectionné sur la carte
    @Input()
    private location: Location
    //la carte
    myMap: any;
    //le marqueur de position
    marker: any;

    map: MapService;

    constructor(map: MapService) {
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
        // invalidateSize()
        this.myMap.invalidateSize();
    }
}
