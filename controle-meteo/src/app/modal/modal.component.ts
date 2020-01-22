import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapService } from 'src/app/service/map/map.service';
//import * as L from 'leaflet';
import { Location } from '../model/location/location';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
//coordonnées initiales
const lat = 4.05;
const lon = 9.7;


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output()
  messageToEmit = new EventEmitter<Location>();

  location: Location = new Location();
  //la carte
  myMap: any;
  //le marqueur de position
  marker: any;
  //le formulaire de recherche de ville
  villeForm: FormGroup;
  submitted = false;
  id:string = "map"

  @Output()
  private locationOutput = new EventEmitter<string>();

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private formBuilder: FormBuilder, private map: MapService) {
    this.location.latitude = lat;
    this.location.longitude = lon;
    this.map = map;
  }

  ngOnInit() {
    this.villeForm = this.formBuilder.group({
      city: ['', Validators.required]
    })
    //creation de la carte 
    if (this.myMap) {
      this.myMap.remove();
    }
    this.myMap = this.map.creerCarte(this.location);

    //on détermine la localisation de l'utilisateur mais seulement s'il se connecte pour la première fois!!
    this.myMap.on('locationfound', (e) => {
      this.map.LocationFound(e, this.myMap, this.marker).then((data) => {
        this.location = this.remplirLocationWithData(data)
      });
    });
    this.myMap.on('locationerror', (e) => {
      this.map.LocationError(e);
    });

    this.myMap.locate({ setView: true, maxZoom: 10 });

    //positionner le marquer initial
    this.marker = this.map.putMarker(this.myMap, this.location);

    //selectionner un lieu sur la carte

    this.myMap.on('click', (e) => {
      this.map.obtenirPosition(e, this.marker, this.myMap).then((data) => {
        //this.locationOutput.emit(JSON.stringify(data));
        this.location = this.remplirLocationWithData(data)
      });
    });

  }
  get f() { return this.villeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.villeForm.invalid) {
      return;
    }

    var city = this.villeForm.value.city;
    console.log("ville = " + city);
    this.map.chercher(city, this.myMap, this.marker).then((data) => {
      this.locationOutput.emit(JSON.stringify(data));
      this.location = this.remplirLocationWithData(data)
    });
  }

  onReset() {
    this.submitted = false;
    this.villeForm.reset();
  }

  actionFunction() {
    alert("You have logged out.");
    this.locationOutput.emit(JSON.stringify(this.location));
    this.messageToEmit.emit(this.location);
    console.log("1")
    console.log(this.location)
    this.closeModal();
  }


  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  remplirLocationWithData(data) {
    var location = new Location()
    location.id = data.id
    location.city = data.city
    location.country = data.country
    location.latitude = data.latitude
    location.longitude = data.longitude
    return location
  }

}