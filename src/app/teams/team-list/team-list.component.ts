import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  myTeams: Team[] = [];
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  constructor(private teamService: TeamService,
    private notificationService: NotificationService) { }

  /**
   * Display list of teams
   */
  ngOnInit() {
    this.teamService.getTeams().subscribe(
      (res) => {
        this.myTeams = res;
        console.log(this.myTeams);
      }, (err) => {
        this.notificationService.triggerNotification(`Error pulling teams: ${ err.statusText }`, false, 3000);
      }
    );
  }

}
