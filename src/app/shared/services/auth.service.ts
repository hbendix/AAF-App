import { Injectable } from '@angular/core';
import { User } from 'src/app/users/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * set isLoggedIn to true, on successful login
   */
  public loggedIn () {
    localStorage.setItem('isLoggedIn', true.toString());
  }

  /**
   * Clear storage on logout
   */
  public logOut () {
    localStorage.clear();
  }

  /**
   * check to see if user is logged in
   */
  public isAuthenticated () {
    return <boolean><unknown>localStorage.getItem('isLoggedIn');
  }

}
