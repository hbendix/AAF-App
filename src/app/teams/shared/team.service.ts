import { Injectable, EventEmitter } from '@angular/core';
import { Team } from './team';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/users/shared/user.service';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FileService } from 'src/app/files/shared/file.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  team: Team;

  constructor(private http: Http,
    private userService: UserService, private fileService: FileService) { }

  /**
   * Return a list of all teams user belongs to
   */
  public getTeams () {
    return this.http.get(`${ environment.server.url }api/team/all/${ this.userService.getUserDetails().userId }`)
      .map(res => <Team[]>res.json());
  }

  /**
   * get Team by Id
   * @param teamId - team to view
   */
  public getTeam(teamId: string): any {
    return this.http.get(`${ environment.server.url }api/team/${ this.userService.getUserDetails().userId }/${ teamId }`)
      .map(res => <Team>res.json());
  }

  // set service with the Team to view
  public setTeamToView(_team: Team): any {
    this.team = _team;
    this.fileService.setFileList(_team.files, true);
  }

  // return team set previously
  public getTeamToView () {
    return this.team;
  }

 }
