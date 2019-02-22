import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.scss']
})

export class LoginComponent {
  loginFormData: {
    username: string,
    password: string
  } = {
      username: '',
      password: ''
    };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login() {
    this.auth.login(this.loginFormData)
      .then(() => {
        console.log('User logged in!');
        const redirectUrl = this.auth.redirectUrl;
        if (redirectUrl) {
          this.router.navigate([redirectUrl])
          this.auth.redirectUrl = '';
        } else {
          this.router.navigate(['/'])
        }
      })
      .catch((err) => {
        console.log('error:', err);
      })
  }
}