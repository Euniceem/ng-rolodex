import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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

ngOnInit() {
  this.backend.profile()
  .then((data)=> {
    for (var key in data) {
      console.log(this.profileData)
      this.profileData[key] = data[key];
    }
  })
}
}