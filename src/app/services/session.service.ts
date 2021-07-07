import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: {
    loggedIn: boolean,
    username: string,
    id: Number
  } = {
    loggedIn: false,
    username: '',
    id: 0
  };

  constructor() {
    let userString = window.localStorage.getItem('user');
    try {
      if (userString) { this.user = JSON.parse(userString); }
      else { 
        this.user.loggedIn = false;
        this.user.username = '';
        this.user.id = 0;
      }
    }
    catch (err) {
      window.localStorage.removeItem('user')
      this.user.loggedIn = false;
      this.user.username = '';
      this.user.id = 0;
    }
  }

  getSession() {
    return this.user;
  }

  setSession(user) {
    this.user.username = user.username;
    this.user.loggedIn = true;
    this.user.id = user.id;

    let userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);
  }

  clearSession() {
    this.user.loggedIn = false;
    this.user.username = '';
    this.user.id = 0;
    window.localStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.user.loggedIn;
  }
}