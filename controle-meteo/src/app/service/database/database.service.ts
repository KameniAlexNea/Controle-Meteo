import { Injectable, Inject, forwardRef } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export class User{
  email : string; 
  password : string;
  name : string;
  surname : string;
  picture : string;
  sex : string;
  birthday : string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {  
  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
     dbService.currentStore = 'User';
  }

  get_user(email : string) {

    this.dbService.getByIndex('email', email).then(
      person => {
          return person;
      },
      error => {
          console.log(error);
      }
  );
  }

  get_all(){
    this.dbService.getAll().then(
      
      person => {
          console.log(person);
          return person;
      },
      error => {
          console.log(error);
      }
    );
  }

  save_user(email : string, password : string, name : string, surname : string, picture : string, 
    sex : string, birthday : string){
    
    this.dbService.add({email : email, password : password, name: name, surname: surname, picture :picture,
        sex :sex, birthday : birthday }).then(
          () => {},
          error => {
              console.log(error);
          }
      );
  }

  update_user(email : string, password : string,name : string,
    surname : string, picture : string, sex : string, birthday : string){

    this.dbService.update({ email: email, password : password, 
    name : name, surname : surname, picture : picture, sex : sex,
    birthday : birthday }).then(

      () => {},
      error => {
          console.log(error);
      }
  );
  }

  delete_user(email : string){
    this.dbService.delete(email).then(
      () => {},
      error => {
          console.log(error);
      }
  );
  }
  
  isValid(email:string,password:string){
    let user=this.get_user(email);
    if(user != null){
      if(user['password']==password){
        return true;
      }
    }else{
      return false;
    }
  }
}

export class LocationService {
  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
    dbService.currentStore = 'Location';
  }

  get_location(id : number) {
      this.dbService.getByKey(id).then(
        location => {
            return location;
        },
        error => {
            console.log(error);
        }
    );
  }

    get_all() {
      this.dbService.getAll().then(
        location => {
            return location;
        },
        error => {
            console.log(error);
        }
    );
    }

    update_location(id : string, country_name : string ,city_name : string ,longitude : string ,
      latitude : string){
  
      this.dbService.update({ id : id, country_name: country_name, city_name: city_name, 
        longitude :longitude, latitude : latitude}).then(
  
        () => {},
        error => {
            console.log(error);
        }
    );
    }

  save_location(id : string, country_name : string ,city_name : string ,longitude : string ,
      latitude : string){

      this.dbService.add({ id : id, country_name: country_name, city_name: city_name, 
          longitude :longitude, latitude : latitude}).then(
            () => {},
            error => {
                console.log(error);
            }
        );
  }

  delete_location(id : number){
      this.dbService.delete(id).then(
        () => {},
        error => {
            console.log(error);
        }
    );
  }

  clear_location(){
     this.dbService.clear().then(
      () => {},
      error => {
          console.log(error);
      }
  );
  }

}

export class Id {
  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
    dbService.currentStore = 'Id';
  }

  get_id() {
    this.dbService.getByKey(1).then(
      id_loc => {
          return id_loc;
      },
      error => {
          console.log(error);
      }
  );
}

save_location(id : string){

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