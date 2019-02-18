import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/users/shared/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  // used for welcome message
  username = this.userService.getUserDetails().username;
  @ViewChild('drawer') drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService) {
      if (this.router.url === '/') {
        this.router.navigate(['/MyFiles']);
      }

      router.events.subscribe((val) => {
          this.drawer.close();
      });
    }

  public logout () {
    this.auth.logOut();
    this.router.navigate(['/Login']);
    this.notificationService.triggerNotification('Logged out.', true, 3000);
  }

}
