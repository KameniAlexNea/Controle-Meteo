import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseUserService } from '../database/database-user.service';
import { DatabaseIdService } from '../database/database-id.service';
import { User } from '../../model/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isAuthenticate: boolean = false;

  constructor(private databaseUserService: DatabaseUserService,
    private databaseIdService: DatabaseIdService, private token: TokenService) {
  }

  public get isAuthenticate() {
    if (!this._isAuthenticate) {
      // let tokenValue = (new Date()).getTime();
      let tokenValue = JSON.parse(this.token.getToken())
      if (tokenValue) {
        let dateT = (new Date()).getTime()
        if (dateT - tokenValue < 10 * 60) {
          this.token.setToken()
          this._isAuthenticate = true
        } else {
          this.token.clearToken()
          this._isAuthenticate = false
        }
      } else {
        this._isAuthenticate = false
      }
    } else
      return this._isAuthenticate;
  }

  login(email, password) {
    this.databaseUserService.isValid(email, password).then((value) => {
      this._isAuthenticate = Boolean(value);
    });
  }

  logout(id: string) {
    if (id) {
      this.databaseIdService.saveLocation(id);
    }
    this._isAuthenticate = false;
  }
}