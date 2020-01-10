import { Injectable, Inject, forwardRef } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User } from '../app/model/user';


@Injectable({
  providedIn: 'root'
})
export class DatabaseUserService {  
  constructor(@Inject(forwardRef(() => NgxIndexedDBService))private dbService: NgxIndexedDBService){
     dbService.currentStore = 'User';
  }

  USERSTORE = 'User'

  getUser(email : string) {

    return new Promise((resolve, reject) => {
      this.dbService.getByIndex('email', email).then(
        person => {
            resolve(person);
        },
        error => {
            reject(error);
        }
    );
    });
  }

  getAll(){
    return new Promise((resolve, reject) => {
      this.dbService.getAll().then(
        person => {
            resolve(person);
        },
        error => {
            reject(error);
        }
      );
    });
  }

  saveUser(user : User){
    this.dbService.add({email : user._email, password : user._password, name: user._name, surname: user._surname, picture : user._picture,
        sex : user._sex, birthday : user._birthday }).then(
          () => {},
          error => {
              console.log(error);
          }
      );
  }

  saveUser2(email : string, password : string, name: string, surname: string, picture : string,
    sex : string, birthday : string){
    this.dbService.currentStore=this.USERSTORE;
    this.dbService.add({email : email, password : password, name: name, surname: surname, picture : picture,
        sex : sex, birthday : birthday }).then(
          () => {},
          error => {
              console.log(error);
          }
      );
  }

  updateUser(user : User){

    this.dbService.update({ email: user.email, password : user.password, 
    name : user.name, surname : user.surname, picture : user.picture, sex : user.sex,
    birthday : user.birthday }).then(
      () => {},
      error => {
          console.log(error);
      }
  );
  }

  deleteUser(email : string){
    this.dbService.delete(email).then(
      () => {},
      error => {
          console.log(error);
      }
  );
  }
  
  isValid(email:string,password:string){
    return new Promise((resolve, reject) => {
      this.getUser(email).then((user)=> {
        if(user != null){
          if(user['password']==password){
            resolve(true);
          }
        }else{
          resolve(false);
        }
      });
    });
    
  }
}
