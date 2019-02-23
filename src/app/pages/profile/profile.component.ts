import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileData: {
    username: string,
    name: string,
    email: string,
    address: string
  } = {
      username: '',
      name: '',
      email: '',
      address: ''
    }

  constructor(private backend: BackendService) { }


}