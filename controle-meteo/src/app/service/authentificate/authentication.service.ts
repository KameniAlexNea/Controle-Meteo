import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseUserService } from '../database/database-user.service';
import { DatabaseIdService } from '../database/database-id.service';
import { User } from '../../model/user';
import { TokenService } from './token.service';

const timeOut = 600;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private _isAuthenticate: boolean = false;
  private _user: User

  // constructor(private databaseUserService: DatabaseUserService,
  //   private databaseIdService: DatabaseIdService, private token: TokenService) {
  // }

  // public get isAuthenticate() {
  //   if (!this._isAuthenticate) {
  //     // let tokenValue = (new Date()).getTime();
  //     let tokenValue = JSON.parse(this.token.getToken())
  //     if (tokenValue) {
  //       let dateT = (new Date()).getTime()
  //       if (dateT - tokenValue < 10 * 60) {
  //         this.token.setToken()
  //         this._isAuthenticate = true
  //       } else {
  //         this.token.clearToken()
  //         this._isAuthenticate = false
  //       }
  //     } else {
  //       this._isAuthenticate = false
  //     }
  //   } else
  //     return this._isAuthenticate;
  // }

  // login(email, password) {
  //   this.databaseUserService.isValid(email, password).then((value) => {
  //     this._isAuthenticate = Boolean(value);
  //     if (this._isAuthenticate) {
  //       this.databaseUserService.getUserE(email, password).then(user => {
  //         this._user = user
  //       })
  //     }
  //   });
  // }

  // logout(id: string) {
  //   if (id) {
  //     this.databaseIdService.saveLocation(id);
  //   }
  //   this._isAuthenticate = false;
  // }

  user() {
    return new Promise<User>((resolve, reject) => {
      this.databaseUserService.getAll().then(
        (data) => {
          let user = data[0];
          this._user = this.databaseUserService.castUserFromDb(user);
          resolve(this._user);
        },
        (error) => {
          console.log(error);
        })
    });
  }

  private _isAuthenticate: boolean = false;
  private currentUserTokenSubject: BehaviorSubject<any>;
  public currentUserToken: Observable<any>;

  constructor(private databaseUserService: DatabaseUserService,
    private databaseIdService: DatabaseIdService,
    private tokenService: TokenService) {
    this.currentUserTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUserToken = this.currentUserTokenSubject.asObservable();
    this._user = new User("","","","","","","")
    /**
     * the schema of token object is 
     * {
     *  "token" : value
     * }
     */
  }

  get isAuthenticate():boolean {
    if (this._isAuthenticate) {
      return true;
    } else {
      if (this.currentUserTokenSubject.value) {
        let previousToken = this.currentUserTokenSubject.value;
        let nowToken = (new Date()).getTime();
        let duration = (nowToken - previousToken['token']) / 1000;
        console.log(duration, nowToken)
        if (duration >= timeOut) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  login(email, password) {
    this._user.email = email; 
    this._user.password = password;
    return new Promise((resolve, reject) => {
      this.databaseUserService.isValid(email, password).then((value) => {
        let booleanValue = Boolean(value);
        this._isAuthenticate = booleanValue;
        if (booleanValue) {
          this.tokenService.setToken();
          let tokenValue = (new Date()).getTime();
          let token = { "token": tokenValue };
          localStorage.setItem('token', JSON.stringify(token));
          this.currentUserTokenSubject.next(token);
          this.databaseUserService.getUserE(email, password).then(user => {
            this._user = user;
          })
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout(id: string) {

    localStorage.removeItem('token');
    this.currentUserTokenSubject.next(null);
    this._isAuthenticate = false;
    if (id) {
      this.databaseIdService.saveLocation(id);
    }

  }

}