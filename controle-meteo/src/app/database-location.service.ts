import { Injectable, Inject, forwardRef } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Location } from '../app/model/location/location';


@Injectable({
  providedIn: 'root'
})
export class DatabaseLocationService {

  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
    dbService.currentStore = 'Location';
  }
  USERSTORE='Location'

  getLocation(id : number) {
    this.dbService.currentStore=this.USERSTORE;
    return new Promise((resolve, reject) => {
      this.dbService.getByKey(id).then(
        location => {
            resolve(location);
        },
        error => {
            reject(error);
        }
    );
    });   
}

  getAll() {
    this.dbService.currentStore=this.USERSTORE;
    return new Promise((resolve, reject) => {
      this.dbService.getAll().then(
        location => {
            resolve(location);
        },
        error => {
            reject(error);
        }
    );
    }); 
  }

  updateLocation(location : Location){
    this.dbService.currentStore=this.USERSTORE;

    this.dbService.update({ id : location.id, country_name: location.country, city_name: location.city, 
      longitude : location.longitude, latitude : location.latitude}).then(
      () => {},
      error => {
          console.log(error);
      }
  );
  }

saveLocation(location : Location){
    this.dbService.currentStore=this.USERSTORE;

    this.dbService.add({ id : location.id, country_name: location.country, city_name: location.city, 
        longitude : location.longitude, latitude : location.latitude}).then(
          () => {},
          error => {
              console.log(error);
          }
      );
}

deleteLocation(id : string){
    this.dbService.currentStore=this.USERSTORE;

    this.dbService.delete(id).then(
      () => {},
      error => {
          console.log(error);
      }
  );
}

clearLocation(){
    this.dbService.currentStore=this.USERSTORE;
   this.dbService.clear().then(
    () => {},
    error => {
        console.log(error);
    }
);
}

}

