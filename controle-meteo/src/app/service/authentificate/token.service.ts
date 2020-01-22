import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken() {
    let tokenValue = (new Date()).getTime();
    localStorage.setItem('token', JSON.stringify(tokenValue));
  }

  getToken() {
    return localStorage.getItem('token')
  }

  clearToken() {
    localStorage.removeItem('token')
  }
}
