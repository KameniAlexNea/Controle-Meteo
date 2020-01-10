import { Injectable, Inject, forwardRef } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseIdService {
  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
    dbService.currentStore = 'Id';
  }
  USERSTORE = 'Id'

  getId() {
    this.dbService.currentStore=this.USERSTORE;

    return new Promise((resolve, reject) => {
      this.dbService.getByKey(1).then(
        id_loc => {
            resolve(id_loc);
        },
        error => {
            reject(error);
        }
    );
    });
    
}

  saveLocation(id : string){
    this.dbService.currentStore=this.USERSTORE;

    this.dbService.clear().then(
      () => {},
        error => {
          console.log(error);
        }
    );

    this.dbService.add({ id_location : id}).then(
          () => {},
          error => {
              console.log(error);
          }
      );
  }  
}
