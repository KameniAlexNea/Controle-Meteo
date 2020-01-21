import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseUserService } from '../database/database-user.service';
import { DatabaseIdService } from '../database/database-id.service';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _isAuthenticate: boolean = false;

  constructor(private databaseUserService: DatabaseUserService,
    private databaseIdService: DatabaseIdService) {
  }

  public get isAuthenticate() {
    return true // this._isAuthenticate;
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