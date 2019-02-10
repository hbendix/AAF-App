import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/users/shared/user.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // username = new FormControl('', [Validators.required]);
  // password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router) {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#3f51b5';
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      username: ['', [
          Validators.required
        ]
      ],
      password: ['', [
          Validators.required
        ]
      ],
    });
  }

  public login () {
    const toLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.userService.login(toLogin).subscribe(
      (res) => {
        const response = res.json();
        this.notificationService.triggerNotification(`Welcome back, ${ response.username }`, true, 3000);
        this.userService.setUserDetails(response);
        this.authService.loggedIn();
        this.router.navigate(['/']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error ${ err.statusText }`, false, 3000);
        console.log(err);
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
