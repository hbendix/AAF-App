import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/team.service';
import { Team } from '../shared/team';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: Team;
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  loaded: boolean;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.team = this.teamService.getTeamToView();
    this.loaded = true;
  }

}
