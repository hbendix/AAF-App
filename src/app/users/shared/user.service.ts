import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  public login(toLogin: { username: any; password: any; }): any {
    return this.http.post(`${ environment.server.url }api/user`, toLogin);
  }

  public setUserDetails (user: any) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('isAdmin', user.isAdmin);
    localStorage.setItem('avatar', user.avatar);
    localStorage.setItem('username', user.username);
  }

  public getUserDetails () {
    return {
      userId: localStorage.getItem('userId'),
      isAdmin: localStorage.getItem('isAdmin'),
      avatar: localStorage.getItem('avatar'),
      username: localStorage.getItem('username')
    };
  }

  public getAll () {
    return this.http.get(`${ environment.server.url }api/user/all`)
      .map(res => <User[]>res.json());
  }
}
