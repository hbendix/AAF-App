import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

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
    private notificationService: NotificationService,
    private router: Router) { }

  /**
   * Display list of teams
   */
  ngOnInit() {
    this.teamService.getTeams().subscribe(
      (res) => {
        this.myTeams = res;
      }, (err) => {
        this.notificationService.triggerNotification(`Error pulling teams: ${ err.statusText }`, false, 3000);
      }
    );
  }

  // load full team details and files
  public show (teamId: string) {
    this.teamService.getTeam(teamId).subscribe(
      (res) => {
        this.teamService.setTeamToView(res);
        this.router.navigate(['/Team']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error pulling teams: ${ err.statusText }`, false, 3000);
      }
    );
  }

}
