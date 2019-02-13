import { Injectable, EventEmitter } from '@angular/core';
import { Team } from './team';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/users/shared/user.service';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: Http,
    private userService: UserService) { }

  /**
   * Return a list of all teams user belongs to
   */
  public getTeams () {
    return this.http.get(`${ environment.server.url }api/team/all/${ this.userService.getUserDetails().userId }`)
      .map(res => <Team[]>res.json());
  }
 }
