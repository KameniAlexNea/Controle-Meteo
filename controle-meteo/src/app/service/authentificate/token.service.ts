import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken() {
    let tokenValue = (new Date()).getTime();
    let token = { "token": tokenValue };
    localStorage.setItem('token', JSON.stringify(token));
  }
}
