import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './addContact.component.html',
  styleUrls: ['./addContact.component.scss']
})
export class AddContactComponent implements OnInit {

  addContactDataForm: {
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

  isEmailInValid: boolean = false;
  invalidAddContact: boolean = false;

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  validateEmail() {
    const { email } = this.addContactDataForm;

    if (!email) { this.isEmailInValid = true; }
    else if (email.includes('@')) { this.isEmailInValid = false; }
    else { this.isEmailInValid = false; }
  }

  ngOnInit() {
    return this.backend.contacts()
      .then((data) => {
        for (var key in data) {
          this.addContactDataForm[key] = data[key];
        }
      })
  }

  submitForm() {
    this.backend.addContact(this.addContactDataForm)
      .then(() => {
        this.router.navigate(['/contacts']);
      })
      .catch((err) => {
        this.invalidAddContact = true;
      })
  }

}