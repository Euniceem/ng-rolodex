import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFormData: {
    username: string,
    password: string,
  } = {
      username: '',
      password: ''
    };

  constructor( 
    private auth: AuthService,
    private router: Router
  ) { }

  register() {
    this.auth.register(this.registerFormData)
    .then(()=> {
      this.router.navigate(['/login']);
    })
    .catch((err) => { 
      alert('Error Message:' + err);
      this.router.navigate(['/register']);
    });
  }
}