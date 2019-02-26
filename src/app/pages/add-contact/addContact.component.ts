import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './addContact.component.html',
  styleUrls: ['./addContact.component.scss']
})
export class AddContactComponent {

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

  isEmailInvalid: boolean = true;
  isMobileNumberInvalid: boolean = true;
  isHomeNumberInvalid: boolean = true;
  isWorkNumberInvalid: boolean = true;
  invalidAddContact: boolean = false;

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  validateMobileNumber() {
    const { mobile } = this.addContactDataForm;

    if (mobile.length <= 11) { this.isMobileNumberInvalid = true }
    else if (!mobile.includes('-')) { this.isMobileNumberInvalid = true }
    else { this.isMobileNumberInvalid = false }
  }

  validateWorkNumber() {
    const { work } = this.addContactDataForm;

    if (work.length <= 11) { this.isWorkNumberInvalid = true }
    else if (!work.includes('-')) { this.isWorkNumberInvalid = true }
    else { this.isWorkNumberInvalid = false }
  }

  validateHomeNumber() {
    const { home } = this.addContactDataForm;

    if (home.length <= 11) { this.isHomeNumberInvalid = true }
    else if (!home.includes('-')) { this.isHomeNumberInvalid = true }
    else { this.isHomeNumberInvalid = false }
  }

  validateEmail() {
    const { email } = this.addContactDataForm;

    if (!email) { this.isEmailInvalid = true; }
    else if (!email.includes('@')) { this.isEmailInvalid = true; }
    else if (!email.includes('.')) { this.isEmailInvalid = true; }
    else { this.isEmailInvalid = false; }
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