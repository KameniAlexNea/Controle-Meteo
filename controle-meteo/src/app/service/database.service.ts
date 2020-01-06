import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})

export class user{
  id : number;
  username : string; 
  password : string;
  name : string;
  surname : string;
  picture : string;
  sex : string;
  birthday : string;
}


var current_user= new user();

export class UserService {
    
  constructor(private dbService: NgxIndexedDBService){
     dbService.currentStore = 'User';
  }

  get_user() {
    return this.dbService.getByIndex('username', current_user.id);
  }

  save_user(username : string, password : string, name : string, surname : string, picture : string, 
    sex : string, birthday : string){
    
    this.dbService.add({ name: surname, surname: surname, picture :picture,
        sex :sex, birthday : birthday });
  }

  update_user(id : string, username : string, password : string,name : string,
    surname : string, picture : string, sex : string, birthday : string){

    this.dbService.update({ id: id, username: username, password : password, 
    name : name, surname : surname, picture : picture, sex : sex,
    birthday : birthday });
  }

  delete_user(){
    this.dbService.delete('User', current_user.id)
  }
}


export class LocationService {
  constructor(private dbService: NgxIndexedDBService){
    dbService.currentStore = 'Location';
  }

  get_location() {
      return this.dbService.getByKey(1);
  }

  save_location(country_name : string ,city_name : string ,longitude : string ,
      latitude : string){

      this.dbService.clear();

      return this.dbService.add({ country_name: country_name, city_name: city_name, 
          longitude :longitude, latitude : latitude});
  }

  delete_location(){
      this.dbService.delete('Location', current_user.id)
  }

}