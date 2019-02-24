import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactData: {
    name: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    email: string,
    twitter: string,
    instagram: string,
    github: string
  } = {
      name: '',
      address: '',
      mobile: '',
      work: '',
      home: '',
      email: '',
      twitter: '',
      instagram: '',
      github: ''
    }

  constructor(private backend: BackendService) { }

  ngOnInit() {
    return this.backend.contacts()
      .then((data) => {
        for (var key in data) {
          console.log(this.contactData)
          this.contactData[key] = data[key];
        }
      })
  }
}