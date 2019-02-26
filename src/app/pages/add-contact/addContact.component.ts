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
  isPhoneNumberInValid: boolean = true;
  invalidAddContact: boolean = true;

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  validatePhoneNumber() {
    const { mobile, work, home } = this.addContactDataForm;

    if (mobile.length < 9 || work.length < 9 || home.length < 9) { this.isPhoneNumberInValid = true }
    else if (!mobile.includes('-') || !work.includes('-') || !home.includes('-')) { this.isPhoneNumberInValid = true }
    else if (typeof mobile !== 'number' || typeof work !== 'number' || typeof home !== 'number') { this.isPhoneNumberInValid = true }
    else { this.isPhoneNumberInValid = false }
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