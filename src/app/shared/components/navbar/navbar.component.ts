import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/users/shared/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  // used for welcome message
  username = this.userService.getUserDetails().username;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService) {
      this.router.navigate(['/MyFiles']);
    }

  public logout () {
    this.auth.logOut();
    this.router.navigate(['/Login']);
    this.notificationService.triggerNotification('Logged out.', true, 3000);
  }

}
