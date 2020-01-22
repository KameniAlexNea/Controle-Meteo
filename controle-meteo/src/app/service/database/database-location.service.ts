import { Injectable, Inject, forwardRef } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Location } from '../../model/location/location';


@Injectable({
  providedIn: 'root'
})
export class DatabaseLocationService {

  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
    dbService.currentStore = 'Location';
  }

  getLocation(id : number) {
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
    this.dbService.update({ id : location.id, country_name: location.country, city_name: location.city, 
      longitude : location.longitude, latitude : location.latitude}).then(
      () => {},
      error => {
          console.log(error);
      }
  );
  }

saveLocation(location : Location){
    this.dbService.add({ id : location.id, country_name: location.country, city_name: location.city, 
        longitude : location.longitude, latitude : location.latitude}).then(
          () => {},
          error => {
              console.log(error);
          }
      );
}

deleteLocation(id : string){
    this.dbService.delete(id).then(
      () => {},
      error => {
          console.log(error);
      }
  );
}

clearLocation(){
   this.dbService.clear().then(
    () => {},
    error => {
        console.log(error);
    }
);
}

}