import { Injectable } from '@angular/core';
import { User } from 'src/app/users/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public loggedIn () {
    localStorage.setItem('isLoggedIn', true.toString());
  }

  public logOut () {
    localStorage.clear();
  }

  public isAuthenticated () {
    return <boolean><unknown>localStorage.getItem('isLoggedIn');
  }
  
}
