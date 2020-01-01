import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/service/map.service';

//ce service gère l'API de données de la Map : OSM
@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})

//ce component servira à l'affichage de la carte
export class CarteComponent implements OnInit {

  //stocke les coordonées géographiques du centre de la carte
  location: Location = new Location();

  constructor(map: MapService) { }

  ngOnInit() {
  }

}
