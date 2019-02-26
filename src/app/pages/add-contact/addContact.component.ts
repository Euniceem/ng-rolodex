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

  isEmailInValid: boolean = true;
  isMobileNumberInValid: boolean = true;
  isHomeNumberInValid: boolean = true;
  isWorkNumberInValid: boolean = true;
  invalidAddContact: boolean = true;

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  validateMobileNumber() {
    const { mobile } = this.addContactDataForm;

    if (mobile.length <= 11) { this.isMobileNumberInValid = true }
    else if (!mobile.includes('-')) { this.isMobileNumberInValid = true }
    else { this.isMobileNumberInValid = false }
  }

  validateWorkNumber() {
    const { work } = this.addContactDataForm;

    if (work.length <= 11) { this.isWorkNumberInValid = true }
    else if (!work.includes('-')) { this.isWorkNumberInValid = true }
    else { this.isWorkNumberInValid = false }
  }

  validateHomeNumber() {
    const { home } = this.addContactDataForm;

    if (home.length <= 11) { this.isHomeNumberInValid = true }
    else if (!home.includes('-')) { this.isHomeNumberInValid = true }
    else { this.isHomeNumberInValid = false }
  }

  validateEmail() {
    const { email } = this.addContactDataForm;

    if (!email) { this.isEmailInValid = true; }
    else if (!email.includes('@')) { this.isEmailInValid = true; }
    else if (!email.includes('.')) { this.isEmailInValid = true; }
    else { this.isEmailInValid = false; }
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