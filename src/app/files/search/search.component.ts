import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/teams/shared/team.service';
import { Team } from 'src/app/teams/shared/team';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/users/shared/user.service';
import { User } from 'src/app/users/shared/user';
import { Types } from '../shared/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  teams: Team[] = [];
  users: User[] = [];
  fileTypes: string[] = [];
  sizeTypes: string[] = [];

  constructor(private teamService: TeamService,
    private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.teamService.getTeams()
      .subscribe(
        (res) => {
          this.teams = res;
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
          console.log(err);
        }
    );

    this.userService.getAll()
      .subscribe(
        (res) => {
          res.splice(res.findIndex(item => item.name ===  this.userService.getUserDetails().username), 1);
          this.users = res;
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
          console.log(err);
        }
      );

      this.fileTypes = Types.fileTypes();
      this.sizeTypes = Types.sizeTypes();
  }

}
