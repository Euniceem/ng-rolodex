import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
        const redirectUrl = this.auth.redirectUrl;
        if (redirectUrl) {
          this.router.navigate([redirectUrl])
          this.auth.redirectUrl = '';
        } else {
          this.router.navigate(['/'])
        }
      })
      .catch((err) => {
        this.router.navigate(['/login'])
      })
  }
}