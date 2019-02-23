import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editProfileData: {
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

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  editProfile() {
    this.backend.editProfile(this.editProfileData)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        this.router.navigate(['/edit-profile']);
      });
    }

  ngOnInit () {
    this.backend.editProfile(this.editProfileData)
    .then((data)=> {
      for(var key in data){
        if(this.editProfileData.hasOwnProperty(key)){
          this.editProfileData[key] = data[key]
        }
      }
    });
  }

};
