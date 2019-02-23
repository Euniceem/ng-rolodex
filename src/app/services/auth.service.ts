import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(
    private router: Router,
    private backend: BackendService,
    private session: SessionService
  ) { }

  register(user) {
    return this.backend.register(user);
  }

  login(user) {
    return this.backend.login(user)
      .then((response) => {
        return this.session.setSession(response);
      })
  }

  logout() {
    return this.backend.logout()
      .then(() => {
        this.session.clearSession();
        return this.router.navigate(['/login'])
      })
  }
}
